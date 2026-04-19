import { useEffect } from 'react'

import { useCheckoutStore } from 'app/lib/checkout_store'

export function useOrderStatus(txStatus, txHash, txError, txReceipt) {
  const { setOrderStatus } = useCheckoutStore()

  useEffect(() => {
    let message = ''
    let status = 'neutral'

    // Determine status based on transaction states
    if (txStatus === 'error' || txReceipt.isError) {
      status = 'error'
    } else if (txReceipt.isSuccess) {
      status = 'success'
    } else {
      status = 'neutral' // covers idle, pending, and waiting states
    }

    // Transaction status
    if (txStatus === 'idle') {
      message = 'Transaction not initiated. Ready to place order'
    } else if (txStatus === 'pending') {
      message = 'User initiated transaction. Waiting for wallet confirmation.'
    } else if (txStatus === 'success') {
      message = 'User confirmed transaction'
    } else if (txStatus === 'error') {
      message = `Transaction failed: ${txError?.message || 'Unknown error'}`
    }
    // Add receipt message if we have a transaction
    if (txHash) {
      if (txReceipt.isPending) {
        message += ' - Waiting for transaction on-chain confirmation...'
      } else if (txReceipt.isSuccess) {
        message =
          'Transaction successfully confirmed on-chain. Order has been placed succesfully!'
      } else if (txReceipt.isError) {
        message += ' - On-chain confirmation error'
      }
    }

    let titlesByStatus = {
      error: 'Order status: ERROR',
      neutral: 'Order status: IN PROGRESS',
      success: 'Order status: SUCCESS',
    }
    let title = titlesByStatus[status]

    console.log('txReceipt.isPending is', txReceipt.isPending)
    console.log('txReceipt.isError is', txReceipt.isError)
    console.log('txReceipt.isSuccess is', txReceipt.isSuccess)

    setOrderStatus(status, title, message)
  }, [
    txStatus,
    txHash,
    txError,
    txReceipt.isError,
    txReceipt.isSuccess,
    txReceipt.isPending,
  ])
}
