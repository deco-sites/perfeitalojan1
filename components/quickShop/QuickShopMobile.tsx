import { useQuickshopInfo } from "$store/sdk/useQuickshopInfo.ts";
import { QuickShopInfo } from "$store/sdk/useQuickshopInfo.ts";
import { useRef } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import { useScrollLock } from "$store/sdk/useScrollLock.ts";
import CheckMarkAnimation from "$store/components/quickShop/CheckMarkAnimation.tsx";


interface Props {
  product: QuickShopInfo;
}

function QuickShopMobile({ product }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { lockScroll } = useScrollLock();
  const { loadingOneSize, urlToBounce } = useQuickshopInfo();

  return (
    <>
      <div class="lg:hidden absolute bottom-[140px] z-20 flex justify-center items-center w-8 h-8 bg-white rounded-full right-[10px]">
        <button
          ref={buttonRef}
          class={`focus:outline-none p-3`}
          onClick={(e) => {
            const { loadInfoForFastBuy } = useQuickshopInfo();
            e.preventDefault();
            e.stopPropagation();
            loadInfoForFastBuy.value = product;
            lockScroll();
          }}
        >
          {
            product.size && product.size[0]["url"] == urlToBounce.value ?
              loadingOneSize.value 
                ?
                  <Icon
                    id={"Dot"}
                    width={22}
                    height={22}
                    strokeWidth={1}
                    class={"text-zinc-400 animate-bounce"}
                  />
                : <CheckMarkAnimation />
                :
                <Icon
                  id="Plus"
                  width={22}
                  height={22}
                  strokeWidth={1}
                  class={`text-zinc-400`}
                />
          }
        </button>
      </div>
    </>
  );
}

export default QuickShopMobile;
