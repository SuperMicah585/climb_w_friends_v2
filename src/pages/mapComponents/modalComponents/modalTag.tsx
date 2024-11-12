import ZincModal from '../../../reusableComponents/zincModal';
import { useEffect, useState } from 'react';
import { Tags } from '../../../types/interfaces';
import Tooltip from '../../../reusableComponents/toolTip';

interface AddMapComponentInterface {
  closeTagModalCallBack: (value: boolean) => void;
  newTagCallBack: (mapData: Tags) => void;
  deleteTagCallBack: (tag: Tags) => void;
  tags: Tags[];
}

const AddMapComponent: React.FC<AddMapComponentInterface> = ({
  closeTagModalCallBack,
  newTagCallBack,
  tags,
  deleteTagCallBack,
}) => {
  const [tagName, setTagName] = useState<string>('');

  //generating random number to test id

  const buttonClickCallBack = () => {
    let min = 100;
    let max = 1000;
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    newTagCallBack({
      id: randomInt,
      tag: tagName,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent the default form submission
    buttonClickCallBack();
    // Add any additional actions here, like sending data to an API
  };

  return (
    <ZincModal
      maxHeight={'max-h-[500px]'}
      maxWidth={'max-w-[500px]'}
      closeModalCallBack={closeTagModalCallBack}
    >
      <div className="flex h-full w-full flex-col">
        <div className="mt-8 flex flex-col gap-10 overflow-y-scroll p-1">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="font-semibold"> Add Tag</div>

              <div className="flex items-center gap-5">
                <form onSubmit={handleSubmit}>
                  <input
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="Type to Add Tag"
                    value={tagName}
                    className="text-thin w-48 rounded-lg bg-zinc-950 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </form>

                <div
                  onClick={() => buttonClickCallBack()}
                  className="flex cursor-pointer rounded-lg bg-violet-500 p-2 text-sm font-semibold text-zinc-900 hover:opacity-75"
                >
                  Add Tag
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="font-semibold"> Tags</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((item) => (
                  <Tooltip deleteItemCallBack={deleteTagCallBack} tag={item}>
                    {' '}
                    <div className="flex cursor-pointer rounded-md border-2 border-neutral-600 bg-neutral-500 p-1 text-center text-sm hover:opacity-75">
                      {item.tag}{' '}
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
  );
};
export default AddMapComponent;
