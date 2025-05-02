import React from "react";
import { TaskProps } from "../../utils/interface";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonColumn = ({ tasks }: { tasks: TaskProps[] }) => {
  return (
    <div className="grid gap-y-4 h-[60vh]">
      {tasks.map((_, index) => (
        <Skeleton className="w-[300px] h-[5.5rem]" key={index} />
      ))}
    </div>
  );
};

export default SkeletonColumn;
