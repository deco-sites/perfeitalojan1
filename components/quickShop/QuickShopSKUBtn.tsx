import {QuickShopInfo, useQuickshopInfo} from "$store/sdk/useQuickshopInfo.ts";
import { useSignal } from "@preact/signals";
import { Signal } from "@preact/signals-core";
  
import SKUBtnOnlyOneSize from "$store/components/quickShop/SKUBtnOnlyOneSize.tsx";  
import { addToCardFast } from "$store/components/quickShop/addToCartFast.ts";

interface Props {
    product: QuickShopInfo;
    sellerId: string;
    device: "desktop" | "mobile";
    sku?: Signal<{ id: string; size: string }>;
    sizeSignal?: Signal<number>;
}

const MOBILE_BUTTON_WIDTH = "45px";

// Render the available SKU's and render "Sem stock" When the item is completely out of stock, all SKU's without stock
function QuickShopSKUBtn({ product, sellerId, device, sku, sizeSignal }: Props) {
    // Copying the logic of the SelectorRows
    const values = product.size;

    values?.sort((a, b) => {
        const sizeOrder = ["PP", "P", "M", "G", "GG"];
        const indexA = sizeOrder.findIndex((size) => size.toUpperCase() === a.content.toUpperCase());
        const indexB = sizeOrder.findIndex((size) =>
        size.toUpperCase() === b.content.toUpperCase());

        if (indexA === -1 && indexB === -1) {return 0;}
        if (indexA === -1) {return 1;}
        if (indexB === -1) {return -1;}

        return indexA - indexB;
    });
    // End of the copy

    const activeSku = useSignal("");
    const { disabledButtonMobileMenu } = useQuickshopInfo();

    if (activeSku.value == "") disabledButtonMobileMenu.value = true;

    // add to cardFast for Desktop
    const mobileMenu = (url: string, content: string, e?: MouseEvent) => {
        // Copying and modifying logic of addToCart
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (sku) {
            activeSku.value = url;
            sku.value.id = url.split("skuId=")[1];
            sku.value.size = content;
            disabledButtonMobileMenu.value = false;
        }
    };

    // it will be usefull to determine the size of each item for the desktop version, and break the line depending on how many sku's we have
    const itemSize = (mode: string) => {
        if (device !== "desktop") return null;
        const limit = mode == "bigScreen" ? 6 : 5;
        let valueIndex = values?.length;

        if (valueIndex) {
            let numberToString = 0;
            if (valueIndex <= limit) {
                numberToString = Math.round((100 / valueIndex) * 1000000) / 1000000;
                // This will avoid the size of the SKU be literally equal to the div.
                numberToString -= 0.0000001;
                return `${numberToString.toString()}%`;
            } else if (valueIndex > limit) {
            // if the index is odd it will add 1 and calculate the size based on a even number.
                if (valueIndex % 2 > 0) {
                    valueIndex += 1;
                }

                numberToString = Math.round((100 / (valueIndex / 2)) * 1000000) / 1000000;
                numberToString -= 0.0000001;
                return `${numberToString.toString()}%`;
            }
        } else {
            return "16.666%";
        }
    };

    const isUniqueSize = values?.length === 1;
    return (
        <>
            {values?.map(({ content, url, disabled }) => {
                if (isUniqueSize && device === "desktop") {
                // For unique sizes there will display "Compra rapida", not changing the original text
                    return (
                        <SKUBtnOnlyOneSize {...{ disabled, text: "Compra Rápida", url, sellerId, product }} />
                    );
                }
                return (
                    <button
                        aria-label={`Botão para comprar o tamanho ${content}`}
                        disabled={disabled}
                        id={content}
                        onClick={ async (e) => {
                            if (device === "desktop") {
                                await addToCardFast(e, url, sellerId, product);
                            } else {
                                mobileMenu(url, content, e);
                            }
                        }}
                        style={{
                            width: device === "desktop"
                                ? (sizeSignal && sizeSignal.value > 285)
                                ? itemSize("bigScreen")
                                : itemSize("smallScreen")
                                : MOBILE_BUTTON_WIDTH,
                        }}
                        class={`flex justify-center rounded-lg items-center disabled:cursor-not-allowed focus:outline-none relative duration-300 ease-in-out
                            ${device === "desktop"
                                ? `h-[44px] text-[14px] text-[#000080] ${disabled
                                    ? "text-[#a6a6a6] out-of-stock-quick-shop after::)"
                                    : `hover:bg-[#000080] hover:font-semibold rounded border-[3px] border-[#f0f0fb] hover:text-white ease-in duration-300 font-caption disabled:bg-interactive disabled:text-default-inverse`
                                }`
                                : `rounded-full h-[45px] ${disabled
                                    ? " bg-[#E4E5E6] text-[#FFFFFF] out-of-stock-quick-shop-mobile after::)"
                                    : `text-caption font-caption border border-default hover:bg-interactive hover:border-interactive hover:text-default-inverse disabled:bg-interactive disabled:text-default-inverse disabled:border-interactive`
                                } ${activeSku.value === url
                                    ? " bg-[#000080] text-white"
                                    : " text-[#7B7C80]"
                                }`
                        }`}
                    >
                        {content.replace("UNICO", "ÚNICO")}
                    </button>
                );
            })}
        </>
    );
}

export default QuickShopSKUBtn;
  