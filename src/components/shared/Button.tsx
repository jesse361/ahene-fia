import Link from "next/link";

import { cn } from "@/lib/utils/cn";

const variants = {
  primary: "border-gold bg-gold text-midnight hover:bg-[#e4c27a]",
  secondary: "border-ivory/35 bg-transparent text-ivory hover:border-gold hover:text-gold",
  ivory: "border-ivory bg-ivory text-midnight hover:bg-white",
  forest: "border-forest bg-forest text-ivory hover:bg-[#0c3028]",
  ghost: "border-transparent bg-transparent px-0 text-gold underline-offset-4 hover:underline",
  line: "border-charcoal/20 bg-transparent text-midnight hover:border-gold",
} as const;

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "min-h-14 px-7 text-base",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = Common & Omit<React.ComponentProps<typeof Link>, "className" | "children"> & { href: string };

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "ghost" ? "h-auto" : sizes[size],
    variants[variant],
    className,
  );
}

function isLink(props: ButtonProps | LinkProps): props is LinkProps {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const classNames = classes(variant, size, props.className);

  if (isLink(props)) {
    const {
      children,
      href,
      variant: omittedVariant,
      size: omittedSize,
      className: omittedClassName,
      ...rest
    } = props;
    void omittedVariant;
    void omittedSize;
    void omittedClassName;
    if (href.startsWith("http")) {
      return (
        <a href={href} className={classNames} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classNames} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    children,
    variant: omittedVariant,
    size: omittedSize,
    className: omittedClassName,
    href: omittedHref,
    ...rest
  } = props;
  void omittedVariant;
  void omittedSize;
  void omittedClassName;
  void omittedHref;
  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
}
