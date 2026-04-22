import { UserRound, MapPin, ShoppingBag, Coins } from 'lucide-react'

export function CheckoutPaneTitle({ text }) {
  let Icon

  if (/about/i.test(text)) {
    Icon = UserRound
  } else if (/delivery/i.test(text)) {
    Icon = MapPin
  } else if (/order/i.test(text)) {
    Icon = ShoppingBag
  } else if (/payment/i.test(text)) {
    Icon = Coins
  }

  return (
    <div className='flex items-center gap-2 border border-sky-500 text-xl font-semibold text-white'>
      <Icon />
      {text}
    </div>
  )
}
