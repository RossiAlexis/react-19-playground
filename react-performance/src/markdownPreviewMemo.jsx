import { memo } from "react";
const JANK_DELAY = 100;
export default memo(function MarkdownPreviewMemo({ render, options }) {
  const start = performance.now();
  const expensiveRender = () => {
    while (performance.now() - start < JANK_DELAY) {}
    return null;
  };

  return (
    <div>
      <h1>Last render: {Date.now()}</h1>
      <div
        className="markdown-preview"
        dangerouslySetInnerHTML={{
          __html: render(options.text),
        }}
        style={{ color: options.theme }}
      ></div>
      {expensiveRender()}
    </div>
  );
});
