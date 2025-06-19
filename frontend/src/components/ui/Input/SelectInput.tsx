import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  state?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const SelectInput = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  state = 'default',
  size = 'md',
  loading = false,
}: SelectInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const selectedOption = options.find(opt => opt.value === value) || options[0];

  const baseClass = clsx(
    'relative w-full rounded-md border bg-white px-3 py-2 text-left cursor-pointer transition',
    {
      'h-8 text-sm': size === 'sm',
      'h-10 text-base': size === 'md',
      'h-12 text-lg': size === 'lg',
      'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500':
        state === 'default',
      'border-red-500 focus:ring-1 focus:ring-red-500': state === 'error',
      'border-green-500 focus:ring-1 focus:ring-green-500': state === 'success',
      'opacity-50 cursor-not-allowed': disabled || loading,
    }
  );

  return (
    <div className="relative w-full">
      <Listbox value={value} onChange={onChange} disabled={disabled || loading}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={baseClass}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              {selectedOption.label}
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              {label && (
                <motion.label
                  className="absolute left-3 top-1 text-sm px-1 pointer-events-none text-gray-400 bg-transparent"
                  animate={{
                    y: value || isFocused ? -20 : 0,
                    scale: value || isFocused ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.label>
              )}
            </Listbox.Button>

            {open && (
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                {options.map(option => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active }) =>
                      clsx(
                        'relative cursor-pointer select-none py-2 pl-10 pr-4',
                        active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={clsx(
                            'block truncate',
                            selected ? 'font-medium' : 'font-normal'
                          )}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Check className="h-4 w-4 text-blue-600" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </>
        )}
      </Listbox>
    </div>
  );
};
