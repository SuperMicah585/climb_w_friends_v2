import { closeIcon } from './styles';
import { useEffect } from 'react';
type ModalProps = {
  closeModalCallBack: (trigger: boolean) => void;
  children: React.ReactNode;
  maxHeight: string;
  maxWidth: string;
  bgColor?: string;
  opacityColor?: string;
  closeButtonColor?: string;
};

const ZincModal: React.FC<ModalProps> = ({
  closeModalCallBack,
  maxHeight,
  maxWidth,
  bgColor,
  opacityColor,
  closeButtonColor,
  children,
}) => {
  useEffect(() => {
    // Disable scrolling on body when the modal is open
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      onClick={() => closeModalCallBack(false)}
      className={`bg-blur-md fixed z-10 flex h-screen w-screen items-center justify-center ${opacityColor ? opacityColor : 'bg-zinc-500'} bg-opacity-75`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`shadow-opacity-50 relative flex h-1/2 min-h-96 w-1/2 min-w-96 ${maxHeight + ' ' + maxWidth} flex-col items-start gap-2 overflow-y-scroll rounded-lg ${bgColor ? bgColor : 'bg-gray-50'} pb-5 pl-5 pr-5 pt-5 shadow-sm`}
      >
        {children}

        <div
          onClick={() => closeModalCallBack(false)}
          className={`absolute right-2 top-2 cursor-pointer rounded-full p-1 ${closeButtonColor ? closeButtonColor : 'text-gray-700'}`}
        >
          {' '}
          {closeIcon}{' '}
        </div>
      </div>
    </div>
  );
};
export default ZincModal;
