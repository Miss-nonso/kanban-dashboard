import Column from './Column';
import { ColumnProps } from '../utils/interface';
import EmptyColumn from './EmptyColumn';
import { indicatorColors } from '@/lib/lib';
import NoColumn from './NoColumn';

type ColumnPropsType = { columns: ColumnProps[] };

const Board = ({ columns }: ColumnPropsType) => {
  return (
    <div className={`board`}>
      {columns.length > 0 ? (
        columns.map((col, index) => (
          <div key={col._id}>
            <h4 className="uppercase flex items-center gap-2 tracking-[0.2rem] text-[14px] text-[var(--mediumgray)] mb-4 ml-1 md:mb-8 md:text-[1rem] md:tracking-[0.27rem]">
              <div
                className="h-[15px] aspect-square rounded-2xl"
                style={{
                  backgroundColor:
                    index > indicatorColors.length - 1
                      ? indicatorColors[index % indicatorColors.length]
                      : indicatorColors[index],
                }}></div>{' '}
              {col.name} <span>({col.tasks.length})</span>
            </h4>

            <Column column={col} />
          </div>
        ))
      ) : (
        <NoColumn />
      )}
      {columns.length > 0 && <EmptyColumn />}
    </div>
  );
};

export default Board;
