import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="">
      {" "}
      <Image
        src="/assets/icons/logo-light.svg"
        alt="logo"
        priority
        width={152.53}
        height={25.22}
      />
    </div>
  );
};

export default Logo;
