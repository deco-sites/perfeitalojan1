export default function ScrollButtonFloating() {
    addEventListener("scroll", ({ target }: Event) => {
        console.log('init');
      if (target && target instanceof HTMLDocument) {
        console.log('condição 1');
        const headerElement = document.querySelector('.is-header');
        const btnScrollY = target.querySelectorAll('[data-deco="add-to-cart"]')[1].getClientRects()[0].top;
  
        if (btnScrollY < -38 && headerElement) {
            // console.log('condição 2');
            console.log('btnScrollY -----> ', btnScrollY)
            target.querySelector(".floating")?.classList.remove("is-hidden");
            target.querySelector(".floating__button")?.classList.remove("is-hidden");
            headerElement.classList.add('is-active');
        } else {
            console.log('condição 2 else');
            target.querySelector(".floating")?.classList.add("is-hidden");
            target.querySelector(".floating__button")?.classList.add("is-hidden");
            headerElement?.classList.remove('is-active');
        }
      }
    });
}
  