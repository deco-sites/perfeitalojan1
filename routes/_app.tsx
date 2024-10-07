import { AppProps } from "$fresh/server.ts";
import GlobalTags from "../components/GlobalTags.tsx";
import DesignSystem from "../sections/DesignSystem/DesignSystem.tsx";

function App(props: AppProps) {
  return (
    <>
      {/* Include default fonts and css vars */}
      <DesignSystem />

      {/* Include Icons and manifest */}
      <GlobalTags />

      {/* Rest of Preact tree */}
      <props.Component />
    </>
  );
}

export default App;
