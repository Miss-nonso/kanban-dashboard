import React from 'react';
import { TaskProps } from '../../utils/interface';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonColumn = ({ tasks }: { tasks: TaskProps[] }) => {
  return (
    <div className="grid gap-y-4 h-[60vh]">
      {tasks.map((_, index) => (
        <Skeleton className=" h-[5.5rem] w-[250px] md:w-[300px]" key={index} />
      ))}
    </div>
  );
};

export default SkeletonColumn;
