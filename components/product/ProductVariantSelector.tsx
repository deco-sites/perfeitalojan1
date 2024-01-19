import Avatar from "$store/components/ui/Avatar.tsx";
import { useQuickView } from "../../sdk/useQuickView.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product, PropertyValue,ProductLeaf } from "apps/commerce/types.ts";

interface Props {
  product: Product;

  sizes?: {
    property: PropertyValue;
    item: ProductLeaf;
  }[];
  selectedID?: string;
  isQuickView?: boolean;  
}

function VariantSelector({ product, product: { url }, sizes, selectedID, isQuickView }: Props) {
  const possibilities = useVariantPossibilities(product);
  const { select } = useQuickView();

  sizes?.sort((a, b) => {
    const sizeOrder = ["PP", "P", "M", "G", "GG"];
    const indexA = sizeOrder.findIndex((size) => size.toUpperCase() === a.property?.value?.toUpperCase());
    const indexB = sizeOrder.findIndex((size) => size.toUpperCase() === b.property?.value?.toUpperCase());
    
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB;
  });

  if (sizes?.length === 1) {
    const [uniqueSize] = sizes;
    const { productID } = uniqueSize.item;
    if (productID) select({ productID });
  }  

  return (
    <ul class="flex flex-col gap-5">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-[10px]">
          <span class="text-xs text-base-300">{name}</span>
          <ul class="flex flex-row gap-[5px]">
            {Object.entries(possibilities[name]).map(([value, { urls, inStock }]) => 
              (
                <li>
                  <a href={urls[0]}>
                    <Avatar
                      content={value}
                      variant={inStock ? "default" : "disabled"}
                      active={urls[0] === url}
                    />
                  </a>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
