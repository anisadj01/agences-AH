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

const cities = [
  ['Alger','Algerie','Air Algérie — Alger','national'],['Alger','Algerie','Air Algérie — Alger Centre','national'],['Alger','Algerie','Air Algérie — El Biar','national'],['Alger','Algerie','Air Algérie — Aéroport Houari Boumédiène','national'],['Adrar','Algerie','Air Algérie — Adrar','national'],['Adrar','Algerie',"Air Algérie — Aéroport d'Adrar",'national'],['Annaba','Algerie','Air Algérie — Annaba','national'],['Annaba','Algerie',"Air Algérie — Aéroport d'Annaba Rabah Bitat",'national'],['Batna','Algerie','Air Algérie — Batna','national'],['Batna','Algerie','Air Algérie — Aéroport de Batna Mostefa Ben Boulaïd','national'],['Béchar','Algerie','Air Algérie — Béchar','national'],['Béchar','Algerie','Air Algérie — Aéroport de Béchar Boudghene Ben Ali Lotfi','national'],['Béjaïa','Algerie','Air Algérie — Béjaïa','national'],['Béjaïa','Algerie','Air Algérie — Aéroport de Béjaïa Soummam Abane Ramdane','national'],['Biskra','Algerie','Air Algérie — Biskra','national'],['Blida','Algerie','Air Algérie — Blida','national'],['Blida','Algerie','Air Algérie — Blida Centre','national'],['Biskra','Algerie','Air Algérie — Aéroport de Biskra Mohamed Khider','national'],['Bordj Badji Mokhtar','Algerie','Air Algérie — Bordj Badji Mokhtar','national'],['Chlef','Algerie','Air Algérie — Chlef','national'],['Constantine','Algerie','Air Algérie — Constantine','national'],['Constantine','Algerie','Air Algérie — Aéroport de Constantine Mohamed Boudiaf','national'],['Djanet','Algerie','Air Algérie — Djanet','national'],['El Bayadh','Algerie','Air Algérie — El Bayadh','national'],['El Ménia','Algerie','Air Algérie — El Ménia','national'],['El Goléa','Algerie','Air Algérie — El Goléa','national'],['El Oued','Algerie','Air Algérie — El Oued','national'],['Ghardaïa','Algerie','Air Algérie — Ghardaïa','national'],['Hassi Messaoud','Algerie','Air Algérie — Hassi Messaoud','national'],['Hassi R\'Mel','Algerie',"Air Algérie — Hassi R'Mel",'national'],['Illizi','Algerie','Air Algérie — Illizi','national'],['In Amenas','Algerie','Air Algérie — In Amenas','national'],['In Guezzam','Algerie','Air Algérie — In Guezzam','national'],['In Salah','Algerie','Air Algérie — In Salah','national'],['Jijel','Algerie','Air Algérie — Jijel','national'],['Laghouat','Algerie','Air Algérie — Laghouat','national'],['Mascara','Algerie','Air Algérie — Mascara','national'],['Mécheria','Algerie','Air Algérie — Mécheria','national'],['Mostaganem','Algerie','Air Algérie — Mostaganem','national'],['Oran','Algerie',"Air Algérie — Oran",'national'],['Oran','Algerie',"Air Algérie — Aéroport d'Oran Ahmed Ben Bella",'national'],['Ouargla','Algerie','Air Algérie — Ouargla','national'],['Sétif','Algerie','Air Algérie — Sétif','national'],['Tamanrasset','Algerie','Air Algérie — Tamanrasset','national'],['Tébessa','Algerie','Air Algérie — Tébessa','national'],['Tiaret','Algerie','Air Algérie — Tiaret','national'],['Timimoun','Algerie','Air Algérie — Timimoun','national'],['Tindouf','Algerie','Air Algérie — Tindouf','national'],['Tlemcen','Algerie','Air Algérie — Tlemcen','national'],['Touggourt','Algerie','Air Algérie — Touggourt','national'],
]

const international: [string,string,string][] = [['Paris','France','Air Algérie — Paris'],['Paris','France','Air Algérie — Paris Opéra'],['Paris','France','Air Algérie — Paris Charles-de-Gaulle'],['Paris','France','Air Algérie — Paris Orly'],['Marseille','France','Air Algérie — Marseille'],['Lyon','France','Air Algérie — Lyon'],['Toulouse','France','Air Algérie — Toulouse'],['Lille','France','Air Algérie — Lille'],['Nice','France','Air Algérie — Nice'],['Bordeaux','France','Air Algérie — Bordeaux'],['Metz','France','Air Algérie — Metz'],['Mulhouse','France','Air Algérie — Mulhouse'],['Montpellier','France','Air Algérie — Montpellier'],['Nantes','France','Air Algérie — Nantes'],['Strasbourg','France','Air Algérie — Strasbourg'],['Madrid','Espagne','Air Algérie — Madrid'],['Barcelone','Espagne','Air Algérie — Barcelone'],['Alicante','Espagne','Air Algérie — Alicante'],['Valence','Espagne','Air Algérie — Valence'],['Rome','Italie','Air Algérie — Rome'],['Milan','Italie','Air Algérie — Milan'],['Francfort','Allemagne','Air Algérie — Francfort'],['Berlin','Allemagne','Air Algérie — Berlin'],['Bruxelles','Belgique','Air Algérie — Bruxelles'],['Charleroi','Belgique','Air Algérie — Charleroi'],['Genève','Suisse','Air Algérie — Genève'],['Londres','Royaume-Uni','Air Algérie — Londres'],['Manchester','Royaume-Uni','Air Algérie — Manchester'],['Lisbonne','Portugal','Air Algérie — Lisbonne'],['Porto','Portugal','Air Algérie — Porto'],['Vienne','Autriche','Air Algérie — Vienne'],['Budapest','Hongrie','Air Algérie — Budapest'],['Amsterdam','Pays-Bas','Air Algérie — Amsterdam'],['Istanbul','Turquie','Air Algérie — Istanbul'],['Moscou','Russie','Air Algérie — Moscou'],['Montréal','Canada','Air Algérie — Montréal'],['Pékin','Chine','Air Algérie — Pékin'],['Shanghai','Chine','Air Algérie — Shanghai'],['Doha','Qatar','Air Algérie — Doha'],['Amman','Jordanie','Air Algérie — Amman'],['Beyrouth','Liban','Air Algérie — Beyrouth'],['Djeddah','Arabie Saoudite','Air Algérie — Djeddah'],['Tunis','Tunisie','Air Algérie — Tunis'],['Tripoli','Libye','Air Algérie — Tripoli'],['Luanda','Angola','Air Algérie — Luanda'],['Johannesburg','Afrique du Sud','Air Algérie — Johannesburg'],['Abidjan','Côte d’Ivoire','Air Algérie — Abidjan'],['Lagos','Nigeria','Air Algérie — Lagos'],['Abuja','Nigeria','Air Algérie — Abuja'],['Addis-Abeba','Éthiopie','Air Algérie — Addis-Abeba'],['Bamako','Mali','Air Algérie — Bamako'],['Dakar','Sénégal','Air Algérie — Dakar'],['Ouagadougou','Burkina Faso','Air Algérie — Ouagadougou'],['Niamey','Niger','Air Algérie — Niamey'],['Nouakchott','Mauritanie','Air Algérie — Nouakchott'],['Conakry','Guinée','Air Algérie — Conakry'],['Douala','Cameroun','Air Algérie — Douala'],['Brazzaville','Congo','Air Algérie — Brazzaville'],['Libreville','Gabon','Air Algérie — Libreville'],['Maputo','Mozambique','Air Algérie — Maputo'],["N'Djamena",'Tchad',"Air Algérie — N'Djamena"]]

const unknownHours = { monday: 'À vérifier', tuesday: 'À vérifier', wednesday: 'À vérifier', thursday: 'À vérifier', friday: 'À vérifier', saturday: 'À vérifier', sunday: 'À vérifier' }
const makeAgency = (entry: string[], index: number, type: Agency['type']): Agency => ({ id: `${type}-${String(index + 1).padStart(3, '0')}`, city: entry[0], country: entry[1], name: entry[2], type, address: 'À vérifier', phone: 'À vérifier', email: 'À vérifier', openingHours: unknownHours })

export const agencies: Agency[] = [...cities.map((entry, index) => makeAgency(entry, index, 'national')), ...international.map((entry, index) => makeAgency(entry, index, 'international'))]
export const countries = [...new Set(agencies.map((agency) => agency.country))].sort((a, b) => a.localeCompare(b, 'fr'))
export const citiesList = [...new Set(agencies.map((agency) => agency.city))].sort((a, b) => a.localeCompare(b, 'fr'))

export function getAgencyStatus(agency: Agency) {
  const day = new Date().getDay()
  const key = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day] as keyof Agency['openingHours']
  return agency.openingHours[key] === 'À vérifier' ? 'À vérifier' : 'Fermé'
}
export function googleMapsUrl(agency: Agency) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${agency.name}, ${agency.city}, ${agency.country}`)}` }
export function normalize(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() }

export default agencies
