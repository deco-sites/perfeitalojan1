import HeroVideoCarrousselComponent from "../islands/HeroVideoCarroussel.tsx";
import type { BannerProps } from "../components/ui/HeroVideoCarroussel.tsx";

export default function HeroSection(props: BannerProps) {
  return <HeroVideoCarrousselComponent {...props} />;
}
