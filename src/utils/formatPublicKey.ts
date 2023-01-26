export const formatPublicKey = (publicKey: string) =>
  publicKey.slice(0, 7) + '...' + publicKey.slice(publicKey.length - 4);
