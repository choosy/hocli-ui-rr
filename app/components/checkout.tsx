import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useWriteContract } from 'wagmi'
import { CheckoutPaneTitle } from 'app/components/checkout_pane_title.js'
import { CheckoutPane } from 'app/components/checkout_pane.js'
import { CheckoutPaneContents } from 'app/components/checkout_pane_contents.js'
import { CheckoutFormDelivery } from 'app/components/checkout_form_delivery.jsx'
import { CheckoutOrderSummary } from 'app/components/checkout_order_summary.jsx'
import { CheckoutSelectNetwork } from 'app/components/checkout_select_network.jsx'
import { CheckoutSelectCoin } from 'app/components/checkout_select_coin.jsx'
import { Button } from './button'

import { useCheckoutStore } from 'app/lib/checkout_store'
import { useOrderStatus } from 'app/lib/checkout_order_status.js'
import { useGetOrderTotals } from 'app/lib/checkout_queries.js'

import {
  useCheckoutPayment,
  payWithToken,
  handlePlaceOrder,
} from 'app/lib/checkout_payment.js'

const schema = z.object({
  delivery_name: z.string().min(3, { message: 'Name is required' }),
  address_line1: z.string().min(5, { message: 'Address line 1 is required' }),
  address_line2: z.string(),
  city: z.string().min(3, { message: 'City is required' }),
  zip_code: z.string().min(2, { message: 'Zip code is required' }),
  state: z.string(),
  country: z.string().nonempty('Country is required'),
})

const HOCLI_ADDRESS = '0xbcd01efD5Cd8AE3157460Ca50ACE062F98e10B60'

export function CheckoutPanes() {
  const { writeContractAsync } = useWriteContract()

  // checkout form -> get useForm results as a variable to pass it around to children components
  // fetch methods like onSubmit and so on
  const formObj = useForm({ resolver: zodResolver(schema) })

  let getOrderTotals = useGetOrderTotals()
  console.log('getOrderTotals.data is', getOrderTotals.data)

  function onSubmit() {
    let amount = getOrderTotals.data.order_total_usd

    payWithToken(writeContractAsync)
    //handlePlaceOrder(sendTransaction, toAddress, amount)
  }

  // Transaction / Place order stuffs
  //const { txHash, txError, txStatus, sendTransaction, txReceipt } = useCheckoutPayment()

  //const data = usePaymentToken()

  //const { setOrderStatus } = useCheckoutStore()
  //useOrderStatus(txStatus, txHash, txError, txReceipt)

  const toAddress = HOCLI_ADDRESS

  let payButtonValue = 'PLACE ORDER'

  return (
    <FormProvider {...formObj}>
      <form onSubmit={formObj.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='flex flex-wrap gap-x-5'>
          <CheckoutPane>
            <CheckoutPaneTitle text='Delivery Details' />
            <CheckoutPaneContents>
              <CheckoutFormDelivery />
            </CheckoutPaneContents>
          </CheckoutPane>
          <CheckoutPane>
            <CheckoutPaneTitle text='Order Summary' />
            <CheckoutPaneContents>
              <CheckoutOrderSummary />
            </CheckoutPaneContents>
          </CheckoutPane>
          <CheckoutPane extraClass='self-end-safe'>
            <CheckoutPaneTitle text='Payment settings' />
            <CheckoutPaneContents>
              <CheckoutSelectNetwork />
              <CheckoutSelectCoin />
            </CheckoutPaneContents>
          </CheckoutPane>
          <div className='w-full grow-4'>
            <Button type='submit' className='w-full'>
              {payButtonValue}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
