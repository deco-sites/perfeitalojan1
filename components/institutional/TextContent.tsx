import Markdown from "../../components/ui/Markdown.tsx";
import type { HTML } from "../../components/types.ts";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   */
  content: HTML;
}

function TextContent({ content }: Props) {
  return (
    <div class="mb-12 lg:mb-20">
      <Markdown text={content.replace(/<p>|<\/p>/g, "\n")} />
    </div>
  );
}

export default TextContent;
