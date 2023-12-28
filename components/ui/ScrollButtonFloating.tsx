export default function ScrollButtonFloating() {
  addEventListener("scroll", ({ target }: Event) => {
    if (target && target instanceof HTMLDocument) {
      const headerElement = document.querySelector(".is-header");
      const btnScrollY = target.querySelectorAll('[data-deco="add-to-cart"]')[1]
        .getClientRects()[0].top;

      if (btnScrollY < -38 && headerElement) {
        target.querySelector(".floating")?.classList.remove("is-hidden");
        target.querySelector(".floating__button")?.classList.remove(
          "is-hidden",
        );
        headerElement.classList.add("is-active");
      } else {
        target.querySelector(".floating")?.classList.add("is-hidden");
        target.querySelector(".floating__button")?.classList.add("is-hidden");
        headerElement?.classList.remove("is-active");
      }
    }
  });
}
