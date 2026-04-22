'use client'

import { useFormContext } from 'react-hook-form'

import { FormElement } from './form_element'
import { FormInput } from './form_input'
import { FormCountrySelect } from './form_country_select'

export function CheckoutFormDelivery() {
  const { register, control, formState } = useFormContext()
  console.log('formState is below')
  console.log(formState)
  let { errors } = formState

  return (
    <div>
      <FormElement name='email' label='Email' errors={errors}>
        <FormInput
          id='email'
          type='email'
          placeholder='jdoe@example.com'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
      </FormElement>

      <FormElement name='delivery_name' label='Name' errors={errors}>
        <FormInput
          id='delivery_name'
          type='text'
          placeholder='Name'
          {...register('delivery_name')}
        />
      </FormElement>

      <FormElement name='address_line1' label='Address line 1' errors={errors}>
        <FormInput
          id='address_line1'
          type='text'
          placeholder='Address line 1'
          {...register('address_line1', {
            required: 'Address line 1 is required',
          })}
        />
      </FormElement>

      <FormElement name='address_line2' label='Address line 2' errors={errors}>
        <FormInput
          id='address_line2'
          type='text'
          placeholder='Address line 2'
          {...register('address_line2', {
            required: 'Address line 2 is required',
          })}
        />
      </FormElement>

      <div className='flex gap-4'>
        <FormElement name='city' label='Town / City' errors={errors}>
          <FormInput
            id='city'
            type='text'
            placeholder='Town / City'
            {...register('city', {
              required: 'Town / City is required',
            })}
          />
        </FormElement>
        <FormElement name='state' label='State' errors={errors}>
          <FormInput
            id='state'
            type='text'
            placeholder='State'
            {...register('state', {
              required: 'State  is required',
            })}
          />
        </FormElement>
      </div>

      <div className='flex gap-4'>
        <FormElement name='zip_code' label='Zip code' errors={errors}>
          <FormInput
            id='zip_code'
            type='text'
            placeholder='Zip code'
            {...register('zip_code', {
              required: 'Zip code  is required',
            })}
          />
        </FormElement>

        {/* --- Country Select Field --- */}
        <FormElement name='country' label='Country' errors={errors}>
          <FormCountrySelect
            id='country'
            name='country' // Name must match schema and Controller
            control={control} // Pass control object
            placeholder='Select Country...'
            error={errors.country} // Pass the specific error for styling
            // No need for {...register("country")} as Controller handles it
          />
        </FormElement>
        {/* --- End Country Select Field --- */}
      </div>
    </div>
  )
}
