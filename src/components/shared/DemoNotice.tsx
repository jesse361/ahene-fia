export function DemoNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-gold/50 bg-gold/10 px-4 py-3 text-sm leading-6 text-charcoal">
      <span className="font-semibold text-midnight">Demonstration content. </span>
      {children}
    </p>
  );
}
