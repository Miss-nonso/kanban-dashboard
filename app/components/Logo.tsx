import React from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <div className="">
      {" "}
      {theme === "dark" ? (
        <Image
          src="/assets/icons/logo-light.svg"
          alt="logo"
          priority
          width={152.53}
          height={25.22}
        />
      ) : (
        <Image
          src="/assets/icons/logo-dark.svg"
          alt="logo"
          priority
          width={152.53}
          height={25.22}
        />
      )}
    </div>
  );
};

export default Logo;
