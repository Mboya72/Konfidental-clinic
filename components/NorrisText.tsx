import React from "react";

export default function NorrisText({ text }: { text: string }) {
  return (
    <span className="norris-text">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="norris-char"
          style={{ "--char-index": index } as React.CSSProperties}
        >
          <span
            className="norris-char-inner"
            data-char={char === " " ? "\u00A0" : char}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}