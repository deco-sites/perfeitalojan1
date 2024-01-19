interface Props {
    className?: string;
    strokeWidth?: string;
  }
  
  function CheckMarkAnimation({ className, strokeWidth }: Props) {
    return (
      <div class="flex justify-center">
        <svg
          viewBox="0 0 44 44"
          class={className ? className : "fill-none w-7 h-7 block opacity-0 animate-draw"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          style={{
            strokeWidth: strokeWidth ? strokeWidth : "1",
            stroke: "#000080",
            strokeDasharray: "0 162.6 30 132.6",
            strokeDashoffset: "124.6",
          }}
        >
          <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758">
          </path>
        </svg>
      </div>
    )
  }
  
  export default CheckMarkAnimation