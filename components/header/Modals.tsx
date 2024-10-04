import Loading from "../ui/Loading.tsx";
import Modal from "../ui/Modal.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { lazy, Suspense } from "preact/compat";

import type { Props as MenuProps } from "../header/Menu.tsx";

import { ICartProps } from "../minicart/Cart.tsx";

const Menu = lazy(() => import("../header/Menu.tsx"));
const Cart = lazy(() => import("../minicart/Cart.tsx"));

interface Props {
  menu: MenuProps;
  minicart?: ICartProps;
}

function Modals({ menu, minicart }: Props) {
  const { displayCart, displayMenu } = useUI();

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      <Modal
        title="Entrar"
        menuIcon="User"
        mode="sidebar-left"
        loading="lazy"
        id="menu-modal"
        showHeader={false}
        open={displayMenu.value}
        onClose={() => {}}
        class="backdrop:bg-base-content backdrop:opacity-70"
      >
        <Suspense fallback={fallback}>
          <Menu {...menu} />
        </Suspense>
      </Modal>

      <Modal
        class="ml-auto"
        title="Meu carrinho"
        mode="sidebar-right"
        showHeader
        id="minicart-modal"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Cart {...minicart as ICartProps} />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;