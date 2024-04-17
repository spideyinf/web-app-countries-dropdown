import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { DropdownOption } from "src/types/common";
import clsx from "clsx";

type Props = {
  options: DropdownOption[];
  defaultValue?: string | number;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  isLoading?: boolean;
  onChange: (value: number) => void;
};

const Dropdown = ({
  options = [],
  defaultValue,
  value,
  disabled,
  isLoading,
  placeholder = "Select an option",
  onChange,
}: Props) => {
  const [selected, setSelected] = useState<DropdownOption | null>(null);

  const handleSelect = (item: DropdownOption) => {
    if (disabled || isLoading) return;
    setSelected(item);
    onChange(item.value);
  };

  useEffect(() => {
    setSelected(
      options.find((option) => option.value === defaultValue) || null
    );
  }, [defaultValue, options]);

  useEffect(() => {
    setSelected(options.find((option) => option.value === value) || null);
  }, [value, options]);

  return (
    <div className="w-full md:w-72">
      <Listbox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button
            data-testid="dropdown"
            className={clsx(
              "relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",
              disabled && "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            <span className="block truncate">
              {selected ? selected?.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {isLoading ? (
                <ArrowPathIcon
                  className="h-5 w-5 text-gray-400 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              data-testid="dropdown-options"
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10"
            >
              {options.map((option, index) => (
                <Listbox.Option
                  data-testid="dropdown-option"
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-red-100 text-red-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Dropdown;
