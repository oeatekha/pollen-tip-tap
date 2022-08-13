import Link from "next/link";
import { useEffect, useState } from "react";
import "./HeaderMenu.css";

const Arena = require("are.na");
const arena = new Arena({
  accessToken: "jOjmF09t2R8a_7pB-5u6VnexekhMzrtLoVVDoUityBg",
});

export const HeaderMenu = () => {
  return (
    <div className="menu">
      <Link href="/">Pollen</Link>
    </div>
  );
};

export default HeaderMenu;
