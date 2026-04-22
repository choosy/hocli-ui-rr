'use client'

import { useCart } from 'app/lib/cart'

export function Modal({ children }) {
  const { closeCart, cartVisible } = useCart()

  const hiddenStr = cartVisible ? '' : 'hidden'

  return (
    <>
      <div
        className={`fixed w-full h-full z-10 border border-red-500 bg-primary-black opacity-40 ${hiddenStr}`}
        onClick={(e) => closeCart(e)}
      ></div>
      {children}
    </>
  )
}
