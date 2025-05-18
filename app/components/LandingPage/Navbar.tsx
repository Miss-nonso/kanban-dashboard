import React, { useState } from "react";
import Image from "next/image";
import Logo from "../Logo";
import Toggle from "../Toggle";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showToggle, setShowToggle] = useState(false);

  return (
    <nav className="flex justify-between w-full p-3 items-center border border-[transparent] border-b-[var(--darkline)]  md:border md:border-[var(--darkline)]  md:rounded-3xl md:p-3  md:w-[80%] md:mx-auto md:mt-2">
      <div className="h-[1.5rem] flex items-center gap-2">
        {" "}
        <Logo />
      </div>

      <div className="min-w-[11rem] p-1 rounded-2xl md:-mr-0 md:border md:border-[var(--darkline)]">
        {" "}
        <Toggle />{" "}
        <button className="relative block focus:outline-[var(--darkpurple)] focus:p-1 md:hidden">
          {" "}
          {showToggle ? (
            <Image
              src="/assets/icons/icon-chevron-up.svg"
              alt="Show toggle"
              height={10}
              width={10}
            />
          ) : (
            <Image
              src="/assets/icons/icon-chevron-down.svg"
              alt="Close toggle"
              height={10}
              width={10}
            />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
