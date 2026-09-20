import { Phone, Bot, Database, FileText, Bell } from 'lucide-react'
import './agent-workflow.css'

const STEPS = [
  { icon: Phone, label: 'Appel entrant' },
  { icon: Bot, label: 'Agent IA' },
  { icon: Database, label: 'CRM enrichi' },
  { icon: FileText, label: 'Devis généré' },
  { icon: Bell, label: 'Commercial notifié' },
]

export default function AgentWorkflow() {
  return (
    <div className="agent-flow">
      <input className="agent-flow-pause" type="checkbox" id="agent-flow-pause" />
      <label className="agent-flow-control" htmlFor="agent-flow-pause">Mettre l’animation en pause</label>
      <div className="agent-flow-stage">
        <div className="agent-flow-rail" aria-hidden="true"><div className="agent-flow-progress" /></div>
        <ol className="agent-flow-steps" aria-label="Les cinq étapes du traitement d’un appel">
          {STEPS.map(({ icon: Icon, label }) => (
            <li className="agent-flow-step" key={label}>
              <Icon className="agent-flow-icon" size={52} strokeWidth={1.6} aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
