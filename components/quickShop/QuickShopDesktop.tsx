import QuickShopSKUBtn from "$store/components/quickShop/QuickShopSKUBtn.tsx";
import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import CheckMarkAnimation from "$store/components/quickShop/CheckMarkAnimation.tsx";
import {QuickShopInfo, useQuickshopInfo} from "$store/sdk/useQuickshopInfo.ts";
import Spinner from "$store/components/ui/Spinner.tsx";

interface Props {
  sellerId: string;
  product: QuickShopInfo;
}

function QuickShopDesktop(
  {
    sellerId,
    product,
  }: Props,
) {
  const showSizes = useSignal(false);
  const { loading } = useCart();
  const { displayMarkSign, loadInfoForFastBuy } = useQuickshopInfo();
  const divRef = useRef<HTMLDivElement | null>(null);
  const buttonSize = useSignal(divRef?.current?.offsetWidth ?? 286);

  useEffect(() => {
    if (divRef?.current?.offsetWidth && divRef?.current?.offsetWidth > 0) {
      buttonSize.value = divRef?.current?.offsetWidth;
    }
  }, [divRef?.current?.offsetWidth]);

  const handleMouseOver = () => {
    showSizes.value = true;
  };

  const handleMouseOut = () => {
    showSizes.value = false;
  };

  return (
    <div
      ref={divRef}
      class="relative z-30 top-[-170px] hidden sm:group-hover:flex flex-col items-center gap-2 w-full bg-opacity-10"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div class="justify-center items-center flex relative bg-white rounded-lg mx-auto min-h-[44px]"
        style={{ width: "calc(100% - 30px)" }}>
        {displayMarkSign.value && loadInfoForFastBuy.value == product ? 
          (
            <>
              {loading.value ? <Spinner /> : (<CheckMarkAnimation className={"fill-none w-10 h-10 block opacity-0 animate-draw"} strokeWidth={"2"} />)}
            </>
          )
          : 
          (
            <>
              <div class={`${showSizes.value ? "hidden" : "block"}`}>
                <h3 class={`text-[#000080] tracking-[1px] font-semibold overflow-hidden capitalize text-[14px] 15xl:text-[14px]`}>
                  Compra rápida
                </h3>
              </div>
              <div class={`${showSizes.value ? "flex" : "hidden"} flex-wrap w-full relative`}>
                <QuickShopSKUBtn
                  sizeSignal={buttonSize}
                  product={product}
                  sellerId={sellerId}
                  device="desktop"
                />
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default QuickShopDesktop;
