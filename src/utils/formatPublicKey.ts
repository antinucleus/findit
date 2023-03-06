export const formatPublicKey = (publicKey: string) =>
  publicKey.slice(0, 4) + '...' + publicKey.slice(publicKey.length - 4);
