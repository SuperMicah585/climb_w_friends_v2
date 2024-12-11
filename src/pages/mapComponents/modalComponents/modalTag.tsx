import ZincModal from '../../../reusableComponents/genericModal';
import { useEffect, useState } from 'react';
import { Tags } from '../../../types/interfaces';
import Tooltip from '../../../reusableComponents/toolTip';
import PurpleButton from '../../../reusableComponents/genericButton';
import ToastContainer from '../../../reusableComponents/toastContainer';
import { createTag, removeTagFromMap } from '../mapApiRequests';

interface AddMapComponentInterface {
  closelCallBack: (value: boolean) => void;
  mapId: number;
}

const AddMapComponent: React.FC<AddMapComponentInterface> = ({
  closelCallBack,
  mapId,
}) => {
  const [tagName, setTagName] = useState<string>('');
  const [tagNameValid, setTagNameValid] = useState(true);
  const [modifiedTags, setModifiedTags] = useState<Tags[]>([]);
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  //generating random number to test id

  const newTag = async () => {
    const addTag = await createTag(tagName, mapId);
    console.log(addTag);
    //Request to DB will be created
    setModifiedTags((prev) => {
      return [...prev, addTag];
    });
  };

  useEffect(() => {
    const retrieveTagsOnMap = async (mapId: number) => {
      const url = `http://localhost:5074/api/Maps/Tags/${mapId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json, 'response!');
        // Update the specific object at the given index in the array
        setModifiedTags(json);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    retrieveTagsOnMap(mapId);
  }, [mapId]);

  const checkTagInput = () => {
    if (tagName.length >= 1 && tagName.length <= 10) {
      if (modifiedTags?.some((tagObj) => tagObj.tagName === tagName)) {
        setTagNameValid(false);
        setToastType('error');
        setToastMessage(`The tag '${tagName}' already exists.`);
        setToastTrigger((prev) => prev + 1);
      } else {
        setToastType('success');
        setToastMessage(`The tag '${tagName}' has been added.`);
        setToastTrigger((prev) => prev + 1);
        newTag();
      }
    } else {
      setToastType('error');
      setToastMessage('Tags must be between 1 and 10 characters');
      setToastTrigger((prev) => prev + 1);
      setTagNameValid(false);
    }
  };

  const deleteTagCallBack = async (item: Tags) => {
    const deleteTag = await removeTagFromMap(mapId, item?.tagId);
    if (deleteTag) {
      setToastType('success');
      setToastMessage(`The tag '${item.tagName}' has been deleted.`);
      setToastTrigger((prev) => prev + 1);

      setModifiedTags((prev) =>
        prev?.filter((tagObj) => tagObj.tagId !== item.tagId),
      );
    } else {
      setToastType('error');
      setToastMessage(`There was an issue deleting the tag '${item.tagName}'.`);
      setToastTrigger((prev) => prev + 1);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent the default form submission
    newTag();
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
                  {modifiedTags?.map((item) => (
                    <Tooltip deleteItemCallBack={deleteTagCallBack} item={item}>
                      {' '}
                      <div
                        key={item.tagId}
                        className="flex cursor-pointer rounded-md bg-green-800 p-1 text-center text-sm hover:opacity-75"
                      >
                        {item.tagName}{' '}
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
              // newTagCallBack(modifiedTags);
              closelCallBack(false);
            }}
            className="flex justify-end"
          >
            <PurpleButton> Close</PurpleButton>
          </div>
        </div>
      </ZincModal>
    </>
  );
};
export default AddMapComponent;
