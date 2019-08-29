const TransportU2F = require('@ledgerhq/hw-transport-u2f').default;
const txnEncoder = require('@zilliqa-js/account/dist/util').encodeTransactionProto;
const { BN, Long } = require('@zilliqa-js/util');

const DEFAULT_LEDGER_INTERACTIVE_TIMEOUT = 50000;
const DEFAULT_LEDGER_NONINTERACTIVE_TIMEOUT = 3000;
const SCRAMBLE_KEY = 'w0w';
const CLA = 0xe0;
const INS = {
    "getVersion": 0x01,
    "getPublickKey": 0x02,
    "getPublicAddress": 0x02,
    "signTxn": 0x04
};

const PubKeyByteLen = 33;
const AddrByteLen = 20;
const SigByteLen = 64;
const HashByteLen = 32;
// https://github.com/Zilliqa/Zilliqa/wiki/Address-Standard#specification
const Bech32AddrLen = "zil".length + 1 + 32 + 6;

/**
 * Zilliqa API
 *
 * @example
 * import Zil from "@ledgerhq/hw-app-zil";
 * const zil = new Zil(transport)
 */
export default class Zilliqa {

    static async create() {
        return await TransportU2F.create();
    }
    constructor(
        transport,
        interactiveTimeout = DEFAULT_LEDGER_INTERACTIVE_TIMEOUT,
        nonInteractiveTimeout = DEFAULT_LEDGER_NONINTERACTIVE_TIMEOUT
    ) {
        if (!transport || !transport.send) {
          throw new Error('LedgerApp expected a Transport')
        }
        this._transport = transport;
        this._transport.decorateAppAPIMethods(
            this,
            Object.keys(INS),
            SCRAMBLE_KEY
        );
        if (typeof interactiveTimeout === "number") {
          this._interactiveTimeout = interactiveTimeout;
        }
        if (typeof nonInteractiveTimeout === "number") {
          this._nonInteractiveTimeout = nonInteractiveTimeout;
        }
        this._transport.setScrambleKey(SCRAMBLE_KEY);
    }

    getVersion() {
        const P1 = 0x00;
        const P2 = 0x00;

        return this._transport
            .send(CLA, INS.getVersion, P1, P2)
            .then(response => {
                let version = "v";
                for (let i = 0; i < 3; ++i) {
                    version += parseInt("0x" + response[i]);
                    if (i !== 2) {
                        version += "."
                    }
                }
                return {version};
            });
    }

    getPublicKey(index) {
        const P1 = 0x00;
        const P2 = 0x00;

        let payload = Buffer.alloc(4);
        payload.writeInt32LE(index);

        return this._transport
            .send(CLA, INS.getPublickKey, P1, P2, payload)
            .then(response => {
                // The first PubKeyByteLen bytes are the public address.
                const publicKey = response.toString("hex").slice(0, (PubKeyByteLen*2));
                return {publicKey};
            });
    }

    getPublicAddress(index) {
        const P1 = 0x00;
        const P2 = 0x01;

        let payload = Buffer.alloc(4);
        payload.writeInt32LE(index);

        return this._transport
            .send(CLA, INS.getPublicAddress, P1, P2, payload)
            .then(response => {
                // After the first PubKeyByteLen bytes, the remaining is the bech32 address string.
                const pubAddr = response.slice(PubKeyByteLen, PubKeyByteLen + Bech32AddrLen).toString('utf-8');
                const publicKey = response.toString("hex").slice(0, (PubKeyByteLen*2));
                return {pubAddr, publicKey};
            });
    }

    signTxn(keyIndex, txnParams) {
        // https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-account#interfaces
        const P1 = 0x00;
        const P2 = 0x00;

        let indexBytes = Buffer.alloc(4);
        indexBytes.writeInt32LE(keyIndex);

        delete txnParams.data;
        delete txnParams.code;

        txnParams.toAddr = txnParams.toAddr.replace('0x', '');
        // Convert to Zilliqa types
        if (!(txnParams.amount instanceof BN)) {
            txnParams.amount = new BN(txnParams.amount);
        }

        if (!(txnParams.gasPrice instanceof BN)) {
            txnParams.gasPrice = new BN(txnParams.gasPrice);
        }

        if (!(txnParams.gasLimit instanceof Long)) {
            txnParams.gasLimit = Long.fromNumber(txnParams.gasLimit);
        }

        var txnBytes = txnEncoder(txnParams);

        const STREAM_LEN = 32; // Stream in batches of STREAM_LEN bytes each.
        var txn1Bytes;
        if (txnBytes.length > STREAM_LEN) {
            txn1Bytes = txnBytes.slice(0, STREAM_LEN);
            txnBytes = txnBytes.slice(STREAM_LEN, undefined);
        } else {
            txn1Bytes = txnBytes;
            txnBytes = Buffer.alloc(0);
        }

        var txn1SizeBytes = Buffer.alloc(4);
        txn1SizeBytes.writeInt32LE(txn1Bytes.length);
        var hostBytesLeftBytes = Buffer.alloc(4);
        hostBytesLeftBytes.writeInt32LE(txnBytes.length);
        const payload = Buffer.concat([indexBytes, hostBytesLeftBytes, txn1SizeBytes, txn1Bytes]);

        let transport = this._transport;
        transport.setExchangeTimeout(
            500000
        );

        return transport
                .send(CLA, INS.signTxn, P1, P2, payload)
                .then(async function cb (response) {
                    transport.setExchangeTimeout(
                        DEFAULT_LEDGER_NONINTERACTIVE_TIMEOUT
                    );

                    if (txnBytes.length > 0) {
                        var txnNBytes;
                        if (txnBytes.length > STREAM_LEN) {
                            txnNBytes = txnBytes.slice(0, STREAM_LEN);
                            txnBytes = txnBytes.slice(STREAM_LEN, undefined);
                        } else {
                            txnNBytes = txnBytes;
                            txnBytes = Buffer.alloc(0);
                        }

                        var txnNSizeBytes = Buffer.alloc(4);
                        txnNSizeBytes.writeInt32LE(txnNBytes.length);
                        hostBytesLeftBytes.writeInt32LE(txnBytes.length);
                        const payload = Buffer.concat([hostBytesLeftBytes, txnNSizeBytes, txnNBytes]);

                        while (true) {
                            try {
                                const apdu = await transport.exchange(payload);
                                return cb(apdu);
                            } catch (err) {
                                await transport.close();
                                transport = await TransportU2F.create();
                                transport.setExchangeTimeout(
                                    50000
                                );
                                transport.setScrambleKey(SCRAMBLE_KEY);
                                const apdu = await transport.exchange(payload);
                                return cb(apdu);
                            }
                        }
                    }
                    return response;
                })
                .then(result => {
                    const sign = (result.toString('hex').slice(0, SigByteLen * 2));
                    console.log('sign', sign);
                    return sign;
                });

    }
}
