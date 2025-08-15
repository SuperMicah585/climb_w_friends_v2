import ZincModal from '../../../reusableComponents/genericModal';
import { useState } from 'react';
import { MapObject } from '../../../types/interfaces';
import ToastContainer from '../../../reusableComponents/toastContainer';
import ImageUpload from '../../../reusableComponents/imageUpload';

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
  const [imageUrl, setImageUrl] = useState<string>('');
  const [titleInputValid, setTitleInputValid] = useState<boolean>(true);
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [descriptionInputValid, setDescriptionInputValid] =
    useState<boolean>(true);

  const handleButtonClick = () => {
    if (
      titleState.length >= 6 &&
      titleState.length <= 29 &&
      descriptionState.length >= 6 &&
      descriptionState.length <= 249
    ) {
      closeAddModalCallBack(false);
      newMapCallBack({
        mapId: 0,
        mapName: titleState,
        description: descriptionState,
        imageUrl: imageUrl,
      });
    }
  };

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
      }, 50); // Slight delay to prevent batching
    }
  };

  //generating random number to test id

  return (
    <>
      <ToastContainer
        trigger={toastTrigger}
        mode={'light'}
        type={toastType}
        message={toastMessage}
      />

      <ZincModal
        maxHeight={'max-h-[700px]'}
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

            <div className="flex flex-col gap-5">
              <div className="font-semibold text-black"> Map Image (Optional)</div>
              <ImageUpload
                onImageUploaded={setImageUrl}
                currentImageUrl={imageUrl}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex-grow"> </div>
          <div className="h-26 flex w-full flex-col justify-center bg-white">
            <div
              className="ml-auto cursor-pointer rounded-full bg-violet-500 p-2 pl-5 pr-5 font-bold text-white hover:opacity-75"
              onClick={() => {
                handleButtonClick();
                checkInput();
              }}
            >
              Submit
            </div>
          </div>
        </div>
      </ZincModal>
    </>
  );
};
export default AddMapComponent;
