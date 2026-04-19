export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export const isLargeScreen = () => window.innerWidth >= 768
