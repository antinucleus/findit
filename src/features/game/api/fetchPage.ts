import {Connection} from '@solana/web3.js';
import * as borsh from '@project-serum/borsh';

import {PROGRAM_ID} from '@/config';
import {showToast} from '@/utils';

type Data = {
  username?: string;
  score?: number;
  time?: string;
};

const borshAccountSchema = borsh.struct([
  borsh.bool('is_initialized'), // 1 byte
  borsh.u8('score'), // 1 byte
  borsh.str('username'), // unknown number of bytes
  borsh.str('time'), // unknown number of bytes
]);

const deserializeData = (buffer: Buffer): Data => {
  try {
    return borshAccountSchema.decode(buffer);
  } catch (e) {
    return {username: '', time: '', score: 0};
  }
};

const prefetchAccounts = async (conn: Connection) => {
  const fetchedAccounts = await conn.getProgramAccounts(PROGRAM_ID, {
    dataSlice: {offset: 1, length: 1},
  });

  fetchedAccounts.sort((a, b) => {
    const lengthA = a.account.data.readUInt8(0);
    const lengthB = b.account.data.readUInt8(0);

    const dataA: Buffer = a.account.data.slice(0, lengthA);
    const dataB: Buffer = b.account.data.slice(0, lengthB);

    return dataB.compare(dataA);
  });

  return fetchedAccounts.map(acc => acc.pubkey);
};

export const fetchPage = async (
  conn: Connection,
  page: number,
  perPage: number,
) => {
  try {
    const accounts = await prefetchAccounts(conn);

    const paginatedPublicKeys = accounts.slice(
      (page - 1) * perPage,
      page * perPage,
    );

    if (paginatedPublicKeys.length === 0) {
      return [];
    }

    const accountInfos = await conn.getMultipleAccountsInfo(
      paginatedPublicKeys,
    );

    const datas: Data[] = accountInfos.map(ai =>
      deserializeData(ai?.data || Buffer.from('')),
    );

    return [...datas];
  } catch (error) {
    showToast({title: 'Error', description: 'Error occured', type: 'error'});
    return [];
  }
};
