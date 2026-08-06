import { marked } from "marked";
import { useCallback, useEffect, useMemo, useState } from "react";
import MarkdownPreview from "./markdownPreview";
import markdownContent from "./markdownContent";
import MarkdownPreviewMemo from "./markdownPreviewMemo";

export default function App() {
  const [text, setText] = useState(markdownContent);
  const [time, setTime] = useState(Date.now());
  const [theme, setTheme] = useState("green");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const options = { text, theme };
  const render = (text) => marked.parse(text);
  const optionsMemoized = useMemo(() => {
    return {
      text,
      theme,
    };
  }, [text, theme]);
  const renderMemoized = useCallback((text) => marked.parse(text), []);

  return (
    <>
      <div className="app">
        <h1>Perf with React</h1>
        <h2>Current time: {time}</h2>
        <label htmlFor="theme">
          Choose a theme:
          <select onChange={(e) => setTheme(e.target.value)}>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
          </select>
        </label>
        <div className="markdown">
          <textarea
            className="markdown-editor"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          {/* <MarkdownPreview options={options} render={render} /> */}
          <MarkdownPreviewMemo
            options={optionsMemoized}
            render={renderMemoized}
          />
        </div>
      </div>
    </>
  );
}
