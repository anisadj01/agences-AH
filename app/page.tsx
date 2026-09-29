'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Clock3,
  Copy,
  Globe2,
  Heart,
  Map,
  MapPin,
  Menu,
  Moon,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Sun,
  X,
  Mail,
} from 'lucide-react'

type Agency = {
  id: string
  name: string
  type: 'national' | 'international'
  country: string
  city: string
  address: string
  phone: string
  secondaryPhone?: string
  email: string
  hours: string
  code: string
  latitude: number
  longitude: number
  open: boolean
}

const agencies: Agency[] = [
  { id: 'alg-centre', name: 'Alger Centre', type: 'national', country: 'Algérie', city: 'Alger', address: '12, Rue Didouche Mourad, Alger', phone: '+213 21 63 38 00', secondaryPhone: '+213 21 63 37 99', email: 'alger.centre@airalgerie.dz', hours: '08:00 — 17:00', code: 'ALG-001', latitude: 36.765, longitude: 3.05, open: true },
  { id: 'oran', name: 'Oran Es-Senia', type: 'national', country: 'Algérie', city: 'Oran', address: 'Aéroport Ahmed Ben Bella, Es Senia', phone: '+213 41 59 10 10', email: 'oran@airalgerie.dz', hours: '08:00 — 16:30', code: 'ORN-002', latitude: 35.697, longitude: -0.63, open: true },
  { id: 'paris', name: 'Paris Opéra', type: 'international', country: 'France', city: 'Paris', address: '15, Avenue de l’Opéra, 75001 Paris', phone: '+33 1 76 54 40 00', secondaryPhone: '+33 1 76 54 40 01', email: 'paris.opera@airalgerie.dz', hours: '09:00 — 17:00', code: 'PAR-014', latitude: 48.866, longitude: 2.333, open: true },
  { id: 'marseille', name: 'Marseille Saint-Charles', type: 'international', country: 'France', city: 'Marseille', address: 'Gare Saint-Charles, 13001 Marseille', phone: '+33 4 91 13 00 00', email: 'marseille@airalgerie.dz', hours: '09:00 — 16:00', code: 'MRS-018', latitude: 43.303, longitude: 5.381, open: false },
  { id: 'montreal', name: 'Montréal Downtown', type: 'international', country: 'Canada', city: 'Montréal', address: '1250, Boulevard René-Lévesque Ouest', phone: '+1 514 285 88 88', email: 'montreal@airalgerie.dz', hours: '09:00 — 17:00', code: 'YUL-021', latitude: 45.498, longitude: -73.57, open: true },
  { id: 'londres', name: 'London Victoria', type: 'international', country: 'Royaume-Uni', city: 'London', address: '22 Wilton Road, London SW1V 1AN', phone: '+44 20 76 30 00 00', email: 'london@airalgerie.dz', hours: '09:00 — 17:00', code: 'LON-026', latitude: 51.494, longitude: -0.142, open: false },
]

const navItems = [
  { label: 'Dashboard', icon: Building2 },
  { label: 'Rechercher une agence', icon: Search },
  { label: 'Carte', icon: Map },
  { label: 'National', icon: ShieldCheck },
  { label: 'International', icon: Globe2 },
]

export default function Page() {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<'all' | 'national' | 'international'>('all')
  const [selected, setSelected] = useState<Agency | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [dark, setDark] = useState(false)
  const [recent, setRecent] = useState<string[]>([])
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('air-finder-favorites') || '[]'))
    setRecent(JSON.parse(localStorage.getItem('air-finder-recent') || '[]'))
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') { event.preventDefault(); searchRef.current?.focus() }
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Enter' && query && filtered[0]) setSelected(filtered[0])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [query])

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    return agencies.filter((agency) => {
      const matchesScope = scope === 'all' || agency.type === scope
      const haystack = Object.values(agency).join(' ').toLowerCase()
      return matchesScope && (!normalized || haystack.includes(normalized))
    })
  }, [query, scope])

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]
    setFavorites(next); localStorage.setItem('air-finder-favorites', JSON.stringify(next))
  }

  const openAgency = (agency: Agency) => {
    setSelected(agency)
    const next = [agency.id, ...recent.filter((id) => id !== agency.id)].slice(0, 4)
    setRecent(next); localStorage.setItem('air-finder-recent', JSON.stringify(next))
  }

  return (
    <div className={dark ? 'app-shell dark-shell' : 'app-shell'}>
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-label="Air Algérie">AH</div>
          <div><div className="brand-name">Agency Finder</div><div className="brand-subtitle">Outil interne <span>/</span> Call Center</div></div>
        </div>
        <div className="top-actions">
          <div className="language-switch"><button className="active">FR</button><button>AR</button><button>EN</button></div>
          <button className="icon-button" aria-label="Changer de thème" onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          <div className="user-menu"><div className="avatar">NK</div><div className="user-info"><strong>Nadia K.</strong><span>Agent call center</span></div><ChevronDown size={15} /></div>
        </div>
      </header>
      <div className="red-line" />
      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">Navigation</div>
          <nav>{navItems.map(({ label, icon: Icon }) => <button key={label} className={label === 'Dashboard' ? 'nav-item selected' : 'nav-item'}><Icon size={17} /><span>{label}</span>{label === 'Carte' && <span className="nav-count">6</span>}</button>)}</nav>
          <div className="sidebar-label section-label">Votre espace</div>
          <button className="nav-item"><Star size={17} /><span>Favoris</span><span className="nav-count">{favorites.length}</span></button>
          <button className="nav-item"><Clock3 size={17} /><span>Récemment consultées</span></button>
          <div className="sidebar-bottom"><button className="nav-item"><Settings size={17} /><span>Paramètres</span></button><div className="demo-note"><span className="demo-dot" />Dataset de démonstration<br /><small>À remplacer par les données officielles</small></div></div>
        </aside>
        <main className="main-content">
          <div className="page-heading"><div><p className="eyebrow">LUNDI, 29 SEPTEMBRE 2026</p><h1>Rechercher une agence</h1><p className="heading-copy">Trouvez rapidement les coordonnées et horaires d’une agence Air Algérie.</p></div><button className="outline-button"><SlidersHorizontal size={16} /> Filtres avancés</button></div>
          <section className="search-panel">
            <div className="search-box"><Search size={21} /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher par ville, pays, agence, téléphone, email ou code…" aria-label="Rechercher une agence" /><kbd>/</kbd></div>
            <div className="search-options"><div className="scope-tabs">{[['all', 'Toutes'], ['national', 'National'], ['international', 'International']].map(([value, label]) => <button key={value} onClick={() => setScope(value as typeof scope)} className={scope === value ? 'scope-active' : ''}>{label}</button>)}</div><div className="quick-filters"><button>Pays <ChevronDown size={14} /></button><button>Ville <ChevronDown size={14} /></button><button>Type d’agence <ChevronDown size={14} /></button><button>Ouvert maintenant</button></div></div>
          </section>
          <section className="stats-grid"><StatCard icon={<Building2 size={18} />} value={agencies.length} label="Total agences" tone="red" /><StatCard icon={<ShieldCheck size={18} />} value={agencies.filter(a => a.type === 'national').length} label="Agences nationales" tone="blue" /><StatCard icon={<Globe2 size={18} />} value={agencies.filter(a => a.type === 'international').length} label="Agences internationales" tone="purple" /><StatCard icon={<MapPin size={18} />} value={new Set(agencies.map(a => a.country)).size} label="Pays couverts" tone="orange" /></section>
          <div className="results-header"><div><h2>Agences disponibles</h2><span>{filtered.length} agence{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}</span></div><button className="sort-button">Pertinence <ChevronDown size={14} /></button></div>
          {filtered.length ? <div className="agency-grid">{filtered.map(agency => <AgencyCard key={agency.id} agency={agency} favorite={favorites.includes(agency.id)} onFavorite={() => toggleFavorite(agency.id)} onOpen={() => openAgency(agency)} />)}</div> : <div className="empty-state"><Search size={28} /><h3>Aucune agence trouvée</h3><p>Essayez une autre ville, un autre pays ou un numéro de téléphone.</p></div>}
        </main>
      </div>
      {selected && <AgencyDetails agency={selected} favorite={favorites.includes(selected.id)} onFavorite={() => toggleFavorite(selected.id)} onClose={() => setSelected(null)} />}
      <div className="mobile-nav"><Search size={19} /><Map size={19} /><Building2 size={19} /><Star size={19} /></div>
    </div>
  )
}

function StatCard({ icon, value, label, tone }: { icon: React.ReactNode; value: number; label: string; tone: string }) { return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div><strong>{value}</strong><span>{label}</span></div><ArrowUpRight size={15} className="stat-arrow" /></div> }

function AgencyCard({ agency, favorite, onFavorite, onOpen }: { agency: Agency; favorite: boolean; onFavorite: () => void; onOpen: () => void }) { return <article className="agency-card"><div className="card-top"><span className={agency.type === 'national' ? 'badge national' : 'badge international'}>{agency.type === 'national' ? 'NATIONAL' : 'INTERNATIONAL'}</span><button className={favorite ? 'favorite-button favorited' : 'favorite-button'} onClick={onFavorite} aria-label="Ajouter aux favoris"><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /></button></div><button className="agency-title" onClick={onOpen}>{agency.name}<ArrowUpRight size={17} /></button><div className="agency-location"><span>{agency.city}, {agency.country}</span><span className={agency.open ? 'status open' : 'status'}><i />{agency.open ? 'Ouvert maintenant' : 'Fermé'}</span></div><div className="card-details"><Detail icon={<MapPin size={16} />} text={agency.address} /><Detail icon={<Phone size={16} />} text={agency.phone} href={`tel:${agency.phone}`} /><Detail icon={<Mail size={16} />} text={agency.email} href={`mailto:${agency.email}`} /><Detail icon={<Clock3 size={16} />} text={agency.hours} /></div><div className="card-actions"><a href={`tel:${agency.phone}`}><Phone size={15} /> Appeler</a><a href={`mailto:${agency.email}`}><Mail size={15} /> Email</a><button onClick={onOpen}><MapPin size={15} /> Voir sur la carte</button></div></article> }
function Detail({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) { return <div className="detail-row">{icon}{href ? <a href={href}>{text}</a> : <span>{text}</span>}</div> }

function AgencyDetails({ agency, favorite, onFavorite, onClose }: { agency: Agency; favorite: boolean; onFavorite: () => void; onClose: () => void }) { const [copied, setCopied] = useState(''); const copy = (value: string, label: string) => { navigator.clipboard?.writeText(value); setCopied(label); setTimeout(() => setCopied(''), 1600) }; return <div className="detail-overlay" role="dialog" aria-modal="true"><div className="detail-drawer"><div className="drawer-header"><div><p className="eyebrow">FICHE AGENCE <span>•</span> {agency.code}</p><h2>Air Algérie — {agency.name}</h2></div><div className="drawer-actions"><button className={favorite ? 'favorite-button favorited' : 'favorite-button'} onClick={onFavorite}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /></button><button className="close-button" onClick={onClose} aria-label="Fermer"><X size={19} /></button></div></div><div className="drawer-status"><span className={agency.open ? 'status open' : 'status'}><i />{agency.open ? 'Ouvert maintenant' : 'Fermé'}</span><span className="badge">{agency.type === 'national' ? 'NATIONAL' : 'INTERNATIONAL'}</span></div><div className="info-grid"><InfoItem label="Adresse" value={agency.address} icon={<MapPin size={16} />} onCopy={() => copy(agency.address, 'adresse')} /><InfoItem label="Téléphone principal" value={agency.phone} icon={<Phone size={16} />} onCopy={() => copy(agency.phone, 'téléphone')} /><InfoItem label="Email" value={agency.email} icon={<Mail size={16} />} onCopy={() => copy(agency.email, 'email')} /><InfoItem label="Horaires aujourd’hui" value={agency.hours} icon={<Clock3 size={16} />} /></div><div className="map-preview"><div className="map-grid" /><div className="map-label"><MapPin size={21} fill="var(--red)" />{agency.city}</div><span className="map-coordinates">{agency.latitude.toFixed(3)}° N · {agency.longitude.toFixed(3)}° {agency.longitude > 0 ? 'E' : 'W'}</span></div><div className="location-actions"><a href={`https://www.google.com/maps/search/?api=1&query=${agency.latitude},${agency.longitude}`} target="_blank" rel="noreferrer"><Map size={15} /> Ouvrir dans Google Maps</a><button onClick={() => copy(agency.address, 'adresse')}><Copy size={15} /> Copier l’adresse</button></div><section className="hours-section"><h3>Horaires d’ouverture</h3><div className="hours-table">{['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'].map((day, i) => <div key={day} className={i === 0 ? 'today' : ''}><span>{day}{i === 0 && <small>Aujourd’hui</small>}</span><span>{i === 4 || i === 6 ? 'Fermé' : i === 5 ? '08:00 — 13:00' : agency.hours}</span></div>)}</div></section>{copied && <div className="toast"><Copy size={15} /> {copied} copié</div>}</div></div> }
function InfoItem({ label, value, icon, onCopy }: { label: string; value: string; icon: React.ReactNode; onCopy?: () => void }) { return <div className="info-item"><div className="info-label">{icon}{label}</div><div className="info-value">{value}{onCopy && <button onClick={onCopy} aria-label={`Copier ${label}`}><Copy size={14} /></button>}</div></div> }

