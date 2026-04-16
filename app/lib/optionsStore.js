import { create } from 'zustand'
import { produce } from 'immer'

// 1. start from: () => set(  )
// 2. call set() with an arrow function that returns a partial object of the modified state
// 3. the arrow function inside state, it will return an object {} which you need to wrap in paranthesis ()
// see here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

export const useOptionsStore = create((set) => ({
  options: {},
  setSize: (productId, size) =>
    set(
      produce((state) => {
        if (!(productId in state.options)) {
          state.options[productId] = {}
        }
        state.options[productId].size = size
      }),
    ),

  setColor: (productId, color) =>
    set(
      produce((state) => {
        if (!(productId in state.options)) {
          state.options[productId] = {}
        }
        state.options[productId].color = color
      }),
    ),
}))
