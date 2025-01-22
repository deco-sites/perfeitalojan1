import HeroVideoCarrousselComponent from "site/islands/HeroVideoCarroussel.tsx";
import type { BannerProps } from "site/components/ui/HeroVideoCarroussel.tsx";

export default function HeroSection(props: BannerProps) {
  return <HeroVideoCarrousselComponent {...props} />;
}
