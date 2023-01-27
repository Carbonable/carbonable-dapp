import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFetcher } from "@remix-run/react";
import { GreenButton } from '../Buttons/ActionButton';

export default function NewsletterDialog({ isOpen, setIsOpen }: {isOpen: boolean, setIsOpen: any}) {
    const newsletter = useFetcher();
    const ref = useRef<HTMLFormElement>(null);


    useEffect(() => {
        if (newsletter.type === "done" && newsletter.data.message) {
          setTimeout(() => {
            ref.current?.reset();
            newsletter.data.message = undefined;
            setIsOpen(false);
        }, 2000);
        }
      }, [newsletter, setIsOpen]);

    const handleClose = () => {
        ref.current?.reset();
        if (newsletter.data) {
            newsletter.data.error = undefined;
        }
        setIsOpen(false);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-light-80" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl border border-neutral-500 bg-neutral-700 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title className="uppercase font-bold text-neutral-400 flex flex-row justify-between border-b border-neutral-500 py-3 px-4">
                                Newsletter
                                <XMarkIcon className="w-5 cursor-pointer hover:text-neutral-200" onClick={handleClose} />
                            </Dialog.Title>
                            <div className="mt-8 w-full px-5 text-neutral-100 pb-8">
                                <div className="font-trash text-xl text-center uppercase">Never miss a drop again</div>
                                <div className="font-inter text-sm text-center mt-2">Signup to get an alert as soon as a new Carbonable sale is on.</div>
                                <newsletter.Form
                                    method="post"
                                    action="/newsletter/subscribe"
                                    ref={ref}
                                >
                                    <div className="mt-4">
                                        <input type="email" className="text-neutral-200 outline-0 w-full bg-neutral-800 border border-neutral-500 rounded-xl px-4 py-2" name="email" placeholder="Enter your email" aria-label="Email address" aria-describedby="error-message" />
                                    </div>
                                    <div id="error-message" className={`text-sm mt-1 mx-auto w-full text-left ml-2 min-h-[20px] ${newsletter?.data?.message ? 'text-greenish-500' : 'text-red-600'}`}>{newsletter?.data?.error ? newsletter?.data?.error : newsletter?.data?.message}</div>
                                    <div className="w-full text-right mt-6">
                                        {newsletter.state !== 'submitting' && <GreenButton className="w-fit px-5 py-3">Signup</GreenButton>}
                                        {newsletter.state === 'submitting' && <GreenButton className="w-fit px-5 py-3 bg-greenish-800 text-neutral-400">Signup</GreenButton>}
                                    </div>
                                </newsletter.Form>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
      </Transition>
    )
}