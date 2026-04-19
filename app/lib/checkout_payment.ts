// https://developers.circle.com/stablecoins/quickstart-transfer-10-usdc-on-chain

import { useEffect } from 'react'

import { useCheckout } from 'app/lib/checkout_queries'
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { parseEther } from 'viem'
import { mainnet } from 'viem/chains'

import { base } from '@wagmi/core/chains'

let fileName = 'checkout_payment.js'

export function handlePlaceOrder(sendTransaction, toAddress, amount) {
  console.log(`${fileName} -> handlePlaceOrder() called`)

  // sendTransaction({
  //   to: toAddress,
  //   chainId: base.id,
  //   value: parseEther(String(amount)),
  // })
} /// handlePlaceOrder

export async function payWithToken(writeContractAsync) {
  console.log(`lib/checkout_payment.js usePaymentToken() called`)
  const contractAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

  const usdc_abi = [
    {
      constant: false,
      inputs: [
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      type: 'function',
    },
  ]

  await writeContractAsync({
    chainId: mainnet.id,
    address: contractAddress,
    functionName: 'transfer',
    abi: usdc_abi,
    args: ['0x075fE43C61c680b19E68621511375474B9509093', 21 * 1000000],
  })
} /// payWithToken

export function useCheckoutPayment() {
  console.log(`lib/checkout_payment.js useCheckoutPayment() called`)

  // obtain the sendTransaction mutation/function and place the order on success
  // that means if the user clicks on send transaction, we want to place the order
  const { placeOrder } = useCheckout()
  const account = useAccount()

  //  console.log(`${fileName} useCheckoutPayment account is`, account)

  // ################ send the transaction ##################
  const {
    data: txHash,
    error: txError,
    status: txStatus,
    sendTransaction,
  } = useSendTransaction({
    mutation: {
      onSuccess: async (hash) => {
        console.log(
          `${fileName} useCheckoutPayment -> useSendTransaction mutation -> onSuccess hash`,
          hash,
        )

        console.log(
          `${fileName} checkout_order_summary.js -> useSendTransaction mutation -> onSuccess account.address is:`,
          account.address,
        )

        let order = await placeOrder({
          txn_hash: hash,
        })

        console.log('here means order placed')

        //console.log(`got last order id: ${order.order_id}`)

        // setLastOrderId(order.order_id)

        //router.push('/')
      }, /// onSuccess
    },
  }) /// end useSendTransaction
  //
  console.log('file lib/checkout_payment. txStatus is', txStatus)
  console.log('file lib/checkout_payment. txHash is', txHash)

  const txReceipt = useWaitForTransactionReceipt({
    hash: txHash,
  })

  return { txHash, txError, txStatus, sendTransaction, txReceipt }
}
