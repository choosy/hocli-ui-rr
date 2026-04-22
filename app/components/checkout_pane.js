export function CheckoutPane({ children }) {
  let extraClass = children.extraClass || ''

  return (
    <>
      <div className={`grow border border-lime-500 p-6 ${extraClass} `}>
        {children}
      </div>
    </>
  )
}
