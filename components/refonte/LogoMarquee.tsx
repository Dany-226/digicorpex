import Image from 'next/image'

const tools = [
  ['salesforce', 'Salesforce'], ['microsoftexcel', 'Excel'], ['notion', 'Notion'],
  ['whatsapp', 'WhatsApp'], ['googledrive', 'Google Drive'], ['hubspot', 'HubSpot'],
  ['make', 'Make'], ['zapier', 'Zapier'], ['gmail', 'Gmail'], ['telegram', 'Telegram'],
]
const models = [
  ['openai', 'ChatGPT'], ['anthropic', 'Claude'], ['googlegemini', 'Gemini'],
  ['mistralai', 'Mistral'], ['perplexity', 'Perplexity'], ['deepseek', 'DeepSeek'],
]

export default function LogoMarquee({ kind }: { kind: 'tools' | 'ai' }) {
  const brands = kind === 'tools' ? tools : models
  return (
    <div className={`marquee ${kind === 'tools' ? 'left' : 'right ai-marquee'}`}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul className="marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {brands.map(([slug, label]) => (
              <li className="brand-chip" key={slug}>
                <Image src={`/refonte/logos/${slug}.svg`} alt="" width={29} height={29} />
                <b>{label}</b>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
