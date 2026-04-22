'use client'

import Link from 'next/link'
import { useOptionsStore } from 'app/lib/optionsStore'

export function Colors({ colors, productId, ...props }) {
  const { options, setColor } = useOptionsStore()

  function handleChooseColor(e, productId, color) {
    console.log('handleChooseColor() called')

    console.log(`productId is ${productId}`)
    console.log(`color is`)
    console.log(color)

    setColor(productId, color)
  }

  // The inner color div with consistent styling
  const colorDiv = function (key, color) {
    return (
      <div
        key={key}
        className="size-8 border border-[#847E60]"
        style={{ backgroundColor: `${color.hex_code}` }}
      ></div>
    )
  }

  return (
    <div className="border border-red-500">
      <div className="pb-2">Color</div>
      <div className="flex">
        {colors &&
          colors.map((color, index) => {
            const chosen = Boolean(
              productId in options && color.color === options[productId].color,
            )

            if (chosen) {
              return (
                <div key={index} className="border-2 border-accent-yellow p-1">
                  {colorDiv(index, color)}
                </div>
              )
            } else {
              return (
                <Link
                  key={index}
                  href="#"
                  onClick={async (e) =>
                    handleChooseColor(e, productId, color.color)
                  }
                >
                  <div key={index} className="border-2 border-transparent p-1">
                    {colorDiv(index, color)}
                  </div>
                </Link>
              )
            }
          })}
      </div>
    </div>
  )
}
