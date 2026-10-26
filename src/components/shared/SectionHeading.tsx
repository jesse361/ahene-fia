import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  overline?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  overline,
  title,
  description,
  tone = "dark",
  align = "left",
  as = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const Heading = as;
  const ink = tone === "light" ? "text-ivory" : "text-midnight";
  const copy = tone === "light" ? "text-mist" : "text-charcoal/80";

  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {overline ? (
        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">{overline}</p>
      ) : null}
      <Heading id={id} className={cn("font-display text-[2.15rem] leading-[1.05] font-medium sm:text-5xl lg:text-[3.4rem]", ink)}>
        {title}
      </Heading>
      {description ? <p className={cn("mt-4 max-w-2xl text-base leading-7 sm:text-lg", copy, align === "center" && "mx-auto")}>{description}</p> : null}
    </div>
  );
}
