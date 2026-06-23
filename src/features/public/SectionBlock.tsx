import type { Section } from '../../content/publicContent'

export function SectionBlock({ section }: { section: Section }) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-stone-950">{section.title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-stone-700">
        {section.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </>
  )
}
