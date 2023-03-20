import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

/**
 * 
 * @param inputList an object with at list an id and a searchField property
 * @returns 
 */
export default function ComboBox({inputList, selectedValue, setSelectedValue}: {inputList: any[], selectedValue: any, setSelectedValue: any}) {
    const [query, setQuery] = useState('');
    const filteredInput =
      query === ''
        ? inputList
        : inputList.filter((input) => {
            return input.value.toLowerCase().includes(query.toLowerCase())
          })
  
    return (
      <Combobox value={selectedValue} onChange={setSelectedValue}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden text-left shadow-md focus:outline-none sm:text-sm">
            <Combobox.Input
              className="w-full py-3 pl-3 pr-10 text-sm rounded-lg leading-5 text-neutral-100 focus:outline-none focus:ring-0 bg-neutral-700 border border-neutral-500 hover:border-neutral-400"
              displayValue={(input: any) => input.value}
              onChange={(event) => setQuery(event.target.value)}
              name="project"
              value={selectedValue}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-neutral-200"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 border border-neutral-600 text-base shadow-lg focus:outline-none sm:text-sm">
              {filteredInput.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none text-neutral-300">
                  Nothing found.
                </div>
              ) : (
                filteredInput.map((input) => (
                  <Combobox.Option
                    key={input.id}
                    className={({ active }) =>
                      `relative cursor-default select-none list-none ml-0 py-2 px-4 ${
                        active ? 'bg-opacityLight-10 text-neutral-100' : 'text-neutral-200'
                      }`
                    }
                    value={input}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {input.value}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    )
  }