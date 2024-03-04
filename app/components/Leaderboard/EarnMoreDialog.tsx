import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from "react";
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { LinkSecondary } from '../Buttons/LinkButton';
import { useAccount } from '@starknet-react/core';
import { useQuery } from '@apollo/client';
import { GET_MY_RANK } from '~/graphql/queries/leaderboard';
import { LEADERBOARD_MEDIUM, RuleType } from '~/utils/constant';

export default function EarnMoreDialog({ isOpen, setIsOpen }: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) {
    const [hasFunded, setHasFunded] = useState(false);
    const [hasFarmed, setHasFarmed] = useState(false);
    const [points, setPoints] = useState(0);
    const { address } = useAccount();
    const { error, data } = useQuery(GET_MY_RANK, {
        variables: {
            wallet_address: address
        }
    });


    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (data) {
            setPoints(data.leaderboardForWallet.total_score || 0);
            setHasFunded(data.leaderboardForWallet.points.some((point: { rule: string; value: number; }) => point.rule === RuleType.AMOUNT_FUNDED));
            setHasFarmed(data.leaderboardForWallet.points.some((point: { rule: string; value: number; }) => point.rule === RuleType.OFFSETER || point.rule === RuleType.RESALER));
        }
    }, [data]);

    if (error) {
        console.error('Error fetching my score', error);
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
                        <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg border border-neutral-500 bg-neutral-700 p-6 text-left align-middle shadow-xl transition-all">
                        <div className="p-4">
                            <div className='border border-neutral-500 bg-opacityLight-10 py-4 px-6 rounded-lg'>
                                <div className='block md:flex md:justify-between md:items-center md:gap-x-6'>
                                    <div className='text-left'>
                                        <div className="font-medium text-neutral-100">Earn Points, Get Perks</div>
                                        <div className="text-neutral-200 mt-2 text-sm">
                                            Earn points in every action you do in Carbonable. <br/>Get perks by ranking up in the leaderboard.
                                        </div>
                                        <div className='mt-6'>
                                            <LinkSecondary href={LEADERBOARD_MEDIUM}>Learn more</LinkSecondary>
                                        </div>
                                     </div>
                                    <div className='mt-8 md:mt-0 md:text-right'>
                                        <div className='flex items-center'>
                                            <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-6 w-6 mr-3" />
                                            <div className='text-3xl'>{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                                            <span className='block md:hidden ml-2'>Points</span>
                                        </div>
                                        <span className='hidden md:block'>Points</span>
                                    </div>
                                </div>
                            </div>
                            <div className='border border-neutral-500 rounded-lg mt-8 text-sm'>
                                <div className='bg-opacityLight-5 uppercase font-light py-2 px-4 rounded-tl-lg rounded-tr-lg border-b border-neutral-500'>
                                    Main missions
                                </div>
                                <div className='p-4 border-b border-neutral-500 flex items-center justify-between flex-wrap'>
                                    <div className='text-left flex items-center'>
                                        {hasFunded ? <CheckCircleIcon className='h-6 w-6 text-green-500 mr-4' /> : <div className='h-5 w-5 border border-neutral-100 mr-4 rounded-full'></div>}
                                        <div className='flex items-center'>
                                            Fund projects 
                                            <span className='text-2xl mx-2 text-neutral-300'>&#x2022;</span>
                                            <span className='text-neutral-300'>1$ = 1 Point</span>
                                        </div>
                                    </div>
                                    <div className='text-left mt-4 md:text-right md:mt-0 w-full md:w-fit'>
                                        <LinkSecondary href='/launchpad'>Go funding</LinkSecondary>
                                    </div>
                                </div>
                                <div className='p-4 flex items-center justify-between flex-wrap'>
                                    <div className='text-left flex items-center'>
                                        {hasFarmed ? <CheckCircleIcon className='h-6 w-6 fill-greenish-500 mr-4' /> : <div className='h-5 w-5 border border-neutral-100 mr-4 rounded-full'></div>}
                                        <div className='flex items-center'>
                                            Farm projects 
                                            <span className='text-2xl mx-2 text-neutral-300'>&#x2022;</span>
                                            <span className='text-neutral-300'>1CC = 100 Points</span>
                                        </div>
                                    </div>
                                    <div className='text-left mt-4 md:text-right md:mt-0 w-full md:w-fit'>
                                        <LinkSecondary href='/farming'>Go farming</LinkSecondary>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full text-center mt-12'>
                                More missions coming soon...
                            </div>
                         </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
      </Transition>
    )
}
