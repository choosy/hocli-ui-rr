import { Button } from './button'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export const ConnectedAccount = ({ extraClass }) => {
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
                    type="button"
                    className="hidden lg:block lg:px-8 lg:py-1.5"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                )
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                )
              }
              return (
                <div
                  className={`flex text-light-gray  items-center py-4 ${extraClass}`}
                >
                  <button
                    className="flex px-2 lg:px-4 items-center cursor-pointer"
                    onClick={openChainModal}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div className="w-6 h-6">
                        {chain.iconUrl && (
                          <img
                            className="w-6 h-6"
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                          />
                        )}
                      </div>
                    )}
                  </button>

                  <button
                    className="cursor-pointer"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
