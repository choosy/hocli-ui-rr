'use client'

import React from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import { getData } from 'country-list'
import clsx from 'clsx' // Import clsx

import { matchSorter } from 'match-sorter'

// Generate country options once using ISO 3166-1 alpha-2 codes
const countryOptions = getData().map((country) => ({
  value: country.code, // e.g., "US"
  label: country.name, // e.g., "United States",
}))

console.log(countryOptions)

const customFilter = (option, inputValue) => {
  console.log('inputValue is ' + inputValue)

  console.log('option')
  console.log(option)
}

export function FormCountrySelect({ control, name, id, placeholder, error }) {
  const [options, setOptions] = React.useState(countryOptions)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Select
          inputId={id}
          options={options}
          placeholder={placeholder}
          ref={ref}
          instanceId={id} // Helps with SSR and multiple instances
          value={options.find((option) => option.value === value) || null}
          onChange={(selectedOption) =>
            onChange(selectedOption ? selectedOption.value : '')
          }
          onInputChange={(inputValue) => {
            setOptions(
              matchSorter(countryOptions, inputValue, {
                keys: ['value', 'label'],
              }),
            )
          }}
          onBlur={onBlur}
          isClearable
          unstyled // Add unstyled prop to remove default styles
          //filterOption={customFilter}
          classNames={{
            // Control is the main container
            control: ({ isFocused }) =>
              clsx(
                'w-full px-3 py-2 border border-stroke rounded focus:outline-none focus:ring-1 focus:ring-accent-yellow',

                {
                  'border-accent-yellow ring-1 ring-accent-yellow':
                    isFocused && !error, // Focus style (using accent-yellow)
                  'border-destructive': error, // Error style (using destructive color from theme)
                  'border-stroke': !isFocused && !error, // Default border (using border-stroke)
                },
              ),
            // ValueContainer holds the selected value/placeholder
            valueContainer: () => 'p-0', // Remove default padding, control handles it
            // Placeholder text
            placeholder: () => 'text-muted-foreground text-sm', // Match placeholder style
            // Input field within the select
            input: () => 'text-sm m-0 p-0',
            // Dropdown indicator (arrow)
            indicatorSeparator: () => 'hidden', // Hide the default separator
            dropdownIndicator: () => 'text-gray-500 px-2 hover:text-gray-700',
            clearIndicator: () => 'text-gray-500 px-1 hover:text-red-500',
            // Menu list container
            menu: () => 'mt-1 border border-stroke rounded shadow-lg z-100',
            // List of options within the menu
            menuList: () => 'py-1', // Add some vertical padding to the list
            // Individual option item
            option: ({ isFocused, isSelected }) =>
              clsx('px-3 py-2 text-sm cursor-pointer ', {
                'bg-accent-yellow text-primary-black': isSelected, // Selected style
                'bg-accent-yellow-hover text-primary-black':
                  isFocused && !isSelected, // Hover/focus style
                'bg-primary-black': !isFocused && !isSelected,
              }),
            // Message shown when no options match search
            noOptionsMessage: () => 'text-sm text-muted-foreground p-2',
          }}
          // Optional: Override specific input focus style if Tailwind forms plugin interferes
          // styles={{
          //   input: (base) => ({
          //     ...base,
          //     "input:focus": {
          //       boxShadow: "none",
          //     },
          //   }),
          // }}
        />
      )}
    />
  )
}
