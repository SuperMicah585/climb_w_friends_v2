import ZincModal from '../../../reusableComponents/genericModal';
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
  const [titleInputValid, setTitleInputValid] = useState<boolean>(true);
  const [descriptionInputValid, setDescriptionInputValid] =
    useState<boolean>(true);

  const checkInput = () => {
    if (titleState.length < 1) {
      setTitleInputValid(false);
    }

    if (descriptionState.length < 1) {
      setDescriptionInputValid(false);
    }
  };

  //generating random number to test id
  let min = 100;
  let max = 1000;
  let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  const buttonClickCallBack = () => {
    if (titleState.length > 0 && descriptionState.length > 0) {
      newMapCallBack({
        mapId: randomInt,
        mapName: titleState,
        description: descriptionState,
        climbersOnMap: [
          {
            id: randomInt,
            firstName: 'Micah',
            lastName: 'Phelps',
            email: 'micahphlps@gmail.com',
            userName: 'mphelps',
          },
        ],
      });
    }
  };

  return (
    <ZincModal
      maxHeight={'max-h-[500px]'}
      maxWidth={'max-w-[500px]'}
      opacityColor={'bg-zinc-700'}
      bgColor={'bg-zinc-50'}
      closeModalCallBack={closeAddModalCallBack}
      closeButtonColor={'text-black'}
    >
      <div className="flex h-full w-full flex-col">
        <div className="mt-8 flex flex-col gap-10 overflow-y-scroll p-1">
          <div className="flex flex-col gap-5">
            <div className="font-semibold text-black"> Title</div>
            <textarea
              onChange={(e) => {
                setTitleInputValid(true);
                setTitleState(e.target.value);
              }}
              value={titleState}
              placeholder="Add a Title to Your Map"
              className={`text-thin h-16 w-full rounded-md bg-white ${!titleInputValid ? 'border-2 border-red-500' : 'border border-black'} p-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-violet-500`}
            ></textarea>
          </div>

          <div className="flex flex-col gap-5">
            <div className="font-semibold text-black"> Description</div>
            <textarea
              onChange={(e) => {
                setDescriptionInputValid(true);
                setDescriptionState(e.target.value);
              }}
              value={descriptionState}
              placeholder="Add a Description to Your Map"
              className={`text-thin h-20 w-full rounded-md bg-white ${!descriptionInputValid ? 'border-2 border-red-500' : 'border border-black'} p-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-violet-500`}
            ></textarea>
          </div>
        </div>
        <div className="flex-grow"> </div>
        <div className="h-26 flex w-full flex-col justify-center bg-white">
          <div
            className="ml-auto cursor-pointer rounded-full bg-violet-500 p-2 pl-5 pr-5 font-bold text-white hover:opacity-75"
            onClick={() => {
              buttonClickCallBack();
              {
                titleState.length > 0 && descriptionState.length > 0
                  ? closeAddModalCallBack(false)
                  : null;
              }
              checkInput();
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
