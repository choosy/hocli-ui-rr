'use client'

import { useDisconnect, useAccount } from 'wagmi'

export function DisconnectButton({ type, ...props }) {
  const account = useAccount()
  const { disconnect } = useDisconnect()

  const buttonText = 'DISCONNECT WALLET'
  let enabled = true

  if (account.isDisconnected) {
    enabled = false
  }

  return (
    <div>
      <button
        type={type}
        disabled={!enabled}
        className="w-full bg-accent-yellow text-primary-black px-2 py-2 hover:bg-accent-yellow-hover"
        {...props}
        onClick={disconnect}
      >
        {buttonText}
      </button>
    </div>
  )
}
