'use client';

import { useState, useEffect, Fragment } from 'react';
import { useBoards } from './context/BoardContext';
import { Suspense, lazy } from 'react';
import SkeletonCard from './components/Skeleton/SkeletonCard';
import LandingPage from './components/LandingPage/LandingPage';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { isLoading, setIsLoadingTrue, setIsLoadingFalse } = useBoards();

  const LazyComponent = lazy(() => import('@/app/components/Skeleton/SkeletonCard'));

  useEffect(() => {
    setIsLoadingTrue();

    setTimeout(() => {
      setIsClient(true);
      setIsLoadingFalse();
    }, 2000);
  }, []);

  return (
    <div className=" h-full w-full">
      {isLoading || !isClient ? (
        <Suspense fallback={<SkeletonCard />}>
          <LazyComponent />
        </Suspense>
      ) : (
        <Fragment>
          <LandingPage />
        </Fragment>
      )}
    </div>
  );
}
