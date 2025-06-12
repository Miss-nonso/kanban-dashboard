import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBoards } from '@/app/context/BoardContext';

const Hero = () => {
  const { boards } = useBoards();

  return (
    <div className="landingPageHero mb-28 sm:mb-96">
      <div className="coloured-elements-wrapper h-screen blur-3xl relative  ">
        <div
          className="coloured-elements h-full opacity-40"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}></div>
      </div>
      <div className="absolute h-full w-full px-4 flex flex-col items-center top-36 gap-2 sm:top-44">
        {' '}
        <Link
          href="mailto:chinonsodaniels2020@gmail.com"
          className=" hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-zinc-50 dark:bg-zinc-900 group mx-auto flex w-fit items-center gap-4 rounded-full border border-zinc-200 dark:border-zinc-800 p-1 pl-4 shadow-md shadow-zinc-950/5 transition-all duration-300 hover:scale-[1.02]">
          <span className="pr-2"> Contact developer</span>
          <span className="block h-4 w-0.5 border-l border-zinc-300 dark:border-zinc-700"></span>
          <div className="bg-white dark:bg-zinc-800 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700 size-6 overflow-hidden rounded-full duration-500">
            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
              <span className="flex size-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right m-auto size-3 text-zinc-600 dark:text-zinc-400">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
              <span className="flex size-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right m-auto size-3 text-zinc-600 dark:text-zinc-400">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </Link>
        <h1 className="mx-auto mt-8 max-w-4xl text-center font-display text-4xl font-medium  animate-fade-in-medium tracking-tight text-zinc-900 dark:text-white sm:text-7xl animate-fade-in">
          Project management <br />
          <span className="relative whitespace-nowrap text-indigo-600 dark:text-indigo-400">
            made simple
          </span>{' '}
          for teams
        </h1>
        <p className="text-[var(--zincgray)] text-base text-center mt-6 max-w-2xl sm:text-lg sm:px-16">
          A project management platform focused on simplicity and efficiency. Self-host it,
          customize it, make it yours.
        </p>
        <div className="btn-wrapper mt-10 min-h-3/4 flex items-center flex-wrap justify-center gap-4 animate-fade-in-delay-2">
          <Link
            href={
              boards.length > 0
                ? `/boards/${boards[0]._id}/${boards[0].name.replace(/ /g, '-')}`
                : `/boards`
            }
            target="_blank"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-lg shadow-indigo-500/20 py-2 bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02] dark:bg-indigo-500 dark:hover:bg-indigo-400 h-12 px-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-external-link mr-2 h-4 w-4">
              <path d="M15 3h6v6"></path>
              <path d="M10 14 21 3"></path>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            </svg>
            <span>Try demo</span>
          </Link>
          <Link
            href="https://github.com/Miss-nonso/kanban-dashboard"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-lg py-2 bg-white text-zinc-900 hover:bg-zinc-50 hover:scale-[1.02] dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 h-12 px-8 border border-zinc-200 dark:border-zinc-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-terminal mr-2 h-4 w-4">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" x2="20" y1="19" y2="19"></line>
            </svg>{' '}
            <span> View code</span>
          </Link>
        </div>
        <div className="mt-16 sm:mt-24 min-h-3/4 animate-fade-in-delay-3">
          <div
            className="relative h-[400px] sm:h-[600px]"
            // id="laptop-container"
          >
            <div className="w-full relative" style={{ perspective: '1000px' }}>
              <div
                className="max-w-5xl mx-auto h-[450px] sm:h-[600px] w-full border-4 border-zinc-700 dark:border-zinc-600  p-2 sm:p-6 bg-zinc-800 dark:bg-zinc-900 rounded-[30px] shadow-2xl"
                style={{
                  transform: 'translateY(33.1117px) scale(1.03311) rotateX(13.2447deg)',
                }}>
                <div className="h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900">
                  <Image
                    alt="Kanban board interface - Light mode"
                    loading="lazy"
                    width="1920"
                    height="1080"
                    decoding="async"
                    data-nimg="1"
                    className="object-cover h-full w-full object-left-top rounded-lg transition-transform duration-700 hover:scale-[1.02] hidden sm:block dark:hidden "
                    style={{ color: 'transparent' }}
                    src="/assets/images/kanban-interface-light.png"
                  />
                  <Image
                    alt="Kanban board interface - Dark mode"
                    loading="lazy"
                    width="1920"
                    height="1080"
                    decoding="async"
                    data-nimg="1"
                    className="object-cover h-full w-full object-left-top rounded-lg transition-transform duration-700 hover:scale-[1.02] hidden sm:dark:block "
                    style={{ color: 'transparent' }}
                    src="/assets/images/kanban-interface-dark.png"
                  />
                  <div className="relative h-full block sm:hidden">
                    <Image
                      alt="Kanban board interface mobile - Light mode"
                      loading="lazy"
                      width="750"
                      height="1334"
                      decoding="async"
                      data-nimg="1"
                      className="object-cover h-full w-full object-left-top rounded-lg transition-transform duration-700 hover:scale-[1.02] block dark:hidden"
                      src="/assets/images/kanban-mobile-light.png"
                    />
                    <Image
                      alt="Kanban board interface mobile - Dark mode"
                      loading="lazy"
                      width="750"
                      height="1334"
                      decoding="async"
                      data-nimg="1"
                      className="object-cover h-full w-full object-left-top rounded-lg transition-transform duration-700 hover:scale-[1.02] hidden dark:block"
                      src="/assets/images/kanban-mobile-dark.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
