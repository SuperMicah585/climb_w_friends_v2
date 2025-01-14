import { MapObject } from '../../../types/interfaces';
import ZincModal from '../../../reusableComponents/genericModal';
import ToastContainer from '../../../reusableComponents/toastContainer';

import { useState, useEffect } from 'react';

type EditModalProps = {
  editMapObject: MapObject;
  closeModalCallBack: (trigger: boolean) => void;
  EditedClimbCallBack: (item: MapObject) => void;
};
const EditMapModal: React.FC<EditModalProps> = ({
  closeModalCallBack,
  editMapObject,
  EditedClimbCallBack,
}) => {
  const [titleState, setTitleState] = useState<string>(
    editMapObject?.mapName || '',
  );
  const [descriptionState, setDescriptionState] = useState<string>(
    editMapObject?.description || '',
  );
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [titleInputValid, setTitleInputValid] = useState<boolean>(true);
  const [descriptionInputValid, setDescriptionInputValid] =
    useState<boolean>(true);

  const checkInput = () => {
    if (titleState.length < 6 || titleState.length > 29) {
      setToastType('error');
      setToastMessage('Title must be between 5 and 30 characters');
      setToastTrigger((prev) => prev + 1);

      setTitleInputValid(false);
    }

    if (descriptionState.length < 6 || descriptionState.length > 249) {
      setTimeout(() => {
        setToastType('error');
        setToastMessage('Description must be between 5 and 250 characters');
        setToastTrigger((prev) => prev + 1);
        setDescriptionInputValid(false);
      }, 50);
    }
  };

  useEffect(() => {}, []);

  const handleButtonClick = async () => {
    if (
      titleState.length >= 6 &&
      titleState.length <= 29 &&
      descriptionState.length >= 6 &&
      descriptionState.length <= 249
    ) {
      closeModalCallBack(false);
      EditedClimbCallBack({
        mapId: editMapObject.mapId,
        mapName: titleState,
        description: descriptionState,
        climbersOnMap: editMapObject.climbersOnMap,
      });
    }
  };
  const changeMapMetaData = (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1">
          <div className="font-semibold text-black"> Title -</div>
          <div className="text-thin text-xs text-black">
            {' '}
            Edit the Title of Your Map
          </div>
        </div>
        <textarea
          onChange={(e) => {
            setTitleState(e.target.value);
            setTitleInputValid(true);
          }}
          value={titleState}
          className={`text-thin h-16 w-full rounded-md ${titleInputValid ? 'border border-black' : 'border-2 border-red-500'} bg-white p-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-violet-500`}
        ></textarea>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1">
          <div className="font-semibold text-black"> Description -</div>
          <div className="text-thin text-xs text-black">
            {' '}
            Edit the Description of Your Map
          </div>
        </div>
        <textarea
          onChange={(e) => {
            setDescriptionInputValid(true);
            setDescriptionState(e.target.value);
          }}
          value={descriptionState}
          className={`text-thin h-20 w-full rounded-md border text-black ${descriptionInputValid ? 'border-black' : 'border-2 border-red-500'} bg-white p-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
        ></textarea>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer
        trigger={toastTrigger}
        mode={'light'}
        type={toastType}
        message={toastMessage}
      />
      <ZincModal
        maxHeight={'max-h-[500px]'}
        maxWidth={'max-w-[500px]'}
        opacityColor={'bg-zinc-700'}
        bgColor={'bg-zinc-50'}
        closeModalCallBack={closeModalCallBack}
        closeButtonColor={'text-black'}
      >
        <div className="mt-10 flex h-full w-full flex-col gap-5 overflow-y-scroll p-1">
          {changeMapMetaData}
        </div>

        <div
          onClick={() => {
            {
              handleButtonClick();
              checkInput();
            }
          }}
          className="ml-auto cursor-pointer rounded-full bg-violet-500 p-2 pl-5 pr-5 font-bold text-white hover:opacity-75"
        >
          {' '}
          Save{' '}
        </div>
      </ZincModal>
    </>
  );
};
export default EditMapModal;
