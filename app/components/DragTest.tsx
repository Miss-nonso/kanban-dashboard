import React, { useState } from 'react';

const cards = [
  {
    title: 'task 1',
    desc: 'Description for card',
  },
  {
    title: 'task 2',
    desc: 'Description for card',
  },
  {
    title: 'task 3',
    desc: 'Description for card',
  },
  {
    title: 'task 4',
    desc: 'Description for card',
  },
  {
    title: 'task 5',
    desc: 'Description for card',
  },
  {
    title: 'task 6',
    desc: 'Description for card',
  },
  {
    title: 'task 7',
    desc: 'Description for card',
  },
  {
    title: 'task 8',
    desc: 'Description for card',
  },
  {
    title: 'task 9',
    desc: 'Description for card',
  },
];

const DragTest = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [isDragged, setIsDragged] = useState<number | null>(null);

  const handleDrag = (e: React.DragEvent, cardObj: object, idx: number) => {
    setIsDragged(idx);
    const stringedCard = JSON.stringify(cardObj);
    e.dataTransfer.setData('card', stringedCard);
    console.log({ e: e.dataTransfer });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    setTasks([
      ...tasks.filter(
        task => JSON.parse(task).title !== JSON.parse(e.dataTransfer.getData('card')).title
      ),
      e.dataTransfer.getData('card'),
    ]);
  };
  return (
    <div className="flex gap-6">
      <div className="w-1/2 grid gap-4 mt-16">
        {cards.map((card, index) => (
          <div
            className={`card place-items-center w-10/12 mx-auto my-2 cursor-grab ${
              isDragged === index && 'scale-105'
            }`}
            draggable
            onDragStart={e => handleDrag(e, card, index)}
            key={index}>
            <h4 className="uppercase">{card.title}</h4>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
      <div className="drop-container h-[100vh] my-16 border border-purple-500 w-1/2 p-4">
        <h2 className="text-center font-bold text-2xl">Drop zings here...</h2>

        <div
          className="drop-here border border-purple-200 h-full my-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          {tasks &&
            tasks.map((task, index) => {
              const taskObj = JSON.parse(task);
              return (
                <div
                  className="card place-items-center w-10/12 mx-auto my-2 cursor-grab"
                  draggable
                  onDragStart={e => handleDrag(e, taskObj, index)}
                  key={index}>
                  <h4 className="uppercase">{taskObj.title}</h4>
                  <p>{taskObj.desc}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DragTest;
