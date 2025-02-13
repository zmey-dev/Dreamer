import { useState } from "react";

const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolveCallback, setResolveCallback] = useState(null);
  const [message, setMessage] = useState("");

  const confirm = (msg) => {
    setIsOpen(true);
    setMessage(msg);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolveCallback) {
      resolveCallback(true);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolveCallback) {
      resolveCallback(false);
    }
  };

  return {
    confirm,
    isOpen,
    message,
    handleConfirm,
    handleCancel,
  };
};

export default useConfirm;
