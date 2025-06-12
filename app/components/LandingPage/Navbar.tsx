import React from 'react';

import Logo from '../Logo';
import Toggle from '../Toggle';

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full p-2 pr-0 items-center border border-[transparent] border-b-[var(--darkline)] md:pr-2 md:border md:border-[var(--darkline)] md:rounded-3xl md:p-2 md:w-[80%] md:mx-auto md:mt-2">
      <div className="h-[1.5rem] flex items-center gap-2">
        {' '}
        <Logo />
      </div>

      <div className="min-w-[11rem] p-1 pr-0 rounded-2xl md:pr-1 md:-mr-0 md:border md:border-[var(--darkline)]">
        {' '}
        <Toggle />{' '}
      </div>
    </nav>
  );
};

export default Navbar;
