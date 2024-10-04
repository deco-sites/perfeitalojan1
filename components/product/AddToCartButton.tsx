import Button from "../ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "../../sdk/useAddToCart.ts";
import Icon from "../ui/Icon.tsx";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  label?: string;
  classes?: string;
}

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    label,
    classes,
    quantity,
  }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
  });

  return (
    <Button data-deco="add-to-cart" {...props} class={classes}>
      <p class="flex gap-2 items-center justify-center">
        <Icon id="ShoppingCart" width={20} height={20} />
        <span class="lg:hidden">{label ?? "Comprar"}</span>
        <span class="hidden lg:inline">{label ?? "Adicionar ao carrinho"}</span>
      </p>
    </Button>
  );
}

export default AddToCartButton;
