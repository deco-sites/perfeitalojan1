import { Product } from "apps/commerce/types.ts";
import ScrollButtonFloating from "../ui/ScrollButtonFloating.tsx";
import { useEffect } from "preact/compat";

interface Props {
  product: Product;
}

function ProductButtonFloatingText({ product }: Props) {
  const { isVariantOf, name } = product;

  useEffect(() => {
    ScrollButtonFloating();
  }, []);

  return (
    <>
      <div class="floating__text col-[1/5]">
        <span class="text-white">
          {isVariantOf?.name}
        </span>
      </div>
    </>
  );
}

export default ProductButtonFloatingText;
