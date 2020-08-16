import React from "react";

export interface EmojiProps {
  label: string;
  symbol: string;
}

export default function Emoji(props: EmojiProps) {
  return (
    <span
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );
}
