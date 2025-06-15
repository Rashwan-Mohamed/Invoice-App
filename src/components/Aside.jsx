import React, { useEffect } from "react";
import { mainContextUse } from "../context";

export default function Aside() {
  const { setDark, dark } = mainContextUse();
  useEffect(() => {
    if (!dark) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [dark]);
  return (
    <aside>
      <div className="asidesa">
        <div className="logoWrapper">
          <img className="logos" src={"/images/logo.svg"} alt="logo image" />
        </div>
      </div>
      <button onClick={() => setDark(!dark)}>
        {dark ? (
          <img src={"/images/icon-sun.svg"} alt="" />
        ) : (
          <img src={"/images/icon-moon.svg"} alt="" />
        )}
      </button>
      <button className="mine">
        <img src={"/images/Rash.png"} alt="" />
      </button>
    </aside>
  );
}
