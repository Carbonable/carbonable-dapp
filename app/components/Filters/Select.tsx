import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useFetcher } from '@remix-run/react';

interface ValueProps {
    id: string;
    name: string;
    isDefault?: boolean
}

export default function Select({values, selectedValue, action}: any) {
    const select = useFetcher();
    const [selected, setSelected] = useState(values.filter((value: any) => value.id === selectedValue.id)[0]);

    function handleSelect(event: any) {
      setSelected(event);
      const data = new FormData();
      data.append("selectedValue", event.id);

      select.submit(data, { method: "post", action: action});
    }

    return (
      <select.Form method="post" action={action} >
        <Listbox value={selected} onChange={handleSelect}>
          <div className="relative mt-1 font-inter">
            <Listbox.Button className={({open}) => `min-w-max flex items-center justify-start w-full cursor-pointer rounded-lg text-neutral-300 py-2 pl-4 pr-10 text-left focus:outline-none hover:text-neutral-100 hover:bg-opacityLight-5 ${open ? 'text-neutral-100 bg-opacityLight-5' : ''}`}>
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-[120px] overflow-auto rounded-md bg-neutral-800 py-0 text-base shadow-lg focus:outline-none px-0 border border-neutral-400 top-100 p-6">
                {values.map((value: ValueProps) => (
                  <Listbox.Option
                    key={value.id}
                    value={value}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-4 list-none ml-0 ${
                        active ? 'bg-opacityLight-5 text-neutral-200' : 'text-neutral-200'
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
      </select.Form>
    )
}
