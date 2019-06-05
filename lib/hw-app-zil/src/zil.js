import TransportU2F from '@ledgerhq/hw-transport-u2f'
import { BN, Long } from '@zilliqa-js/util'
import { byteToPublickKey, byteToAddress, splitPath } from './utils'
import CONST from './contants'


const txnEncoder = require('@zilliqa-js/account/dist/util').encodeTransactionProto;
/**
 * Zilliqa API
 *
 * @example
 * import Zil from "@ledgerhq/hw-app-zil";
 * const zil = new Zil(transport)
 */
export default class Zil {

  static async create() {
    return await TransportU2F.create();
  }

  constructor(transport, scrambleKey='w0w') {
    this.transport = transport;
    transport.decorateAppAPIMethods(
      this,
      Object.keys(CONST.INS),
      scrambleKey
    );
  }

  async getAddress(keyIndex=0) {
    const P1 = 0x00;
    const P2 = 0x00;

    let indexBytes = Buffer.alloc(4);
    indexBytes.writeInt32LE(keyIndex);

    const response = await this.transport.send(
      CONST.CLA,
      CONST.INS.getAddress,
      P1,
      P2,
      indexBytes
    );
    let result = {};

    result.publicKey = byteToPublickKey(response);
    result.pubAddr = byteToAddress(response);

    return result;
  }

  signTxn(keyIndex, txnParams) {
    [
      'version',
      'nonce',
      'toAddr',
      'amount',
      'gasPrice',
      'gasLimit'
    ].forEach(key => {
      if (!Object.keys(txnParams).includes(key)) {
        throw new Error(`txParams ${key} is required!`);
      }
    });

    const P1 = 0x00;
    const P2 = 0x00;

    let indexBytes = Buffer.alloc(4);
    indexBytes.writeInt32LE(keyIndex);

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

    const encodedTxn = txnEncoder(txnParams);
    let txnSizeBytes = Buffer.alloc(4);
    txnSizeBytes.writeInt32LE(encodedTxn.length);
    const payload = Buffer.concat([indexBytes, txnSizeBytes, encodedTxn]);

    const response = await this.transport.send(
      CONST.CLA, CONST.INS.signTxn, P1, P2, payload
    );
    return response.toString('hex').slice(0, CONST.SIGN_BYTE_LEN * 2);
  }
}
