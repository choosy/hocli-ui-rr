export function getColorsFromVariants(variants) {
  const colors = []
  const variantColors = variants.map((item) => {
    if (!colors.includes(item.color.name)) {
      colors.push(item.color.name)

      return { color: item.color.name, hex_code: item.color.hex_code }
    }
  })

  return variantColors.filter((item) => item && 'color' in item)
}

export function getSizesFromVariants(variants) {
  const sizes = [...new Set(variants.map((variant) => variant.size))]

  return sizes
}
