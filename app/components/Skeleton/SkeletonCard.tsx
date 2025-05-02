import { Skeleton } from "@/components/ui/skeleton";
import SkeletonColumn from "./SkeletonColumn";
import { staticBoards } from "@/public/assets/data";

const SkeletonCard = () => {
  return (
    <div className="flex">
      <Skeleton className="h-[100vh] min-w-[18.75rem]" />

      <div className="grid w-full">
        <Skeleton className="w-[170vh] h-[6rem] rounded-none mb-0" />
        <div className="flex gap-6 pl-8 w-[70vw] -mt-28">
          {staticBoards[0]?.columns.map((col, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton className="w-[200px] h-[20px] mb-6" />
              <SkeletonColumn tasks={col.tasks} />
            </div>
          ))}
          <Skeleton className="w-[300px] h-[400px] mt-12" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
