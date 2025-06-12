import { useSidebar } from '../context/SidebarContext';
import Image from 'next/image';

const SidebarButton = () => {
  const { handleSidebar } = useSidebar();
  return (
    <button
      className="bg-[var(--darkpurple)] rounded-3xl rounded-l-none px-6 py-4 hidden bottom-16 -left-3 md:fixed md:grid"
      onClick={handleSidebar}>
      <span className="">
        <Image
          src="/assets/icons/icon-show-sidebar.svg"
          alt="show sidebaar"
          width={16}
          height={16}
        />
      </span>
    </button>
  );
};

export default SidebarButton;
