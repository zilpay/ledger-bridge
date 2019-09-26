## zil-ledger-bridge-keyring

An implementation of Zilpay interface, that uses a Ledger hardware wallet for all cryptographic operations.

In most regards, but using a Ledger device. However there are a number of differences:
 * Because the keys are stored in the device, operations that rely on the device will fail if there is no Ledger device attached, or a different Ledger device is attached.
 * It does not support the signMessage, signTypedData or exportAccount methods, because Ledger devices do not support these operations.
 * Because extensions have limited access to browser features, there's no easy way to interact wth the Ledger Hardware wallet from the MetaMask extension. This library implements a workaround to those restrictions by injecting (on demand) an iframe to the background page of the extension.

The iframe is allowed to interact with the Ledger device (since U2F requires SSL and the iframe is hosted under https) using the libraries from [LedgerJS](https://github.com/LedgerHQ/ledgerjs) *hw-transport-u2f* and establishes a two-way communication channel with the extension via postMessage.

Build
-----

```bash
$ npm install
$ npm run build # Build for dev.
$ npm run build:prod # Build for prod.
```
