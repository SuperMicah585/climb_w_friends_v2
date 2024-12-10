import React, { useState, useEffect } from 'react';
import GenericToast from './toastNotification';

interface GenericToastProps {
  message: string;
  type: string;
  trigger: number;
  mode: string;
}

interface ToastObject {
  id: number;
  message: string;
  type: string;
  mode: string;
}

const ToastContainer: React.FC<GenericToastProps> = ({
  trigger,
  type,
  message,
  mode,
}) => {
  const [toasts, setToasts] = useState<ToastObject[]>([]);
  const seenToastIds = new Set<number>(); // Track IDs of already seen toasts

  useEffect(() => {
    if (trigger > 0 && !seenToastIds.has(trigger)) {
      const newToast: ToastObject = {
        id: Date.now(), // Use a unique identifier for each toast
        type,
        message,
        mode,
      };
      setToasts((prevToasts) => [...prevToasts, newToast]);
      seenToastIds.add(newToast.id); // Mark this toast ID as seen
    }
  }, [trigger, type, message, mode]);

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed right-10 top-20 z-20 flex max-h-min flex-col gap-5">
      {toasts.map((toast) => (
        <GenericToast
          key={toast.id}
          id={toast.id}
          mode={toast.mode}
          type={toast.type}
          message={toast.message}
          removeToast={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
