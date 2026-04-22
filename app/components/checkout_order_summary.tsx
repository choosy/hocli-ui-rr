'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { useSession } from 'app/lib/query_hooks'

import { getImageURLCommon } from 'app/lib/images'
import { useCart } from 'app/lib/cart'

export function CheckoutOrderSummary() {
  // web session
  const sessionQuery = useSession()

  // cart and checkout functions
  const { handleUpdateQty } = useCart()

  return (
    <div>
      {sessionQuery?.data?.cart &&
        sessionQuery?.data?.cart.map((cartItem) => (
          <div key={cartItem.variant_id}>
            <div className='flex flex-row text-white' key={cartItem.variant_id}>
              <div className='flex-none' key={cartItem.variant_id}>
                <img
                  key={cartItem.variantId}
                  alt={cartItem.name}
                  src={getImageURLCommon(cartItem.image, 165, 165, 'contain')}
                />
              </div>
              {/* begin box BIG on the right */}
              <div
                className='my-6 flex w-full flex-row'
                key={cartItem.variantId}
              >
                {/* begin box-on-left */}
                <div className='flex grow flex-col justify-between'>
                  <div>{cartItem.name}</div>
                  <div>
                    <span className='text-gray'>SIZE</span>
                    <span className='ml-2 text-white'>{cartItem.size}</span>
                  </div>
                  <div className='flex'>
                    <Link href='#' onClick={() => {}}>
                      <div className='text-primary-black bg-accent-yellow text-primary-black mr-3 flex h-6 w-6 items-center justify-center rounded-full font-bold'>
                        <Minus
                          size={18}
                          onClick={async (e) =>
                            handleUpdateQty(e, cartItem.variant_id, -1)
                          }
                        />
                      </div>
                    </Link>
                    <div>{cartItem.qty}</div>
                    <Link href='#' onClick={() => {}}>
                      <div className='text-primary-black bg-accent-yellow text-primary-black ml-3 flex h-6 w-6 items-center justify-center rounded-full font-bold'>
                        <Plus
                          onClick={async (e) =>
                            handleUpdateQty(e, cartItem.variant_id, 1)
                          }
                          size={18}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                {/* end box-on-left */}

                {/* begin box-on-right */}
                <div className='flex flex-none flex-col justify-between'>
                  <div>${cartItem.usd_price}</div>
                  <div>
                    <Trash2 />
                  </div>
                </div>
                {/* end box BIG on-right */}
              </div>
              {/* end box on the right */}
            </div>
            {/* really item ends here. below is separator */}
            <div className='bg bg-primary-black my-[20px] h-[2px] w-full'></div>
          </div>
        ))}
    </div>
  )
}
