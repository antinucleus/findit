import React from 'react';
import {Private} from './Private';
import {Public} from './Public';
import {useWalletStore} from '@/stores';

export const Routes = () => {
  const {phantomWalletPublicKey} = useWalletStore();

  return phantomWalletPublicKey ? <Private /> : <Public />;
  // return <Private />;
};
