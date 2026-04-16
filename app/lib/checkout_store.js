import { create } from 'zustand'
import { produce } from 'immer'

// 1. start from: () => set(  )
// 2. call set() with an arrow function that returns a partial object of the modified state
// 3. the arrow function inside state, it will return an object {} which you need to wrap in paranthesis ()
// see here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

// https://youtu.be/-Y8brhQKvtA?t=611

export const useCheckoutStore = create((set) => ({
  customer: null,
  setCustomer: (customer) =>
    set(
      produce((state) => {
        state.customer = customer
      }),
    ),
  delivery: null,
  setDelivery: (delivery) =>
    set(
      produce((state) => {
        state.delivery = delivery
      }),
    ),

  orderStatus: null,
  setOrderStatus: (status, title, message) =>
    set(() => ({
      orderStatus: { status: status, title: title, message: message },
    })), // setOrderStatus

  lastOrderId: '',
  setLastOrderId: (val) => set(() => ({ lastOrderId: val })), // setLastOrderId

  selectedCoin: null,
  setSelectedCoin: (coin) => set(() => ({ selectedCoin: coin })), // setSelectedCoin
}))
