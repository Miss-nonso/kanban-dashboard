import FeatureCard from './FeatureCard';
import { Fragment } from 'react';

const featureData = [
  {
    title: 'Visual Task Management',
    description:
      'Organize tasks with our intuitive kanban board interface. Drag and drop tasks, set priorities, and track progress.',
    icon: (
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
        className="lucide lucide-kanban h-6 w-6 text-indigo-600 dark:text-indigo-400">
        <path d="M6 5v11"></path>
        <path d="M12 5v6"></path>
        <path d="M18 5v14"></path>
      </svg>
    ),
  },
  {
    title: ' Self-hosted & Secure',
    description:
      'Deploy on your own infrastructure with complete control over your data and customization options.',
    icon: (
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
        className="lucide lucide-cloud h-6 w-6 text-indigo-600 dark:text-indigo-400">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      </svg>
    ),
  },

  {
    title: 'Data Privacy',
    description:
      'Built with security in mind. Your data stays private and protected with robust security measures.',
    icon: (
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
        className="lucide lucide-lock h-6 w-6 text-indigo-600 dark:text-indigo-400">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8 mt-16 sm:pt-10 sm:px-6 lg:px-8  ">
      <div className="text-center max-w-2xl mx-auto pb-8 sm:pb-16">
        {' '}
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl animate-fade-in">
          Simple and powerful
        </h2>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400 animate-fade-in-delay sm:mt-4">
          Focused on essential features than matter
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featureData.map((data, index) => (
          <Fragment key={index}>
            <FeatureCard data={data} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Features;
