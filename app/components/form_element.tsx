export function FormElement({ name, children, errors, ...props }) {
  return (
    <>
      <div className='flex-auto'>
        <label htmlFor='{name}' className='block'>
          {props.label}
        </label>

        {children}

        {errors[name] && (
          <p className='text-error mt-1 text-sm'>{errors[name].message}</p>
        )}
      </div>
    </>
  )
}
