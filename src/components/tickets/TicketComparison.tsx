import { comparisonRows, ticketTiers } from "@/data/tickets";

export function TicketComparison() {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="sr-only">Comparison of demonstration ticket options</caption>
        <thead>
          <tr className="border-b border-charcoal/15">
            <th scope="col" className="py-3 pr-4 font-medium text-stone">
              Included as proposed
            </th>
            {ticketTiers.map((tier) => (
              <th key={tier.id} scope="col" className="px-4 py-3 font-display text-2xl font-medium text-midnight">
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.label} className="border-b border-charcoal/10">
              <th scope="row" className="py-4 pr-4 font-medium text-midnight">
                {row.label}
              </th>
              {ticketTiers.map((tier) => (
                <td key={tier.id} className="px-4 py-4 text-charcoal/80">
                  {row.values[tier.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
