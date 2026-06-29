'use client'

import StatCounter from './StatCounter'

interface StatsSectionProps {
  totalProjects: number
  totalParticipants: number
  uniqueSkillCount: number
}

function StatIconProject() {
  return (
    <svg className="svg-draw" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .996.91h10.348a1 1 0 0 0 .996-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 120, strokeDashoffset: 120 }}
      />
    </svg>
  )
}

function StatIconPeople() {
  return (
    <svg className="svg-draw" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1z"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
      />
      <path
        d="M7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002z"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 80, strokeDashoffset: 80 }}
      />
      <path
        d="M11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
      />
      <path
        d="M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      />
    </svg>
  )
}

function StatIconTech() {
  return (
    <svg className="svg-draw" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1a.5.5 0 0 1 .5.5v1h1.5a.5.5 0 0 1 0 1H14z"
        stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 120, strokeDashoffset: 120 }}
      />
    </svg>
  )
}

export default function StatsSection({ totalProjects, totalParticipants, uniqueSkillCount }: StatsSectionProps) {
  const stats = [
    { target: totalProjects, label: 'Active Projects', icon: <StatIconProject /> },
    { target: totalParticipants, label: 'Engineers', icon: <StatIconPeople /> },
    { target: uniqueSkillCount, label: 'Technologies', icon: <StatIconTech /> },
  ]

  return (
    <div className="grid grid-cols-1 gap-px sm:grid-cols-3">
      {stats.map((stat) => (
        <StatCounter
          key={stat.label}
          target={stat.target}
          label={stat.label}
          icon={stat.icon}
        />
      ))}
    </div>
  )
}
