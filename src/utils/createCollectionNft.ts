import {Metaplex, NftWithToken} from '@metaplex-foundation/js';
import {ICollectionNftData} from '@/types';

export async function createCollectionNft(
  metaplex: Metaplex,
  uri: string,
  data: ICollectionNftData,
): Promise<NftWithToken> {
  const {nft} = await metaplex.nfts().create(
    {
      uri: uri,
      name: data.name,
      sellerFeeBasisPoints: data.sellerFeeBasisPoints,
      symbol: data.symbol,
      isCollection: true,
    },
    {commitment: 'finalized'},
  );

  console.log(
    `Collection Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`,
  );

  return nft;
}
