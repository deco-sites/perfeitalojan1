/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

interface Size {
  content: string;
  url: string;
  disabled: boolean;
}
interface MobileVersion {
  seller?: string;
  price?: number;
  listPrice?: number;
  priceCurrency?: string;
}

export interface QuickShopInfo {
  size?: Size[];
  offersMobile?: MobileVersion;
  name?: string;
}

// added on 26/12 to display the fastBuy SKU mobile version
const loadInfoForFastBuy = signal<QuickShopInfo | null>(null);
const disabledButtonMobileMenu = signal(true);
const displayMarkSign = signal(false);
const loadingOneSize = signal(false);
const urlToBounce = signal<string | null>(null);

const state = {
  displayMarkSign,
  disabledButtonMobileMenu,
  loadInfoForFastBuy,
  loadingOneSize,
  urlToBounce,
};

export const useQuickshopInfo = () => state;
