import { generateText } from 'ai'
import { agencies } from '@/data/agencies'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { query?: string } | null
  const query = body?.query?.trim()

  if (!query) {
    return Response.json({ city: null })
  }

  const cities = [...new Set(agencies.map((agency) => agency.city))].join(', ')
  const result = await generateText({
    model: 'openai/o4-mini',
    system: `Tu aides un centre d'appel Air Algérie. Identifie la ville recherchée parmi cette liste: ${cities}. Réponds uniquement avec le nom exact de la ville, ou INCONNU si aucune ville ne correspond. Les fautes de frappe et accents manquants sont acceptés.`,
    prompt: query,
  })

  const city = result.text.trim()
  return Response.json({ city: city === 'INCONNU' ? null : city })
}
