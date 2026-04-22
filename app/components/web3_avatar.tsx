export function getGradientColors(address) {
  const seedArr = address.match(/.{1,7}/g)?.splice(0, 5)
  const colors = []

  seedArr?.forEach((seed) => {
    let hash = 0
    for (let i = 0; i < seed.length; i += 1) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash
    }

    const rgb = [0, 0, 0]
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 255
      rgb[i] = value
    }
    colors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
  })

  return colors
}

const Web3Avatar = ({ address, ensImage, ensName }) => {
  const colors = getGradientColors(address)
  const accent = '#f1a818'

  if (address) {
    return (
      <div
        className={`rounded-full w-8 h-8 overflow-hidden flex items-center justify-center`}
        style={{
          backgroundImage: `
          radial-gradient(at 80% 0%, var(--color1) 0px, transparent 50%),
          radial-gradient(at 29% 97%, var(--color2) 0px, transparent 50%),
          radial-gradient(at 99% 86%, var(--color3) 0px, transparent 50%),
          radial-gradient(at 29% 88%, var(--color4) 0px, transparent 50%)
        `,
          '--color1': accent,
          '--color2': colors[2],
          '--color3': colors[3],
          '--color4': colors[4],
        }}
      >
        {ensImage ? (
          <img
            src={ensImage}
            alt={ensName || address}
            className="w-full h-full"
          />
        ) : (
          <div></div>
        )}
      </div>
    )
  } else {
    return <div>no avatar cause no address</div>
  }
}

export default Web3Avatar
