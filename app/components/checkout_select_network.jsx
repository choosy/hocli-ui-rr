'use client'

import { Button } from './button'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export const CheckoutSelectNetwork = ({ extraClass }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    type='button'
                    className='hidden lg:block lg:px-8 lg:py-1.5'
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                )
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type='button'>
                    Wrong network
                  </button>
                )
              }
              return (
                <div
                  className={`text-light-gray flex border-1 border-red-200 py-4 ${extraClass}`}
                >
                  <div
                    className='flex cursor-pointer items-center px-2 lg:px-4'
                    onClick={openChainModal}
                    type='button'
                  >
                    {' '}
                    {chain.hasIcon && (
                      <div className='h-8 w-8'>
                        {chain.iconUrl && (
                          <img
                            className='h-8 w-8'
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div
                    className='cursor-pointer'
                    onClick={openAccountModal}
                    type='button'
                  >
                    {account.displayName}
                  </div>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
