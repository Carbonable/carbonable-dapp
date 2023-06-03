import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ValueProps } from '~/types/select';

export default function MapSelect({values, selectedValue, setSelectedValue}: {values: ValueProps[], selectedValue: ValueProps | undefined, setSelectedValue: (v: ValueProps) => void}) {

    function handleSelect(event: any) {
        setSelectedValue(event);
    }

    return (
        <Listbox value={selectedValue} onChange={handleSelect}>
            <div className="relative mt-1 font-inter">
            <Listbox.Button className={({open}) => `min-w-max flex items-center justify-start w-full cursor-pointer rounded-lg text-neutral-50 py-2 pl-4 pr-10 text-left focus:outline-none border border-neutral-500 bg-opacityDark-70 hover:bg-opacityDark-60`}>
                <span className="block truncate">{selectedValue?.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
                </span>
            </Listbox.Button>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Listbox.Options className="absolute mt-1 max-h-60 w-[120px] overflow-auto font-inter rounded-md bg-opacityDark-70 py-0 text-sm shadow-lg focus:outline-none px-0 border border-neutral-500 top-100 p-6">
                {values.map((value: ValueProps) => (
                    <Listbox.Option
                    key={value.id}
                    value={value}
                    className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-4 list-none ml-0 ${
                        active ? 'bg-opacityLight-5 text-neutral-50' : 'text-neutral-50'
                        }`
                    }
                    >
                    {({ selected }) => (
                        <>
                        <span className={selected ? "block truncate font-bold" : "block truncate"}>
                            {value.name}
                        </span>
                        
                        </>
                    )}
                    </Listbox.Option>
                ))}
                </Listbox.Options>
            </Transition>
            </div>
        </Listbox>
    )
}
