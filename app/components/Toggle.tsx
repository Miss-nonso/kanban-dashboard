import React from "react";
import Image from "next/image";

const Toggle = () => {
  return (
    <div className="toggle-container">
      <div className="toggle-wrapper">
        <Image
          src="/assets/icons/icon-light-theme.svg"
          alt="light theme icon"
          width={18.33}
          height={18.33}
        />
        <div className="toggle">
          <span></span>
        </div>
        <Image
          src="/assets/icons/icon-dark-theme.svg"
          alt="light theme icon"
          width={18.33}
          height={18.33}
        />
      </div>
    </div>
  );
};

export default Toggle;
