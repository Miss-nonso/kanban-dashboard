import { Skeleton } from '@/components/ui/skeleton';
import SkeletonColumn from './SkeletonColumn';
import { staticBoards } from '@/public/assets/data';

const dummyBoards = ['', '', '', '', '', '', '', ''];

const SkeletonCard = () => {
  return (
    <>
      <div className="w-[100vw] flex">
        <Skeleton className="hidden md:block relative h-[100vh] min-w-[18.75rem]" />
        <Skeleton className="w-[12rem] h-7 absolute top-8 left-6 hidden md:block" />

        <div className="absolute top-32 ml-4 hidden md:block">
          <Skeleton className="w-[10rem] h-5 mb-6 ml-6" />

          <div className="grid gap-8">
            {dummyBoards.map((_, index) => (
              <div className="flex items-center gap-2" key={index}>
                <Skeleton className="w-[2rem] h-8" /> <Skeleton className="w-[10rem] h-10" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid w-full ">
          <Skeleton className="w-[100vw] relative h-[6rem] rounded-none" />

          <div className="absolute mx-8 w-full flex justify-between items-center  h-[6rem] md:w-[78vw] md:mx-8">
            <Skeleton className="h-5 w-[8rem] " />
            <div className="flex gap-4 mr-12">
              {' '}
              <Skeleton className=" h-6 w-[2rem] md:w-[10rem] " />
              <Skeleton className=" h-5 w-[0.5rem]" />
            </div>
          </div>

          <div className="flex gap-6 pl-8 w-[70vw] mt-[2rem] md:-mt-28 ">
            {staticBoards[0]?.columns.map((col, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton className="w-[150px] md:w-[200px] h-[20px] mb-6" />
                <SkeletonColumn tasks={col.tasks} />
              </div>
            ))}
            <Skeleton className="w-[300px] h-[400px] mt-12" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;
