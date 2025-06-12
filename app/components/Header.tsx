'use client';

import Image from 'next/image';
import Button from './Button';
import Dropdown from './Dropdown';
import { useRef, useState, useEffect } from 'react';
import TaskModal from './ModalContent/TaskModal';
import { useModal } from '../context/ModalContext';

import { useSidebar } from '../context/SidebarContext';
import MobileBoards from './MobileBoards';
type HeaderProps = { boardName: string };

const Header = ({ boardName }: HeaderProps) => {
  const { handleModalOpen } = useModal();

  const { showSidebar } = useSidebar();
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [showMobileBoards, setShowMobileBoards] = useState(false);
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setDisplayDropdown(false);
    setShowMobileBoards(false);
  };

  const handleTaskModalOpen = () => {
    handleModalOpen(<TaskModal type="add" />);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('dropdown-bg')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   console.log({ showMobileBoards });
  // }, [showMobileBoards]);

  return (
    <header
      className={` ${showSidebar && 'md:ml-[16.25rem] lg:ml-[18.75rem] md:px-2 '}  md:px-8 px-3`}>
      <div
        className="flex gap-2 justify-center items-center"
        onClick={() => {
          setShowMobileBoards(prev => !prev);
          if (displayDropdown) {
            setDisplayDropdown(false);
          }
        }}>
        {' '}
        <Image
          className="block md:hidden"
          src="/assets/icons/textlessLogo.png"
          alt="mobile logo"
          height={35}
          width={20}
        />
        <h2
          className={`${
            boardName.length > 15 ? 'text-[0.75rem] ' : 'text-[18px]'
          } md:text-[24px] font-bold tracking-[0.045em] `}>
          {boardName}
        </h2>
        <button className="relative block focus:outline-[var(--darkpurple)] focus:p-1 md:hidden">
          {' '}
          {showMobileBoards ? (
            <Image
              src="/assets/icons/icon-chevron-up.svg"
              alt="Show boards"
              height={10}
              width={10}
            />
          ) : (
            <Image
              src="/assets/icons/icon-chevron-down.svg"
              alt="close boards"
              height={10}
              width={10}
            />
          )}
        </button>
        {showMobileBoards && <MobileBoards />}
      </div>
      <div className="flex items-center gap-4 md:pr-4">
        <Button
          type="add"
          text="Add New Task"
          fn={handleTaskModalOpen}
          btnClass="primary"
          btnType="button"
        />
        <div className="relative board-option-btn">
          <button
            onClick={() => {
              setDisplayDropdown(!displayDropdown);
              if (showMobileBoards) {
                setShowMobileBoards(false);
              }
            }}
            className="mt-1.5">
            <Image
              src="/assets/icons/icon-vertical-ellipsis.svg"
              alt="options"
              width={5.65}
              height={20}
            />
          </button>

          {displayDropdown && (
            <Dropdown
              dropdownRef={dropdownRef}
              taskOrBoard="board"
              setDisplayDropdown={setDisplayDropdown}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
