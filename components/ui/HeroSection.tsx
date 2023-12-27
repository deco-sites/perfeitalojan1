import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { Video as LiveVideo } from "deco-sites/std/components/types.ts";
import Video from "apps/website/components/Video.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import useMedia from "../../sdk/useMedia.ts";


export interface VideoProps {
  /**
   * @description ID of video mobile
   */
  videoMobile?: LiveVideo;

  /**
   * @description ID of video desktop
   */
  videoDesktop?: LiveVideo;
}

export interface ImageProps {
  /** @description Seu banner Mobile */
  mobile: {
    banner: LiveImage;
    imageWidth: number;
    imageHeight: number;
  };
  /** @description Seu banner Desktop */
  desktop: {
    banner: LiveImage;
    imageWidth: number;
    imageHeight: number;
  };
}

export interface CTAProps {
  title: {
    richtext: HTML;
    sizeDesktop: string;
    sizeMobile: string;
    lineHeightDesktop?: string;
    lineHeightMobile?: string;
    moreStyles?: string;
  };
  subTitle?: {
    showSubtitle: boolean;
    richtext: HTML;
    sizeDesktop: string;
    sizeMobile: string;
    lineHeightDesktop?: string;
    lineHeightMobile?: string;
    moreStyles?: string;
  };
  TitleFont: "Nunito" | "Lusitana" | "Avenir";
  buttons: Button[];

  position: {
    vertical: "bottom" | "center";
    horizontal: "left" | "center" | "right";
  };

  bannerHref?: string;
  bannerMoreStyles?: string;
}

export interface Button {
  title: string;
  link: string;
  variant: "blue" | "white" | "black" | "outline";
  /** @description Width em px no mobile (ex: 200px) */
  mobileWidth?: string;
  /** @description Width em px no desktop (ex: 350px) */
  desktopWidth?: string;
}

export interface Props {
  media: VideoProps | ImageProps;
  cta: CTAProps;
  preload?: boolean;
}

function BannerComponent(
  { media, alt, preload = true }: {
    media: ImageProps;
    alt: string;
    preload?: boolean;
  },
) {
  return (
    <>
      <Picture class="w-full" preload={true}>
        <Source
          media="(max-width: 1024px)"
          fetchPriority={preload ? "high" : undefined}
          src={media?.mobile.banner}
          width={media?.mobile.imageWidth}
          height={media?.mobile.imageHeight}
        />
        <Source
          media="(min-width: 1025px)"
          fetchPriority={preload ? "high" : undefined}
          src={media?.desktop.banner}
          width={media?.desktop.imageWidth}
          height={media?.desktop.imageHeight}
        />
        <img
          class="object-cover w-full sm:h-full"
          loading={preload ? "eager" : undefined}
          src={media?.desktop.banner}
          alt={alt}
        />
      </Picture>
    </>
  );
}



function VideoComponent({ media }: { media: VideoProps }) {
  const isMobile = useMedia("(max-width: 767px)", true);
  const videoSource = isMobile ? media.videoMobile : media.videoDesktop;

  return (
    <>
      <div class="block">
        {videoSource ? (
          <Video
            src={videoSource}
            width={150}
            height={150}
            class="w-full h-auto"
            loop
            muted
            autoPlay
            playsInline
            loading={"eager"}
          >
            <source src={videoSource} type="video/mp4" />
          </Video>
        ) : null}
      </div>
    </>
  );
}

function buttonVariantClass(variant: string) {
  switch (variant) {
    case "white":
      return "bg-white text-black";
    case "black":
      return "bg-black text-white";
    case "outline":
      return "bg-transparent text-white border-1 border-white";
  }
  return "bg-primary text-white";
}

export default function HeroSectionComponent({ media, cta, preload }: Props) {
  const horizontal = cta?.position?.horizontal === "left"
    ? "justify-start"
    : cta?.position?.horizontal === "center"
    ? "justify-center"
    : "justify-end";

  const horizontalText = cta?.position?.horizontal === "left"
    ? "text-left"
    : cta?.position?.horizontal === "center"
    ? "text-center"
    : "text-right";

  const vertical = cta?.position?.vertical === "center"
    ? "items-start"
    : "items-end";

  const {
    TitleFont,
    title: _title,
    subTitle,
    buttons,
    bannerHref,
    bannerMoreStyles,
  } = cta ?? {};

  const title = _title ?? {};
  return (
    <section
      class={`relative overflow-hidden ${
        bannerHref ? "cursor-pointer" : "pointer-events-none"
      }`}
      onClick={() => bannerHref && (window.location.href = bannerHref)}
    >
      {(media as VideoProps)?.videoMobile
        ? <VideoComponent media={media as VideoProps} />
        : (
          <BannerComponent
            media={media as ImageProps}
            alt={title.richtext}
            preload={preload}
          />
        )}
      <div
        style={bannerMoreStyles || ""}
        // h-[calc(100%-50vw)] px-[10%]
        class={`flex absolute w-full top-[50vw] pb-[40px] lg:(top-[14vw] h-[calc(100%-14vw)] px-[95px] pb-[85px]) ${horizontal} ${horizontalText} ${vertical}`}
      >
        <div>
          <h2
            style={title.moreStyles}
            class={`textShadow text-[${title.sizeMobile}] lg:(text-[${title.sizeDesktop}]) leading-${`${
              title.lineHeightMobile ? `[${title.lineHeightMobile}]` : "normal"
            }`} lg:leading-${`${
              title.lineHeightDesktop
                ? `[${title.lineHeightDesktop}]`
                : "normal"
            }`} ${
              TitleFont == "Lusitana"
                ? "font-lusitana"
                : TitleFont == "Avenir"
                ? "font-Avenir"
                : "font-nunito"
            }`}
            dangerouslySetInnerHTML={{ __html: title.richtext }}
          >
          </h2>
          {subTitle?.showSubtitle &&
            (
              <span
                style={subTitle?.moreStyles}
                class={`text-[${subTitle?.sizeMobile}] block mt-3 lg:(text-[${subTitle?.sizeDesktop}]) leading-${`${
                  title.lineHeightMobile
                    ? `[${title.lineHeightMobile}]`
                    : "normal"
                }`} lg:leading-${`${
                  title.lineHeightDesktop
                    ? `[${title.lineHeightDesktop}]`
                    : "normal"
                }`}`}
                dangerouslySetInnerHTML={{ __html: subTitle?.richtext }}
              >
              </span>
            )}
          <div class={`flex flex-wrap gap-5 ${horizontal}`}>
            {(buttons ?? []).map(
              ({ link, title, variant, mobileWidth, desktopWidth }) => {
                return (
                  <a
                    class={`flex justify-center items-center mt-[20px] max-w-[160px] max-h-[40px] font-bold ${
                      mobileWidth
                        ? `w-[${mobileWidth}]`
                        : "w-[150px] max-w-[160px] max-h-[40px]"
                    } lg:${
                      desktopWidth
                        ? `w-[${desktopWidth}]`
                        : "w-[200px] max-w-[200px] max-h-[40px]"
                    }! p-2.5 text-[12px] lg:text-[14px]! max-w-[200px] max-h-[40px] rounded-[50px] tracking-[0.7px] transition duration-300 lg:hover:(scale-110 bg-primary text-white border-none) ${
                      buttonVariantClass(variant)
                    }`}
                    href={link}
                  >
                    {title}
                  </a>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
