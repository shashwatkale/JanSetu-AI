import { dashboardPreview } from '../data/landingData'

export default function DashboardPreview() {
  return (
    <section className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Admin Preview</p>
          <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Built for both citizens and government teams.</h2>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">A modern dashboard gives civic authorities oversight of critical issues, statuses, and response performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950">View Dashboard</button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {dashboardPreview.stats.map((item) => (
          <div key={item.label} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 dark:border-slate-800">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Issue</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Department</th>
              <th className="px-5 py-4">Severity</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboardPreview.table.map((row) => (
              <tr key={row.id} className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <td className="px-5 py-4 font-semibold text-slate-950 dark:text-white">{row.id}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{row.issue}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{row.location}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{row.dept}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{row.severity}</td>
                <td className="px-5 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
