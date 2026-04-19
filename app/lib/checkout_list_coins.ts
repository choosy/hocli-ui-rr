import { useQuery } from '@tanstack/react-query'
import { query } from 'app/lib/query'

export const useListCoins = (chainId) =>
  useQuery({
    queryKey: ['list_coins', chainId],
    queryFn: () => query('get', `/checkout_list_coins/${chainId}`),
    options: {
      refetchOnWindowFocus: false,
    },
  })
