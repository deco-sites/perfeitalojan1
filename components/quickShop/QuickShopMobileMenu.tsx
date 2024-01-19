import QuickShopSKUBtn from "./QuickShopSKUBtn.tsx";
import { useQuickshopInfo } from "$store/sdk/useQuickshopInfo.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useScrollLock } from "$store/sdk/useScrollLock.ts";

const CHECKOUT_URL = "/checkout";

function QuickShopMobileMenu() {
  const { loadInfoForFastBuy, disabledButtonMobileMenu, loadingOneSize, urlToBounce } = useQuickshopInfo();
  const seller = loadInfoForFastBuy.value?.offersMobile?.seller;
  const price = loadInfoForFastBuy.value?.offersMobile?.price;
  const listPrice = loadInfoForFastBuy.value?.offersMobile?.listPrice;
  const priceCurrency = loadInfoForFastBuy.value?.offersMobile?.priceCurrency;
  const sizes = loadInfoForFastBuy.value?.size;

  const { unlockScroll } = useScrollLock();
  const sku = useSignal({id: "",size: "",});

  const isAddedToCart = useSignal(false);
  const { addItems, cart, loading } = useCart();

  useEffect(() => {
    if (loadInfoForFastBuy.value) {
      onlyOneSize();
    }
  }, [loadInfoForFastBuy.value])

  // add to cardFast for Desktop
  const addToCardFast = async (id: string) => {
    if (!seller || id === "") return;
    
    try {
      loading.value = true;
      await addItems({
        orderItems: [{ id, seller, quantity: 1 }],
      });
    } finally {
      loading.value = false;
      isAddedToCart.value = true;
    }
  };

  const closeAll = () => {
    isAddedToCart.value = false;
    loadInfoForFastBuy.value = null;
    unlockScroll();
  };

  const SizeChoice = () => {
    return (
      <div class="relative flex flex-col h-full w-full gap-2">
        <button
          class="absolute top-0 right-0"
          onClick={() => closeAll()}
          arial-label="Fechar menu"
        >
          <Icon
            id="XMark"
            width={26}
            height={26}
            strokeWidth={1}
            class="text-zinc-400"
          />
        </button>
        <div class="flex flex-col gap-2">
          <h3 class={`text-[#252526] tracking-[1px] font-bold overflow-hidden capitalize text-[16px] 15xl:text-[16px] pb-[7px]`}>
            {loadInfoForFastBuy.value?.name?.replace(/\n/g,"",).trim().toLowerCase()}
          </h3>
        </div>
        <h3 class={`text-[#252526] tracking-[1px] overflow-hidden capitalize text-[16px] 15xl:text-[16px]`}>Tamanhos:</h3>
          {loadInfoForFastBuy.value &&
            (
              <div class="flex flex-col gap-2 w-full">
                <div class="flex gap-2 relative rounded-lg w-[95%] flex-wrap">
                  <QuickShopSKUBtn
                    product={loadInfoForFastBuy.value}
                    sellerId={seller ?? "1"}
                    device="mobile"
                    sku={sku}
                  />
                </div>
                <Button
                  disabled={disabledButtonMobileMenu.value}
                  class="w-full !h-[60px] text-[16px] disabled:bg-[#E4E5E6] mt-[10px]"
                  onClick={(e) => addToCardFast(sku.value.id)}
                  aria-label="Comprar"
                  variant="checkout"
                  loading={loading.value}
                >
                  Comprar
                </Button>
              </div>
            )
          }
      </div>
    );
  };

  const DetailsAndCheckout = () => {
    return (
      <div class="h-full w-full relative">
        <button
          class="absolute top-0 right-0"
          onClick={() => closeAll()}
          arial-label="Fechar menu"
        >
          <Icon
            id="XMark"
            width={26}
            height={26}
            strokeWidth={1}
            class="text-black"
          />
        </button>
        <div class="flex gap-2 items-center mb-[18px]">
          <h3 class={`text-[#252526] tracking-[1px] font-bold overflow-hidden text-[18px] 15xl:text-[16px]`}>Adicionado ao carrinho</h3>
          <Icon
            id="CheckMark"
            size={13}
            strokeWidth={1}
          />
        </div>
        <div class="flex flex-col justify-between gap-2">
          <h3 class={`text-[#252526] tracking-[1px] font-semibold overflow-hidden capitalize text-[15px] 15xl:text-[16px] pb-[5px]`}>
            {loadInfoForFastBuy.value?.name?.replace(/\n/g,"",).trim().toLowerCase()}
          </h3>
          <h3 class={`text-[#252526] tracking-[1px] overflow-hidden capitalize text-[12px] 15xl:text-[12px]`}>
            Tamanho:{" "}
            <span class="capitalize text-[12px] lg:text-[14px]">
              {sku.value.size}
            </span>
              {" "}
            | {formatPrice(listPrice,priceCurrency) != formatPrice(price,priceCurrency)
              ? (
                  <>
                    <span class="line-through text-[#C5C7CC] text-[12px]">
                      {formatPrice(
                        listPrice,
                        priceCurrency,
                      )}
                    </span>
                    <span class="text-[#dc3737] text-[12px]">
                      {" "}
                      {formatPrice(price,priceCurrency)}
                    </span>
                  </>
                )
                : (
                  <>
                    <span class={`text-[#252526] text-[12px]`}>
                      {formatPrice(price,priceCurrency)}
                    </span>
                  </>
                )}
          </h3>
          <a href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}>
            <Button class="w-full !h-[60px] text-[16px] disabled:bg-[#E4E5E6] mt-[10px]" variant="checkout">
              Finalizar compra ({cart?.value?.items?.length})
            </Button>
          </a>
        </div>
      </div>
    );
  };

  const onlyOneSize = async () => {
    if (sizes && sizes.length === 1 && sizes[0]["url"]) {
      loadingOneSize.value = true
      urlToBounce.value = sizes[0]["url"]

      await setTimeout(async () => {
        await addToCardFast(sizes[0]["url"].split("skuId=")[1])
        loadingOneSize.value = false
      }, 300)
      setTimeout(() => {
        urlToBounce.value = ""
      }, 1500)
    }
  }

  const changeVisibilty = () => {
    if (sizes && sizes.length === 1) {
      if (loadInfoForFastBuy.value && isAddedToCart.value) {
        return (true)
      } else {
        return (false)
      }
    } else {
      if (loadInfoForFastBuy.value) {
        return (true)
      } else {
        return (false)
      }
    }
  }

  return (
    <div onClick={() => { closeAll(); unlockScroll();}}
      class={`fixed h-full w-screen z-[100] bg-black bg-opacity-60 inset-0 flex lg:hidden items-end transition-all duration-500`}
      style={{visibility: `${changeVisibilty() ? "visible" : "hidden"}`}}>
      <div onClick={(e) => e.stopPropagation()}
        class={`relative z-[100] opacity-100 w-full min-h-[150px] bg-white ${changeVisibilty() ? "translate-y-[0%]" : "translate-y-[100%]"} 
          transition-all duration-300 ease-in-out p-3`}
      >
        {(isAddedToCart.value) ? <DetailsAndCheckout /> : <SizeChoice />}
      </div>
    </div>
  );
}

export default QuickShopMobileMenu;

