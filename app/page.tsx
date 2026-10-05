'use client'

import { useMemo, useState } from 'react'
import { Building2, Check, ChevronDown, Clock3, Copy, Globe2, Mail, MapPin, Phone, Search, X } from 'lucide-react'
import { agencies, citiesList, countries, getAgencyStatus, googleMapsUrl, normalize, type Agency } from '@/data/agencies'

const empty = 'À vérifier'

export default function Page() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'all' | Agency['type']>('all')
  const [country, setCountry] = useState('Tous les pays')
  const [city, setCity] = useState('Toutes les villes')
  const [openOnly, setOpenOnly] = useState(false)
  const [selected, setSelected] = useState<Agency | null>(null)

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    const exactCitySearch = normalizedQuery
      ? agencies.some((agency) => normalize(agency.city) === normalizedQuery)
      : false

    return agencies.filter((agency) => {
      const haystack = normalize(Object.values(agency).join(' '))
      const matchesQuery = !normalizedQuery || (exactCitySearch
        ? normalize(agency.city) === normalizedQuery
        : haystack.includes(normalizedQuery))
      const matchesType = type === 'all' || agency.type === type
    const matchesCountry = country === 'Tous les pays' || agency.country === country
    const matchesCity = city === 'Toutes les villes' || agency.city === city
    const matchesOpen = !openOnly || getAgencyStatus(agency) === 'Ouvert maintenant'
      return matchesQuery && matchesType && matchesCountry && matchesCity && matchesOpen
    })
  }, [city, country, openOnly, query, type])

  return <div className="app-shell">
    <main className="main-content single-page"><section className="hero"><p className="eyebrow">AIR ALGÉRIE · RÉSEAU DES AGENCES</p><h1>Trouver une agence Air Algérie</h1><p className="heading-copy">Recherchez par ville, pays, nom, téléphone ou email.</p></section>
      <section className="search-panel"><div className="search-box"><Search size={21} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une agence, une ville, un pays, un téléphone ou un email..." aria-label="Rechercher une agence" /></div><div className="search-options"><div className="scope-tabs"><button onClick={() => setType('all')} className={type === 'all' ? 'scope-active' : ''}>Toutes</button><button onClick={() => setType('national')} className={type === 'national' ? 'scope-active' : ''}><Building2 data-icon="inline-start" />Nationales</button><button onClick={() => setType('international')} className={type === 'international' ? 'scope-active' : ''}><Globe2 data-icon="inline-start" />Internationales</button></div><div className="quick-filters"><label>Pays<select value={country} onChange={(event) => setCountry(event.target.value)}><option>Tous les pays</option>{countries.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label><label>Ville<select value={city} onChange={(event) => setCity(event.target.value)}><option>Toutes les villes</option>{citiesList.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label><button className={openOnly ? 'filter-active' : ''} onClick={() => setOpenOnly(!openOnly)}>Ouvert maintenant</button></div></div></section>
      <div className="results-header"><div><h2>Agences disponibles</h2><span>{filtered.length} agence{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}</span></div><span className="dataset-note">{agencies.length} points dans le réseau</span></div>
      {filtered.length ? <div className="agency-grid">{filtered.map((agency) => <AgencyCard key={agency.id} agency={agency} onOpen={() => setSelected(agency)} />)}</div> : <div className="empty-state"><Search size={28} /><h3>Aucune agence trouvée</h3><p>Essayez une autre ville, un autre pays ou un numéro de téléphone.</p></div>}
    </main>{selected && <AgencyDetails agency={selected} onClose={() => setSelected(null)} />}</div>
}

function AgencyCard({ agency, onOpen }: { agency: Agency; onOpen: () => void }) { const status = getAgencyStatus(agency); return <article className="agency-card"><div className="card-top"><span className={agency.type === 'national' ? 'badge national' : 'badge international'}>{agency.type === 'national' ? 'NATIONAL' : 'INTERNATIONAL'}</span><span className="status"><i />{status}</span></div><button className="agency-title" onClick={onOpen}>{agency.name}<span>→</span></button><div className="agency-location"><span><MapPin size={14} /> {agency.city}, {agency.country}</span></div><div className="card-details"><Detail icon={<MapPin size={16} />} text={agency.address} /><Detail icon={<Phone size={16} />} text={agency.phone} /><Detail icon={<Mail size={16} />} text={agency.email} /><Detail icon={<Clock3 size={16} />} text={status === 'À vérifier' ? empty : status} /></div><div className="card-actions"><button onClick={onOpen}>Voir la fiche</button></div></article> }
function Detail({ icon, text }: { icon: React.ReactNode; text: string }) { return <div className="detail-row">{icon}<span>{text}</span></div> }

function AgencyDetails({ agency, onClose }: { agency: Agency; onClose: () => void }) { const [copied, setCopied] = useState(false); const copy = async () => { await navigator.clipboard?.writeText(`${agency.name}\n${agency.address}\n${agency.phone}\n${agency.email}`); setCopied(true); setTimeout(() => setCopied(false), 1400) }; const status = getAgencyStatus(agency); return <div className="detail-overlay" role="dialog" aria-modal="true" aria-label={`Fiche ${agency.name}`} onClick={onClose}><div className="detail-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">FICHE AGENCE</p><h2>{agency.name}</h2></div><button className="close-button" onClick={onClose} aria-label="Fermer"><X size={19} /></button></div><div className="drawer-status"><span className="badge">{agency.type === 'national' ? 'NATIONAL' : 'INTERNATIONAL'}</span><span className="status"><i />{status}</span></div><div className="info-grid"><Info label="Adresse" value={agency.address} icon={<MapPin size={16} />} /><Info label="Téléphone" value={agency.phone} icon={<Phone size={16} />} /><Info label="Email" value={agency.email} icon={<Mail size={16} />} /><Info label="Horaires" value={status === 'À vérifier' ? empty : status} icon={<Clock3 size={16} />} /></div><div className="map-preview"><MapPin size={30} color="var(--red)" /><strong>Localisation à vérifier</strong><span>Les coordonnées GPS ne sont pas disponibles dans le dataset.</span></div><div className="location-actions"><a href={agency.phone !== empty ? `tel:${agency.phone}` : undefined} className={agency.phone === empty ? 'disabled' : ''}><Phone size={15} /> Appeler</a><a href={agency.email !== empty ? `mailto:${agency.email}` : undefined} className={agency.email === empty ? 'disabled' : ''}><Mail size={15} /> Email</a><button onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copié' : 'Copier'}</button><a href={googleMapsUrl(agency)} target="_blank" rel="noreferrer"><MapPin size={15} /> Google Maps</a></div></div></div> }
function Info({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) { return <div className="info-item"><div className="info-label">{icon}{label}</div><div className="info-value">{value}</div></div> }

