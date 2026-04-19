import { useStore } from 'app/lib/store'
import { useMutation, useQuery } from '@tanstack/react-query'

import { query } from 'app/lib/query'
import { delay } from 'app/lib/util'
import { useSession } from 'app/lib/query_hooks'
import { useCheckoutStore } from 'app/lib/checkout_store'

export const useGetOrderTotals = () =>
  useQuery({
    queryKey: ['get_order_totals'],
    queryFn: () => query('get', '/get_order_totals'),
    options: {
      refetchOnWindowFocus: false,
    },
  })

export const useCheckout = () => {
  //const { showCart, hideCart, cartVisible } = useStore()

  /// ******************* begin placeOrder mutation *******************
  const placeOrderMutation = useMutation({
    mutationFn: (data) => query('post', '/place_order', data),
    options: {
      onSuccess: (data, variables, context) => {
        console.log('OK')
      },
      onError: (data, variables, context) => {
        console.log('ERROR')
      },
    },
  })

  const placeOrder = async (data) => {
    try {
      console.log('will await call placeOrderMutation() with data below:')
      console.log(data)

      let result = await placeOrderMutation.mutateAsync(data)
      console.log('mutation result is', result)

      if (result) {
        console.log('HOORAY! Mutation successful!')

        return result
      } else {
        console.log('Mutation not successful')
      }
    } catch (error) {
      console.log('Mutation error:', error)
    } finally {
      console.log('Mutation completed')
    }
  }

  return {
    placeOrder,
  }
}
