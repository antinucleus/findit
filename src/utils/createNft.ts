import {Metaplex, NftWithToken} from '@metaplex-foundation/js';
import {INftData} from '@/types';
import {PublicKey} from '@solana/web3.js';

export async function createNft(
  metaplex: Metaplex,
  uri: string,
  nftData: INftData,
  collectionMint: PublicKey,
): Promise<NftWithToken> {
  const {nft} = await metaplex.nfts().create(
    {
      uri: uri, // metadata URI
      name: nftData.name,
      sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
      symbol: nftData.symbol,
      collection: collectionMint,
    },
    {commitment: 'finalized'},
  );

  console.log(
    `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`,
  );

  await metaplex.nfts().verifyCollection({
    //this is what verifies our collection as a Certified Collection
    mintAddress: nft.mint.address,
    collectionMintAddress: collectionMint,
    isSizedCollection: true,
  });

  return nft;
}
