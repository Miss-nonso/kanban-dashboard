'use client';

import { Suspense, useEffect, useState, lazy } from 'react';
import NoBoards from '../components/NoBoards';
import { useModal } from '../context/ModalContext';
import Modal from '../components/Modal';
import { useBoards } from '../context/BoardContext';
import { useRouter } from 'next/navigation';

const LazyComponent = lazy(() => import('@/app/components/Skeleton/SkeletonCard'));

const VoidBoards = () => {
  const { openModal, modalValue } = useModal();
  const { boards } = useBoards();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (boards.length > 0) {
      router.push(`/boards/${boards[0]._id}/${boards[0].name.replace(/ /g, '-')}`);
    } else {
      setIsClient(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {openModal && <Modal ModalContent={modalValue?.modalContent} />}
      {isClient ? (
        <NoBoards />
      ) : (
        <Suspense fallback={<LazyComponent />}>
          <LazyComponent />
        </Suspense>
      )}
    </>
  );
};

export default VoidBoards;
