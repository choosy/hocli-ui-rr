export function CheckoutDeliveryInfo({ delivery }) {
  return (
    <div>
      <div>{delivery.name}</div>
      <div>{delivery.address_line1}</div>
      <div>{delivery.address_line2}</div>
      <div>{delivery.city}</div>
      <div>{delivery.state}</div>
      <div>{delivery.country}</div>
    </div>
  )
}
