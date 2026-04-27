import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Link } from "react-router";

import { useCart } from "app/lib/cart";
import { getImageURLCommon } from "app/lib/images";
import { useSession } from "app/lib/query_hooks";
import { useStore } from "app/lib/store";
import { ConnectedAccount } from "app/components/connected_account";
import { ConnectCheckoutButton } from "app/components/connect_checkout_button";

export function Cart() {
  const sessionQuery = useSession();

  const cartVisible = useStore((state) => state.cartVisible);
  const { closeCart, handleUpdateQty } = useCart();

  // const cartVisible = true
  const spring = { type: "spring" as const, bounce: 0.2, duration: 0.9 };
  let variants;
  let isLargeScreen;

  if (typeof window !== "undefined") {
    isLargeScreen = () => window.innerWidth >= 768;
  } else {
    isLargeScreen = () => true;
  }

  if (isLargeScreen()) {
    variants = {
      hidden: {
        opacity: 0,
        transition: spring,
        x: 0,
      },

      visible: {
        opacity: 1,
        transition: spring,
        x: "-30vw",
      },

      exit: {
        opacity: 0.3,
        transition: spring,
        x: 0,
      },
    };
  } else {
    variants = {
      hidden: {
        opacity: 0,
        transition: spring,
        x: 0,
      },

      visible: {
        opacity: 0.98,
        transition: spring,
        x: "-95vw",
      },

      exit: {
        opacity: 0.3,
        transition: spring,
        x: 0,
      },
    };
  } // else  isLargeScreen

  const initialValue = 0;

  const totalQty = sessionQuery?.data?.cart
    ? sessionQuery?.data?.cart.reduce(
        (accumulator, item) => accumulator + item.qty,
        initialValue,
      )
    : 0;

  return (
    <>
      <AnimatePresence>
        {cartVisible && (
          <motion.div
            data-testid="cart"
            key="cart"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className={`bg-popup-bg fixed top-0 -right-[95vw] z-11 flex h-[99vh] w-[95vw] flex-col gap-y-4 overflow-y-auto p-4 lg:-right-[30vw] lg:w-[30vw]`}
          >
            <ConnectedAccount />
            <div className="flex justify-between text-white">
              <h4 className="flex-none text-xl">My cart</h4>
              <div className="text-primary-black bg-accent-yellow mx-2 flex h-7 w-7 items-center justify-center rounded-full">
                <span className="text-primary-black font-bold">{totalQty}</span>
              </div>
              <div className="grow"></div>
              <div className="flex-none">
                <Link to="#" onClick={(e) => closeCart(e)}>
                  <X size={36} />
                </Link>
              </div>
            </div>

            <div>
              {sessionQuery?.data?.cart &&
                sessionQuery?.data?.cart.map((cartItem) => (
                  <div key={cartItem.variant_id}>
                    <div className="flex flex-row text-white">
                      <div className="flex-none">
                        <img
                          alt={cartItem.name}
                          src={getImageURLCommon(
                            cartItem.image,
                            165,
                            165,
                            "contain",
                          )}
                        />
                      </div>
                      {/* begin box BIG on the right */}
                      <div className="my-6 flex w-full flex-row">
                        {/* begin box-on-left */}
                        <div className="flex grow flex-col justify-between">
                          <div>{cartItem.name}</div>
                          <div>
                            <span className="text-gray">SIZE</span>
                            <span className="ml-2 text-white">
                              {cartItem.size}
                            </span>
                          </div>
                          <div className="flex">
                            <Link to="#" onClick={() => {}}>
                              <div className="text-primary-black bg-accent-yellow text-primary-black mr-3 flex h-6 w-6 items-center justify-center rounded-full font-bold">
                                <Minus
                                  size={18}
                                  onClick={async (e) =>
                                    handleUpdateQty(e, cartItem.variant_id, -1)
                                  }
                                />
                              </div>
                            </Link>
                            <div>{cartItem.qty}</div>
                            <Link to="#" onClick={() => {}}>
                              <div className="text-primary-black bg-accent-yellow text-primary-black ml-3 flex h-6 w-6 items-center justify-center rounded-full font-bold">
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
                        <div className="flex flex-none flex-col justify-between">
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
                    <div className="bg bg-primary-black my-[20px] h-[2px] w-full"></div>
                  </div>
                ))}
            </div>
            <ConnectCheckoutButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
