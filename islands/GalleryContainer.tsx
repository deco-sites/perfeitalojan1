import { computed } from "@preact/signals";
import type { ComponentChildren } from "preact";
// import { selectQuantityCardsToViewSignal } from "$store/components/search/SelectQuantityCardsToView.tsx";

export default function GalleryContainer(
  { children }: { children: ComponentChildren },
) {
//   const gridCols = computed(() => selectQuantityCardsToViewSignal.value);

  return (<></>
    // <div
    //   class={`relative grid (grid-cols-${gridCols.value.mobile}) lg:(grid-cols-${gridCols.value.desktop}!) gap-2 lg:gap-5 items-start `}
    // >
    //   {children}
    // </div>
  );
}
