import {create} from 'zustand';

type DeepLink = {
  deepLink: string;
  setDeepLink: (link: string) => void;
};

export const useDeepLinkStore = create<DeepLink>(set => ({
  deepLink: '',
  setDeepLink: (link: string) => set({deepLink: link}),
}));
