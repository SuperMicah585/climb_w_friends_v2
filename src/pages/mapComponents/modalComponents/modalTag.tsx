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
  const domain = import.meta.env.VITE_DOMAIN;
  //generating random number to test id

  const newTag = async () => {
    const addTag = await createTag(tagName, mapId);

    //Request to DB will be created
    setModifiedTags((prev) => {
      return [...prev, addTag];
    });
  };

  useEffect(() => {
    const retrieveTagsOnMap = async (mapId: number) => {
      const url = `${domain}api/Tags/ByMap/${mapId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
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
                <div className="text-lg font-semibold text-white"> Add Tag</div>

                <div className="flex items-center gap-5">
                  <form onSubmit={handleSubmit}>
                    <input
                      onChange={(e) => {
                        setTagNameValid(true);
                        setTagName(e.target.value);
                      }}
                      placeholder="Type to Add Tag"
                      value={tagName}
                      className={`h-12 w-48 rounded-xl ${!tagNameValid ? 'border-2 border-red-500' : 'border border-slate-400'} bg-zinc-900 p-2 text-lg focus:outline-none focus:ring-1 focus:ring-violet-500`}
                    />
                  </form>

                  <div onClick={() => checkTagInput()}>
                    <PurpleButton
                      paddingBottom="pb-3"
                      paddingTop="pt-3"
                      paddingLeft="pl-5"
                      paddingRight="pr-5"
                      roundedCorners="rounded-full"
                    >
                      {' '}
                      Add Tag{' '}
                    </PurpleButton>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="text-lg font-semibold text-white"> Tags</div>
                <div className="flex flex-wrap gap-2">
                  {modifiedTags?.map((item) => (
                    <Tooltip
                      key={item.tagId}
                      deleteItemCallBack={deleteTagCallBack}
                      item={item}
                    >
                      {' '}
                      <div className="flex cursor-pointer rounded-md border-2 border-green-900 bg-green-600 p-1 text-center text-sm hover:opacity-75">
                        {item.tagName}{' '}
                      </div>{' '}
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow"> </div>
        </div>
      </ZincModal>
    </>
  );
};
export default AddMapComponent;
