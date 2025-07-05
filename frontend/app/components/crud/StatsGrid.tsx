import React from 'react'

interface Stat {
  label: string
  value: string
  trend?: 'up' | 'down'
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <section>
      {stats.map(s => (
        <article key={s.label}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </article>
      ))}
    </section>
  )
}