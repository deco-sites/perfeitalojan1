import QuickShopDesktop from "$store/components/quickShop/QuickShopDesktop.tsx";
import QuickShopMobile from "$store/components/quickShop/QuickShopMobile.tsx";
import type { QuickShopInfo } from "$store/sdk/useQuickshopInfo.ts";

interface Props {
  sellerId?: string;
  productInfo: QuickShopInfo;
}

function QuickShop({ sellerId, productInfo }: Props) {
  const isDesktop: boolean = window.innerWidth >= 1024;
  return (
    <>
      {isDesktop
        ? (
          <QuickShopDesktop
            sellerId={sellerId ?? "1"}
            product={productInfo}
          />
        )
        : <QuickShopMobile product={productInfo} />}
    </>
  );
}

export default QuickShop;
