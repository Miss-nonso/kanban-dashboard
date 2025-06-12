'use client';
import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import { useBoards } from '@/app/context/BoardContext';

const Footer = () => {
  const { boards } = useBoards();
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col">
            <Logo />
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm">
              Built by{' '}
              <span className="inline-flex items-center text-gray-500 italic">
                Nonso Daniels🍀🤍
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-zinc-900 dark:text-white font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm flex items-center"
                  href="/docs">
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
                    className="lucide lucide-external-link h-4 w-4 mr-2">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/usekaneo/kaneo"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm flex items-center">
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
                    className="lucide lucide-github h-4 w-4 mr-2">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href={
                    boards.length > 0
                      ? `/boards/${boards[0]._id}/${boards[0].name.replace(/ /g, '-')}`
                      : `/boards`
                  }
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm flex items-center">
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
                    className="lucide lucide-external-link h-4 w-4 mr-2">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                  Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-zinc-900 dark:text-white font-medium mb-4">Contact developer</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.linkedin.com/in/nonso-daniels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm flex items-center">
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
                    className="lucide lucide-twitter h-4 w-4 mr-2">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/rU4tSyhXXU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm flex items-center">
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
                    className="lucide lucide-message-square h-4 w-4 mr-2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  X
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:chinonsodaniels2020@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm flex items-center">
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
                    className="lucide lucide-message-square h-4 w-4 mr-2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Message
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
