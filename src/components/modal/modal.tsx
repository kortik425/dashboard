import React from "react";

interface BaseModalProps {
  isModalOpen: boolean;
  title: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  abortLabel?: string;
  proceedLabel?: string;
}

interface ModalPropsWithFooter extends BaseModalProps {
  footer: React.ReactNode;
  abortFn?: never;
  proceedFn?: never;
}

interface ModalPropsWithoutFooter extends BaseModalProps {
  footer?: never;
  abortFn?: () => void;
  proceedFn?: () => void;
}

// Union type for ModalProps with conditional logic
type ModalProps =
  | ModalPropsWithFooter
  | (ModalPropsWithoutFooter &
      ({ abortFn: () => void } | { proceedFn: () => void }));

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  title,
  children,
  footer,
  abortFn,
  abortLabel,
  proceedFn,
  proceedLabel,
}) => {
  if (!isModalOpen) return;
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center p-9 text-center bg-black bg-opacity-20"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <dialog
        className="relative min-w-[800px] max-w-lg bg-white rounded-2xl shadow-xl"
        open
      >
        <section className="p-9 text-left">
          <h2 id="modal-title">{title}</h2>
          {children}
          <ModalFooter
            footer={footer}
            abortFn={abortFn}
            proceedFn={proceedFn}
            abortLabel={abortLabel}
            proceedLabel={proceedLabel}
          />
        </section>
      </dialog>
    </div>
  );
};

interface ModalFooterProps {
  footer?: React.ReactNode;
  abortFn?: () => void;
  proceedFn?: () => void;
  abortLabel?: string;
  proceedLabel?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  footer,
  abortFn,
  proceedFn,
  abortLabel,
  proceedLabel,
}) => {
  if (!!footer) return footer;

  return (
    <footer className="pt-8 flex flex-row-reverse">
      {proceedFn && (
        <button
          type="button"
          className="ml-3 inline-flex justify-center rounded-md bg-primaryDark px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondaryDark"
          onClick={proceedFn}
        >
          {proceedLabel || "Ok"}
        </button>
      )}
      {abortFn && (
        <button
          type="button"
          className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
          onClick={abortFn}
        >
          {abortLabel || "Cancel"}
        </button>
      )}
    </footer>
  );
};

export default Modal;
