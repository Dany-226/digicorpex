import AgentWorkflow from './AgentWorkflow'

export default function AgentsHero() {
  return (
    <section className="bg-slate-900 py-24 px-8">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="inline-block text-[10px] font-label uppercase tracking-[0.25em] text-slate-300 border border-slate-500 px-3 py-1 rounded-sm mb-8">
          Agents IA - en production
        </span>

        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white mb-6">
          Des agents qui travaillent.
          <br />
          Pas des outils.
        </h1>

        <p className="text-lg font-light text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Chaque workflow est déployé, testé et maintenu dans votre environnement métier.
          Pas une démo. Pas un POC. Une infrastructure qui tourne.
        </p>
      </div>

      <AgentWorkflow />
    </section>
  )
}
