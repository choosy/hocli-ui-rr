'use client'

export function Summary({ summary, ...props }) {
  return (
    <div className="border border-red-500">
      <div className="pb-2">Summary</div>
      <div>{summary}</div>
    </div>
  )
}
