import { useSession } from 'app/lib/query_hooks'
import { useCheckoutStore } from 'app/lib/checkout_store'
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi'

export function CheckoutOrderStatus() {
  // WAGMI. current crypto account
  const account = useAccount()

  // web session
  const sessionQuery = useSession()

  // cart and checkout functions
  const { orderStatus, setOrderStatus } = useCheckoutStore()

  if (!orderStatus) return null

  let extraStyles

  if (orderStatus.status == 'error') {
    extraStyles = 'border border-error'
  }

  return (
    <>
      <div className={`bg-secondary-black ${extraStyles} my-8 px-4 py-8`}>
        <h2 className='mb-8 text-xl font-semibold text-white lg:text-xl'>
          {orderStatus.title}
        </h2>
        <div>{orderStatus.message}</div>
      </div>
    </>
  )
}
