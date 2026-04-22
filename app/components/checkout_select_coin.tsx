'use client'

import { useCheckout } from 'app/lib/checkout_queries'
import { useCheckoutStore } from 'app/lib/checkout_store'
import { useAccount } from 'wagmi'
import { useListCoins } from 'app/lib/checkout_list_coins'
import { useState, useEffect } from 'react'

export function CheckoutSelectCoin() {
  const { chainId } = useAccount()

  const coins = useListCoins(chainId)

  const { selectedCoin, setSelectedCoin } = useCheckoutStore()

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin)
    console.log('Selected coin:', coin)
  }

  console.log('coins are')

  console.log(coins.data)

  if (coins.isLoading) return <div>Loading coins...</div>
  if (coins.error) return <div>Error loading coins</div>

  return (
    <div className='flex flex-wrap gap-4 p-4'>
      {coins.data?.map((coin) => (
        <div
          key={coin.symbol || coin.address}
          onClick={() => handleCoinSelect(coin)}
          className={`cursor-pointer rounded-lg border-1 p-2 ${
            selectedCoin?.symbol === coin.symbol
              ? 'bg-accent-yellow border-1 border-white'
              : 'hover:bg-accent-yellow bg-olive-strong border-olive-strong'
          }`}
        >
          {coin.icon_url && (
            <img
              src={coin.icon_url}
              alt={coin.symbol}
              className='mx-auto h-12 w-12'
            />
          )}

          {/* <div className='text-center text-sm font-medium'>{coin.symbol}</div> */}
        </div>
      ))}
    </div>
  )
}
