/**
 * Technical data, set in IBM Plex Mono.
 *
 * Scrolls inside its own container rather than pushing the page sideways at
 * 360px, and keeps a caption so the table means something on its own.
 */
export default function SpecTable({
  caption,
  rows,
  footnote,
}: {
  caption: string
  rows: { label: string; value: string; note?: string }[]
  footnote?: string
}) {
  return (
    <div>
      <div className="overflow-x-auto rounded-[8px] border border-steel-200 bg-white">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-steel-200 bg-steel-100">
              <th scope="col" className="eyebrow px-5 py-3 font-medium text-ink-600">
                Parameter
              </th>
              <th scope="col" className="eyebrow px-5 py-3 font-medium text-ink-600">
                Value
              </th>
              <th scope="col" className="eyebrow px-5 py-3 font-medium text-ink-600">
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-steel-200 last:border-0"
              >
                <th
                  scope="row"
                  className="px-5 py-3.5 text-sm font-normal text-ink-600"
                >
                  {row.label}
                </th>
                <td className="figure px-5 py-3.5 text-sm">{row.value}</td>
                <td className="px-5 py-3.5 text-sm text-ink-400">
                  {row.note ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && (
        <p className="mt-4 text-xs text-ink-400">{footnote}</p>
      )}
    </div>
  )
}
