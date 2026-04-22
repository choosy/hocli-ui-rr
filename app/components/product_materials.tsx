'use client'

export function Materials({ materials, ...props }) {
  return (
    <div className="border border-red-500">
      <div className="pb-2">Materials</div>

      <ul className="list-disc pl-5">
        {materials.map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>
    </div>
  )
}
