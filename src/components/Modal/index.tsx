import { ReactNode, useState } from "react";
import { Button } from "../Button";

interface ModalProps {
  visible: boolean;
  title: string;
  ok?: {
    text: string;
    type?: "button" | "submit" | "reset";
  };
  onConfirm?: () => void;
  onRequestClose?: () => void;
  children?: ReactNode;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onRequestClose,
  onConfirm,
  title,
  ok,
  children,
  description,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onRequestClose?.();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-[#111928] bg-opacity-70 transition-opacity ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      ></div>
      <div
        className={`relative z-10 w-full max-w-md transform rounded-lg bg-white p-4 shadow-lg transition-all dark:bg-gray-800 dark:text-white ${
          isClosing ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {title && (
          <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
        )}
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <Button
            label={ok?.text || "OK"}
            type={ok?.type || "button"}
            onClick={onConfirm}
            customClasses="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
