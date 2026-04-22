export function CheckoutCustomerInfo({ customer }) {
  return (
    <div>
      <div>{customer.name}</div>
      <div>{customer.email}</div>
    </div>
  )
}
