const prefix = 'zil';

export const CLA = 0xe0;
export const DEFAULT_PATH = "m/44'/313'/0'/0";

export const INS = {
  getVersion: 0x02,
  getAddress: 0x02,
  signTxn:    0x08,
  signHash:   0x04
};

export const PUB_KEY_BYTE_LEN = 33;
export const ADDRESS_BYTE_LEN = 20;
export const SIGN_BYTE_LEN    = 64;
export const HASH_BYTE_LEN    = 32;
export const BECH32_LEN       = prefix.length + 1 + 32 + 6;


export default {
  CLA, INS, DEFAULT_PATH,
  PUB_KEY_BYTE_LEN, ADDRESS_BYTE_LEN,
  SIGN_BYTE_LEN, HASH_BYTE_LEN,
  BECH32_LEN
}
