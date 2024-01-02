import type { Props } from "deco-sites/perfeitalojan1/components/ui/HeroSection.tsx";
import Button from "deco-sites/perfeitalojan1/components/ui/Button.tsx";
import Icon from "deco-sites/perfeitalojan1/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import HeroSectionComponent from "deco-sites/perfeitalojan1/components/ui/HeroSection.tsx";

export interface SliderProps {
  /** @title Slide infinito?  */
  infinite: boolean;
  /** @title Intervalo do Slide (*)  */
  interval: number;
}

export interface BannerProps { 
/** @title Vídeo */  
  banner: Array<Props>;
  /** @title Slider - (configurações)  */  
  slider: SliderProps;
  /** @title Cabeçalho transparente?  */  
  isHeaderTransparent: boolean;
}

type CallbackFunction = () => void;

export default function HeroSectionCarroussel({banner,slider,isHeaderTransparent,}: BannerProps) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
  const handleButtonAction = (callback: CallbackFunction) => {
    if (buttonDisabled) return;
    setButtonDisabled(true);

    callback();

    clearInterval(timeout);
    setTimeout(() => setButtonDisabled(false), 500);
  };

  const nextBanner = () => {
    const element = document?.querySelector<HTMLElement>('.custom-banner-slide.is-init');
    if( element ){
      const video = element.querySelector('section .block video');
      if( video instanceof HTMLVideoElement ) video.play();
    }
    handleButtonAction(() => {
      inFocus.value === banner.length - 1 ? (inFocus.value = 0) : (inFocus.value = inFocus.value + 1);
    });
  };

  const previousBanner = () => {
    const element = document.querySelector<HTMLElement>('.custom-banner-slide.is-init');
    if( element ){
      const video = element.querySelector('section .block video');
      if( video instanceof HTMLVideoElement ) video.play();
    }    
    handleButtonAction(() => {
      inFocus.value === 0 ? (inFocus.value = banner.length - 1) : (inFocus.value = inFocus.value - 1);
    });
  };

  const toBanner = ({target}: Event, index: number) => {
    if( target instanceof HTMLElement ){
      const video = target.children[0].querySelector('.block video');

      if( video instanceof HTMLVideoElement ){
        video.paused ? video.play() : video.pause();         
      }
    }
    if (index !== inFocus.value) {
      inFocus.value = index;
      clearInterval(timeout);
    }
  };

  const timeout = slider.interval && setInterval(nextBanner, slider.interval * 1000);
  const inFocus = useSignal(0);

  return (
    <div class={`custom-banner-one relative ${isHeaderTransparent ? "" : "lg:mt-[99px] mt-[60px]"}`}>
      <div class="custom-banner-one__container flex flex-row overflow-auto scrollbar-none">
        {banner.map((ban, index) => (                    
          <div key={index} class={`custom-banner-slide children:w-screen -ml-[calc(100vw*${index})] ${index === inFocus.value 
                ? `opacity-100 ${banner.length > 1 && 'absolute'} is-active` 
                : "opacity-0 pointer-events-none is-init"
              } transition-all duration-500`}
            onClick={(e) => toBanner(e, index)}
          >
            <HeroSectionComponent {...ban} preload={index === 0} />
          </div>
        ))}
      </div>
      {banner.length > 1 && (
        <>
          <div class={`custom-banner-slide flex absolute w-full bottom-[15px] lg:bottom-[70px] z-10 gap-2 justify-center`}>
            {banner?.map((bann, index) => (
              <div key={index} 
                class={`h-[3px] transition-all duration-200 cursor-pointer 
                  ${inFocus.value === index
                      ? "bg-primary w-[15px] is-active"
                      : "bg-white w-[15px]"
                  }`}
                onClick={(e) => toBanner(e, index)}
              >
              </div>
            ))}
          </div>
          <div class="absolute w-full left-0 top-[calc(50%-20px)]">
            <div class="relative z-10 col-start-1 row-start-3">
              <div class="bg-[#0a0a2e] opacity-40 absolute left-0 md:left-[20px]! hover:bg-interactive-inverse transition-all duration-200 rounded-full w-[40px] h-[40px] flex justify-center items-center hover:shadow-arrow">
                <Button
                className={`bg-[#0a0a0a2e]`}
                  data-slide="prev"
                  aria-label="Previous item"
                  onClick={previousBanner}
                  disabled={buttonDisabled}
                >
                  <Icon
                    size={20}
                    id="ChevronLeft"
                    strokeWidth={3}
                    class="text-[#ffffff]"
                  />
                </Button>
              </div>
            </div>
            <div class="relative z-10 col-start-3 row-start-3">
              <div class="bg-[#0a0a2e] opacity-40 absolute right-0 md:right-[20px] hover:opacity-100 hover:bg-interactive-inverse transition-all duration-200 rounded-full w-[40px] h-[40px] flex justify-center items-center hover:shadow-arrow">
                <Button
                  className={`bg-[#0a0a0a2e]`}
                  data-slide="next"
                  aria-label="Next item"
                  onClick={nextBanner}
                  disabled={buttonDisabled}
                >
                  <Icon
                    size={20}
                    id="ChevronRight"
                    strokeWidth={3}
                    class="text-[#ffffff]"
                  />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
