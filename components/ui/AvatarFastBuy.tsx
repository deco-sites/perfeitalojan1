import { getOptimizedMediaUrl } from "apps/website/components/Image.tsx";
import type { JSX } from "preact";

interface Color {
  variant: "Cor";
  content: string;
  quantity?: number;
  isModal?: boolean;
}

interface Size {
  variant: "Tamanho";
  content: string;
  quantity?: number;
  isModal?: boolean;
}

type Props = & Omit<JSX.IntrinsicElements["button"], "content"> & (Color | Size);

function AvatarFastBuy({variant,content,quantity,selected,disabled,isModal,...btnProps}: Props) {
  if (variant === "Cor") {
    return (
      <div
        class={`flex justify-center items-center rounded-full border-1 hover:border-black group-hover:border-black
        ${selected ? "border-black" : "border-[#C5C7CC]"}
        ${isModal ? "w-[35px] h-[35px]" : "w-[45px] h-[45px]"}`}
      >
        <button
          {...btnProps}
          disabled={selected || disabled}
          aria-label="Cor do produto"
          class={`rounded-full border border-default bg-center bg-contain outline-none focus:outline-none
            ${isModal ? "w-[27px] h-[27px]" : "w-[41px] h-[41px]"}`}
          style={content.startsWith("http")
            ? {
              backgroundImage: `url('${
                getOptimizedMediaUrl({
                  originalSrc: content,
                  width: 41,
                  height: 41,
                  factor: 1,
                })
              }')`,
            }
            : { backgroundColor: content }}
        />
      </div>
    );
  }

  if (variant === "Tamanho") {
    return (
      <button
        {...btnProps}
        disabled={selected || disabled}
        class={`
        rounded-full w-[45px] h-[45px] flex justify-center items-center relative disabled:cursor-not-allowed
        ${
          disabled
            ? "bg-[#E4E5E6] text-white out-of-stock after::)"
            : `text-caption font-caption border border-default hover:bg-interactive hover:border-interactive hover:text-default-inverse disabled:bg-interactive disabled:text-default-inverse disabled:border-interactive 
            ${selected ? "bg-black text-white" : "text-[#7B7C80]"
            }`
        }
        `}
      >
        {content}
      </button>
    );
  }

  return <button {...btnProps}>{content}</button>;
}

export default AvatarFastBuy;
