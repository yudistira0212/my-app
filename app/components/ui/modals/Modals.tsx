import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React from "react";
import { RxCross1 } from "react-icons/rx";

interface Props {
  modalIsOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string | null;
}
const Modals: React.FC<Props> = ({ modalIsOpen, onClose, children, title }) => {
  return (
    <Transition appear show={modalIsOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between">
                  <DialogTitle as="h2" className="text-xl font-semibold mb-4">
                    {title}
                  </DialogTitle>
                  <button
                    className=" hover:border-red-700 active:bg-red-500 hover:border p-2 active:text-white   rounded-md "
                    onClick={onClose}
                  >
                    <RxCross1 size={25} />
                  </button>
                </div>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modals;
