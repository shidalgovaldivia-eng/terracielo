type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-soft-gold">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-black tracking-tight text-cream sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
