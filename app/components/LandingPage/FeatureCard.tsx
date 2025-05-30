import React from "react";

interface FeatureDataProps {
  icon: React.JSX.Element;
  title: string;
  description: string;
}

const FeatureCard = ({ data }: { data: FeatureDataProps }) => {
  return (
    <div className="relative  rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors  duration-200">
      <div className="inline-flex p-3 rounded-lg bg-indigo-50 dark:bg-indigo-500/10">
        {data.icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
        {data.title}
      </h3>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {data.description}
      </p>
    </div>
  );
};

export default FeatureCard;
