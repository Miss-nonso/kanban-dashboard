'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';

const Toggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="toggle-container">
      <div className="toggle-wrapper">
        <Image
          src="/assets/icons/icon-light-theme.svg"
          alt="light theme icon"
          width={18.33}
          height={18.33}
        />

        <button
          className={`${theme === 'dark' ? 'dark' : 'light'} toggle`}
          id="toggle-btn"
          onClick={toggleTheme}>
          <span className="w-4 "></span>
        </button>
        <Image
          src="/assets/icons/icon-dark-theme.svg"
          alt="dark theme icon"
          width={18.33}
          height={18.33}
        />
      </div>
    </div>
  );
};

export default Toggle;
