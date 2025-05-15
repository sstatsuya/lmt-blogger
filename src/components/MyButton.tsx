import { CSSProperties } from "react";

const MyButton = ({
  text,
  style = {},
  outline = false,
  onClick = () => {},
}: {
  text: string;
  style?: CSSProperties | undefined;
  outline?: boolean;
  onClick: any;
}) => {
  const outlineStyle: CSSProperties = {
    borderColor: "#fff",
    backgroundColor: "transparent",
    borderWidth: 0.5,
  };
  return (
    <button
      onClick={() => onClick()}
      style={{ ...style, ...(outline ? outlineStyle : {}) }}
      className="text-center w-32 cursor-pointer  py-2 border-1 border-border rounded-lg bg-title hover:scale-105 transition-transform duration-200"
    >
      <span className="text-white">{text}</span>
    </button>
  );
};

export default MyButton;
