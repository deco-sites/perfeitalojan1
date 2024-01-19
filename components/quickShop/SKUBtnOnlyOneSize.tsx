import { QuickShopInfo } from "$store/sdk/useQuickshopInfo.ts";
import { addToCardFast } from "$store/components/quickShop/addToCartFast.ts";

interface Props {
  disabled: boolean;
  text: string;
  url: string;
  sellerId: string;
  product: QuickShopInfo;
}

function SKUBtnOnlyOneSize({ disabled, text, url, sellerId, product }: Props) {
  return (
    <button
      class="flex justify-center items-center text-[#000080] hover:bg-[#f2f2f2] focus:outline-none duration-300 ease-in-out hover:font-semibold font-caption w-full min-h-[44px] disabled:cursor-not-allowed disabled:text-[#a6a6a6] disabled:out-of-stock-quick-shop disabled:after::)"
      aria-label={`Botão para comprar o tamanho único`}
      disabled={disabled}
      onClick={async (e) => {await addToCardFast(e, url, sellerId, product)}}>
      <h3 class={` tracking-[1px] font-semibold overflow-hidden capitalize text-[14px] 15xl:text-[14px]`}>
        {text}
      </h3>
    </button>
  );
}

export default SKUBtnOnlyOneSize;
