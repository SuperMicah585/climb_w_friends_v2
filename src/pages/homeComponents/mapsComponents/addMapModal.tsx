import ZincModal from '../../../reusableComponents/zincModal';
import { useState } from 'react';
import { MapObject } from '../../../types/interfaces';
interface AddMapComponentInterface {
  closeAddModalCallBack: (value: boolean) => void;
  newMapCallBack: (mapData: MapObject) => void;
}

const AddMapComponent: React.FC<AddMapComponentInterface> = ({
  closeAddModalCallBack,
  newMapCallBack,
}) => {
  const [titleState, setTitleState] = useState<string>('');
  const [descriptionState, setDescriptionState] = useState<string>('');

  //generating random number to test id
  let min = 100;
  let max = 1000;
  let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  const buttonClickCallBack = () => {
    newMapCallBack({
      id: randomInt,
      name: titleState,
      description: descriptionState,
      totalClimbs: 0,
      tags:[],
      peopleOnMap: [
        {
          id: randomInt,
          firstName: 'Micah',
          lastName: 'Phelps',
          email: 'micahphlps@gmail.com',
          userName: 'mphelps',
        },
      ],
    });
  };

  return (
    <ZincModal
      maxHeight={'max-h-[500px]'}
      maxWidth={'max-w-[500px]'}
      closeModalCallBack={closeAddModalCallBack}
    >
      <div className="flex h-full w-full flex-col">
        <div className="mt-8 flex flex-col gap-10 overflow-y-scroll p-1">
          <div className="flex flex-col gap-5">
            <div className="font-semibold"> Title</div>
            <textarea
              onChange={(e) => setTitleState(e.target.value)}
              value={titleState}
              className="text-thin h-12 w-full rounded-lg bg-zinc-950 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            ></textarea>
          </div>

          <div className="flex flex-col gap-5">
            <div className="font-semibold"> Description</div>
            <textarea
              onChange={(e) => setDescriptionState(e.target.value)}
              value={descriptionState}
              className="text-thin h-20 w-full rounded-lg bg-zinc-950 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            ></textarea>
          </div>
        </div>
        <div className="flex-grow"> </div>
        <div className="h-26 flex w-full flex-col justify-center bg-zinc-900">
          <div
            className="ml-auto mt-2 inline-flex cursor-pointer rounded-lg bg-violet-500 p-2 font-semibold text-zinc-900 hover:opacity-75"
            onClick={() => {
              buttonClickCallBack();
              closeAddModalCallBack(false);
            }}
          >
            Submit
          </div>
        </div>
      </div>
    </ZincModal>
  );
};
export default AddMapComponent;
