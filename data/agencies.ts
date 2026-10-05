import source from './air-algerie-agencies.json'

export type Agency = {
  id: string
  name: string
  type: 'national' | 'international'
  country: string
  city: string
  address: string
  phone: string
  email: string
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  latitude?: number
  longitude?: number
  airport?: string
}

type SourceAgency = {
  id?: number
  nom?: string
  adresse?: string | null
  wilaya?: string | null
  pays?: string | null
  ville?: string | null
  contact?: { telephones?: string[]; email?: string }
  lien_localisation?: string
}

const unknownHours = {
  monday: 'À vérifier',
  tuesday: 'À vérifier',
  wednesday: 'À vérifier',
  thursday: 'À vérifier',
  friday: 'À vérifier',
  saturday: 'À vérifier',
  sunday: 'À vérifier',
}

const rawAgencies = (source as { agences: SourceAgency[] }).agences

export const agencies: Agency[] = rawAgencies.map((item, index) => {
  const country = item.pays?.trim() || 'Algérie'
  const city = item.ville?.trim() || item.wilaya?.trim() || 'À vérifier'
  return {
    id: String(item.id ?? index + 1),
    name: item.nom?.trim() || 'Agence Air Algérie',
    type: country.toLocaleLowerCase('fr') === 'algérie' ? 'national' : 'international',
    country,
    city,
    address: item.adresse?.trim() || 'À vérifier',
    phone: item.contact?.telephones?.join(' · ') || 'À vérifier',
    email: item.contact?.email?.trim() || 'À vérifier',
    openingHours: unknownHours,
  }
})

export const countries = [...new Set(agencies.map((agency) => agency.country))].sort((a, b) => a.localeCompare(b, 'fr'))
export const citiesList = [...new Set(agencies.map((agency) => agency.city))].sort((a, b) => a.localeCompare(b, 'fr'))

export function getAgencyStatus(agency: Agency) {
  const day = new Date().getDay()
  const key = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day] as keyof Agency['openingHours']
  return agency.openingHours[key] === 'À vérifier' ? 'À vérifier' : 'Fermé'
}

export function googleMapsUrl(agency: Agency) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${agency.name}, ${agency.address}`)}`
}

export function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default agencies
