import ZincModal from '../../../reusableComponents/genericModal';
import { useEffect, useState } from 'react';
import { Tags } from '../../../types/interfaces';
import Tooltip from '../../../reusableComponents/toolTip';
import PurpleButton from '../../../reusableComponents/genericButton';
import ToastContainer from '../../../reusableComponents/toastContainer';

interface AddMapComponentInterface {
  closelCallBack: (value: boolean) => void;
  newTagCallBack: (data: Tags[]) => void;
  tags: Tags[];
}

const AddMapComponent: React.FC<AddMapComponentInterface> = ({
  closelCallBack,
  newTagCallBack,
  tags,
}) => {
  const [tagName, setTagName] = useState<string>('');
  const [tagNameValid, setTagNameValid] = useState(true);
  const [modifiedTags, setModifiedTags] = useState(tags);
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  //generating random number to test id

  const buttonClickCallBack = () => {
    let min = 100;
    let max = 1000;
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    newTag({
      id: randomInt,
      tag: tagName,
    });
  };

  const newTag = (data: Tags) => {
    setModifiedTags((prev) => {
      // Check if the tag already exists in the array
      const tagExists = prev.some((tagObj) => tagObj.tag === data.tag);

      // If it doesn't exist, add it to the array, otherwise return the existing array
      if (!tagExists && data.tag.length > 0) {
        return [...prev, data];
      }
      return prev;
    });
  };

  const checkTagInput = () => {
    if (tagName.length >= 1 && tagName.length <= 10) {
      if (modifiedTags.some((tagObj) => tagObj.tag === tagName)) {
        setTagNameValid(false);
        setToastType('error');
        setToastMessage(`The tag '${tagName}' already exists.`);
        setToastTrigger((prev) => prev + 1);
      } else {
        setToastType('success');
        setToastMessage(`The tag '${tagName}' has been added.`);
        setToastTrigger((prev) => prev + 1);
        buttonClickCallBack();
      }
    } else {
      setToastType('error');
      setToastMessage('Tags must be between 1 and 10 characters');
      setToastTrigger((prev) => prev + 1);
      setTagNameValid(false);
    }
  };

  const deleteTagCallBack = (item: Tags) => {
    setModifiedTags((prev) => prev.filter((tagObj) => tagObj.id !== item.id));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent the default form submission
    buttonClickCallBack();
    // Add any additional actions here, like sending data to an API
  };

  return (
    <>
      <ToastContainer
        trigger={toastTrigger}
        mode="dark"
        type={toastType}
        message={toastMessage}
      />
      <ZincModal
        maxHeight={'max-h-[500px]'}
        maxWidth={'max-w-[500px]'}
        closeModalCallBack={closelCallBack}
      >
        <div className="flex h-full w-full flex-col">
          <div className="mt-8 flex flex-col gap-10 overflow-y-scroll p-1">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="font-semibold"> Add Tag</div>

                <div className="flex items-center gap-5">
                  <form onSubmit={handleSubmit}>
                    <input
                      onChange={(e) => {
                        setTagNameValid(true);
                        setTagName(e.target.value);
                      }}
                      placeholder="Type to Add Tag"
                      value={tagName}
                      className={`text-thin w-48 rounded-lg ${!tagNameValid ? 'border-red-500' : 'border-transparent'} border-2 bg-zinc-950 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                    />
                  </form>

                  <div onClick={() => checkTagInput()}>
                    <PurpleButton> Add Tag </PurpleButton>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="font-semibold"> Tags</div>
                <div className="flex flex-wrap gap-2">
                  {modifiedTags.map((item) => (
                    <Tooltip deleteItemCallBack={deleteTagCallBack} item={item}>
                      {' '}
                      <div className="flex cursor-pointer rounded-md bg-green-800 p-1 text-center text-sm hover:opacity-75">
                        {item.tag}{' '}
                      </div>{' '}
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow"> </div>
          <div
            onClick={() => {
              newTagCallBack(modifiedTags);
              closelCallBack(false);
            }}
            className="flex justify-end"
          >
            <PurpleButton> Apply</PurpleButton>
          </div>
        </div>
      </ZincModal>
    </>
  );
};
export default AddMapComponent;
