'use client'

import { useOptionsStore } from 'app/lib/optionsStore'
import { Button } from 'app/components/button'

export function Sizes({ productId, sizes, ...props }) {
  const { options, setSize } = useOptionsStore()

  function handleChooseSize(e, productId, size) {
    console.log('handleChooseSize() called')

    console.log(`productId is ${productId}`)
    console.log(`size is`)
    console.log(size)

    setSize(productId, size)
  }

  return (
    <div className="border border-red-500">
      <div className="pb-2">Size</div>
      <div className="flex gap-x-2">
        {sizes.map((size, index) => {
          const chosen = Boolean(
            productId in options && size === options[productId].size,
          )

          if (chosen) {
            return (
              <div
                key={index}
                className="bg-accent-yellow text-center text-primary-black p-2 w-16"
              >
                {size}
              </div>
            )
          } else {
            return (
              <Button
                key={index}
                className="bg-olive-strong w-16"
                onClick={async (e) => handleChooseSize(e, productId, size)}
              >
                {size}
              </Button>
            )
          }
        })}
      </div>
    </div>
  )
}
