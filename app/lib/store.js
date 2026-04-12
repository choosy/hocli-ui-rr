import { create } from 'zustand'
import { produce } from 'immer'

// 1. start from: () => set(  )
// 2. call set() with an arrow function that returns a partial object of the modified state
// 3. the arrow function inside state, it will return an object {} which you need to wrap in paranthesis ()
// see here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

export const useStore = create((set) => ({
  isLargeScreen: false,
  setLargeScreenTrue: () =>
    set(() => {
      return { isLargeScreen: true }
    }),
  setLargeScreenFalse: () =>
    set(() => {
      return { isLargeScreen: false }
    }),

  cartVisible: false,
  showCart: () =>
    set(() => {
      return { cartVisible: true }
    }),
  hideCart: () =>
    set(() => {
      return { cartVisible: false }
    }),
  showSizesMenu: {},
  toggleShowSizesMenu: (productId) =>
    set(
      produce((state) => {
        const currentValue = state.showSizesMenu[productId] || false
        state.showSizesMenu[productId] = !currentValue
      }),
    ),

  productImages: {},
  setProductImages: (productId, images) =>
    set(
      produce((state) => {
        state.productImages[productId] = images
      }),
    ),
  focusedProductImage: {},
  setFocusedProductImage: (productId, image) =>
    set(
      produce((state) => {
        state.focusedProductImage[productId] = image
      }),
    ),
}))
