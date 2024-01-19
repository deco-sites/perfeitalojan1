import { useCart } from "apps/vtex/hooks/useCart.ts";
import { QuickShopInfo, useQuickshopInfo } from "$store/sdk/useQuickshopInfo.ts";

// add to cardFast for Desktop
export const addToCardFast = async (e: MouseEvent,url: string,sellerId: string,product: QuickShopInfo) => {
  // Copying and modifying logic of addToCart
  const { addItems, loading } = useCart();
  const { displayMarkSign, loadInfoForFastBuy } = useQuickshopInfo();

  e.preventDefault();
  e.stopPropagation();

  if (!sellerId) {
    return;
  }

  try {
    displayMarkSign.value = true;
    loading.value = true;
    loadInfoForFastBuy.value = product;
    await addItems({
      orderItems: [
        {
          id: url.split("skuId=")[1],
          seller: sellerId,
          quantity: 1,
        },
      ],
    });
  } finally {
    setTimeout(() => {
      displayMarkSign.value = false;
      loadInfoForFastBuy.value = null;
    }, 1800);
  }
};
