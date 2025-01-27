import React, { useEffect, useState } from "react";

export default function DivInput({
  className,
  text,
  type,
  name,
  setInput,
  test,
  message,
  stop,
  value,
}) {
  const [warning, setWarning] = useState("");
  const [localValue, setlocalValue] = useState(value !== "empty" && value);
  const [letter, setletter] = useState("input is required");
  const onBlurLeave = () => {
    if (!localValue) {
      setWarning("required");
      setletter("input is required");
    } else if (test && !test(localValue)) {
      setWarning("required");
      setletter(message);
    } else {
      setInput(localValue);
      setWarning("");
    }
  };
  const chance = () => {
    setWarning("");
  };
  useEffect(() => {
    if (stop) {
      onBlurLeave();
    }
  }, [stop]);
  return (
    <div className={`${warning} ${className}`}>
      <label htmlFor={name}>{text}</label>
      <input
        onFocus={chance}
        onBlur={onBlurLeave}
        value={localValue}
        onChange={(event) => setlocalValue(event.target.value)}
        type={type}
        id={name}
        name={name}
      />
      {warning === "required" && <div className="requiredDivo">{letter}</div>}
    </div>
  );
}
