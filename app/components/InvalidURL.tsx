import Link from 'next/link';

const InvalidURL = () => {
  return (
    <div className="w-[100vw] h-[100vh] text-white bg-[#20212c] text-center flex flex-col gap-6 justify-center items-center">
      <h2 className="text-6xl">Invalid URL ⚠️</h2>
      <p className="text-center text-[1.1rem]">
        Whoa there, explorer! 🚀 <br /> That link looks a bit… suspicious. 🤨
      </p>
      <Link
        href="/"
        className="bg-[var(--darkpurple)] p-4 rounded-lg hover:scale-[1.02] transition-all duration-300 ease-in-out">
        Back to Base
      </Link>
    </div>
  );
};

export default InvalidURL;
