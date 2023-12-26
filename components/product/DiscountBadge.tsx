import {
  AlignHorizontal,
  GRID_COL_SPAN,
  GRID_COL_START,
  GRID_ROW_HORIZONTAL,
  GRID_ROW_SPAN,
  GRID_ROW_START,
} from "$store/components/product/ProductHighlights.tsx";

type Props = {
  price: number;
  listPrice: number;
  label?: string;
  variant?: string;
  className?: string;
  columnStart?: number;
  rowStart?: number;
  rowSpan?: number;
  colSpan?: number;  
  alignHorizontal?: AlignHorizontal;
};

function DiscountBadge({ 
  price, 
  listPrice, 
  label, 
  variant, 
  className,     
  colSpan,
  rowStart,
  columnStart,
  rowSpan,
  alignHorizontal }: Props) {
  const discount = ((listPrice - price) / listPrice) * 100;

  return (
    <div
      class={`tag-container flex items-center z-10  
      ${className}
      ${rowStart ? GRID_ROW_START[rowStart] : "row-start-auto"}
      ${columnStart ? GRID_COL_START[columnStart] : "col-start-auto"}
      ${GRID_ROW_SPAN[rowSpan ?? 0]}
      ${GRID_COL_SPAN[colSpan ?? 0]}  
      ${GRID_ROW_HORIZONTAL[alignHorizontal ?? "start"]}  
      `}
    >    
      <div class={`absolute left-0 top-0 p-[10px] flex items-center z-10 ${className}`}>
        <div class={`text-xs uppercase font-bold border-none px-[10px] py-[7px] rounded-lg flex box-content bg-opacity-100 opacity-100 text-base-100 bg-${variant ?? "emphasis"}`}>
          {discount?.toFixed(2).slice(0, 2)}% {label ?? "OFF"}
        </div>
      </div>
    </div>
  );
}

export default DiscountBadge;
