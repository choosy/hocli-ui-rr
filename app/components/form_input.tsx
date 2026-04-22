import { forwardRef } from 'react'

const FormInput = forwardRef(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className='border-stroke focus:ring-accent-yellow w-full rounded border px-3 py-2 focus:ring-1 focus:outline-none'
    />
  )
})
FormInput.displayName = 'FormInput'

export { FormInput }
