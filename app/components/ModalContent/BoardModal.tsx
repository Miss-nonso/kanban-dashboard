'use client';

import { BoardProps } from '@/app/utils/interface';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import { DraggableInputAdd } from '../InputAdd';
import { useModal } from '@/app/context/ModalContext';
import { useParams } from 'next/navigation';
import { useBoards } from '@/app/context/BoardContext';
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
const MAX_BOARD_NAME_LENGTH = 20;

type BoardModalProps = {
  type?: 'add' | 'edit' | 'addColumn';
};
type ColumnValue<T extends string = 'name'> = {
  _id: string;
} & Record<T, string>;

const BoardModal = ({ type }: BoardModalProps) => {
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;
  const { modalRef, closeModal } = useModal();
  const { createNewBoard, editBoard, boards, getCurrentBoard } = useBoards();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentBoard, setCurrentBoard] = useState(getCurrentBoard(`${id}`));
  const [inputErrors, setInputErrors] = useState<ColumnValue<'error'>[]>([]);
  const [inputValues, setInputValues] = useState<ColumnValue[]>([]);
  const [boardname, setBoardname] = useState<string | undefined>(getBoardName);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const inputValuesWithId = useMemo(
    () => inputValues.map(item => ({ ...item, id: item._id })),
    [inputValues]
  );

  const formValid = useMemo(() => {
    const duplicateColumnNamesExist = duplicatesExist();

    if (duplicateColumnNamesExist) {
      toast({ title: "Columns can't have same name", variant: 'destructive' });
    }

    return (
      boardname &&
      boardname.length < MAX_BOARD_NAME_LENGTH &&
      inputValues &&
      inputValues.every(item => !!item.name) &&
      inputErrors.every(item => !item.error) &&
      !duplicateColumnNamesExist &&
      (type === 'addColumn' ? boardname.length > 2 : true)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardname, inputValues, inputErrors, type]);

  function getBoardName() {
    if (type === 'edit' || type === 'addColumn') {
      return currentBoard?.name;
    } else {
      return '';
    }
  }

  function getInitialInputValues(): ColumnValue[] {
    const valuesArr: ColumnValue[] = [];

    if (type === 'edit' || type === 'addColumn') {
      if (currentBoard) {
        const columnNames = currentBoard.columns.map(col => ({ name: col.name, _id: col._id }));
        return type === 'addColumn' ? [...columnNames, { name: '', _id: nanoid(10) }] : columnNames;
      }
    }

    return valuesArr;
  }

  function duplicatesExist() {
    if (inputValues) {
      const columnValues = inputValues.map(val => val.name.trim().toLowerCase()).filter(val => val);

      const uniqueValues = new Set(columnValues);

      if (columnValues.length > 1) {
        const bool = [...uniqueValues.values()].length < columnValues.length;

        return bool;
      } else return false;
    }
  }

  function deleteInput(index: number) {
    setInputValues(prev => prev.filter((_, idx) => idx !== index));
    setInputErrors(prev => prev.filter((_, idx) => idx !== index));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value;

    setInputErrors(prev => {
      const prevCopy = [...prev];
      prevCopy[index].error = value ? '' : "Can't be empty";
      return prevCopy;
    });

    setInputValues(prev => {
      const prevCopy = [...prev];
      prevCopy[index].name = value;
      return prevCopy;
    });
  }

  function handleSubmitBoardForm(
    e: FormEvent<HTMLFormElement>,
    type?: 'add' | 'edit' | 'addColumn'
  ) {
    e.preventDefault();

    if (!formValid) {
      toast({ title: 'Form is not valid!', variant: 'destructive' });
      return;
    }

    const columnValues = inputValues.map(({ name, _id }) => ({ name: name.trim(), _id }));

    if (type === 'edit' || type === 'addColumn') {
      handleEditBoard(columnValues);
    } else {
      handleAddBoard(columnValues);
    }
  }

  function handleEditBoard(values: ColumnValue[]) {
    if (!boardname) {
      return;
    }

    const updatedBoards = boards.map(b => {
      if (b._id === id) {
        const updatedColumns = values.map(colVal => ({
          ...colVal,
          tasks: b.columns.find(col => col._id === colVal._id)?.tasks || [],
        }));

        return { ...b, name: boardname, columns: updatedColumns };
      }
      return b;
    });

    editBoard(updatedBoards);

    closeModal();
    toast({ title: 'Board edited ✅' });
  }

  function handleAddBoard(values: ColumnValue[]) {
    if (!boardname) {
      return;
    }

    const boardObj: Omit<BoardProps, '_id'> = {
      name: boardname
        .split(' ')
        .map(
          (word: string) => word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase()
        )
        .join(' '),
      columns: values.map(colVal => ({
        ...colVal,
        tasks: [],
      })),
    };

    createNewBoard(boardObj);
    closeModal();
  }

  function handleAddInput(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e?.preventDefault();

    if (inputValues) {
      inputValues.forEach((input, index) => {
        if (input.name === '') {
          setInputErrors(prev => {
            const prevCopy = [...prev];
            prevCopy[index].error = "Can't be empty";
            return prevCopy;
          });
        }
      });

      const emptyValueExists = inputValues.some(input => input.name === '');

      if (!emptyValueExists) {
        const newId = nanoid(10);

        setInputValues(prev => prev && [...prev, { name: '', _id: newId }]);
        setInputErrors(prev => prev && [...prev, { error: '', _id: newId }]);
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setInputValues(prev => {
      const oldIndex = prev.findIndex(item => item?._id === active.id);
      const newIndex = prev.findIndex(item => item?._id === over.id);

      // return new array with the updated positions of the items
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  useEffect(() => {
    const inputValuesArr = getInitialInputValues();

    setInputValues(inputValuesArr);
    setInputErrors(inputValuesArr.map(item => ({ _id: item._id, error: '' })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content-wrapper" ref={modalRef}>
      <h5>{type === 'add' ? 'Add New Board' : 'Edit Board'}</h5>

      <form onSubmit={e => handleSubmitBoardForm(e, type)}>
        <div className="form-input-wrapper">
          <label htmlFor="boardName">Name</label>

          <input
            type="text"
            name="boardName"
            id="boardName"
            required
            autoFocus
            value={boardname}
            onChange={e => {
              setBoardname(e.target.value);

              if (e.target.value.length > MAX_BOARD_NAME_LENGTH) {
                toast({
                  title: 'Board name too long!',
                  description: `Max ${MAX_BOARD_NAME_LENGTH} characters`,
                  variant: 'destructive',
                });
              }
            }}
            disabled={type === 'addColumn'}
          />
        </div>

        <div>
          <div>
            {' '}
            <label htmlFor="subtasks">Columns</label>
            <div className="all-col-input-container">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}>
                <SortableContext strategy={verticalListSortingStrategy} items={inputValuesWithId}>
                  {inputValuesWithId.map(({ name, _id }, index) => (
                    <DraggableInputAdd
                      key={_id}
                      id={_id}
                      value={name}
                      type={type === 'edit' ? 'edit' : 'add'}
                      error={inputErrors[index].error}
                      deleteInput={() => deleteInput(index)}
                      onChange={e => onChange(e, index)}
                      disabled={
                        currentBoard &&
                        type === 'addColumn' &&
                        index <= currentBoard.columns.length - 1
                      }
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>

          <Button
            type="add"
            text=" Add New Column"
            btnClass="secondary"
            fn={e => handleAddInput(e)}
            btnType="button"
          />
        </div>

        <Button
          text={type === 'add' ? 'Create Board' : 'Save Changes'}
          btnClass="primary"
          btnType="submit"
          disabled={!formValid}
        />
      </form>
    </div>
  );
};

export default BoardModal;
