// Complete Sri Lankan locations database
export interface LocationData {
  city: string
  district: string
  province: string
}

// Sri Lankan provinces
export const provinces = [
  'Western',
  'Central',
  'Southern',
  'Northern',
  'Eastern',
  'North Western',
  'North Central',
  'Uva',
  'Sabaragamuwa',
] as const

// Complete list of all 25 districts organized by province
export const districtsByProvince = {
  Western: ['Colombo', 'Gampaha', 'Kalutara'],
  Central: ['Kandy', 'Matale', 'Nuwara Eliya'],
  Southern: ['Galle', 'Matara', 'Hambantota'],
  Northern: ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
  Eastern: ['Batticaloa', 'Ampara', 'Trincomalee'],
  'North Western': ['Kurunegala', 'Puttalam'],
  'North Central': ['Anuradhapura', 'Polonnaruwa'],
  Uva: ['Badulla', 'Monaragala'],
  Sabaragamuwa: ['Ratnapura', 'Kegalle'],
} as const

// Flatten districts list
export const districts = Object.values(districtsByProvince).flat()

// Complete cities by district
export const citiesByDistrict = {
  // Western Province
  Colombo: [
    'Colombo',
    'Dehiwala-Mount Lavinia',
    'Moratuwa',
    'Sri Jayawardenepura Kotte',
    'Kolonnawa',
    'Nugegoda',
    'Maharagama',
    'Kotte',
    'Rajagiriya',
    'Battaramulla',
    'Kesbewa',
    'Kaduwela',
    'Homagama',
  ],
  Gampaha: [
    'Gampaha',
    'Negombo',
    'Katunayake',
    'Kelaniya',
    'Wattala',
    'Kiribathgoda',
    'Ja-Ela',
    'Minuwangoda',
    'Divulapitiya',
    'Mirigama',
    'Attanagalla',
    'Biyagama',
    'Dompe',
    'Mahara',
  ],
  Kalutara: [
    'Kalutara',
    'Panadura',
    'Horana',
    'Beruwala',
    'Aluthgama',
    'Bandaragama',
    'Matugama',
    'Ingiriya',
    'Wadduwa',
    'Agalawatta',
    'Bulathsinhala',
    'Dodangoda',
    'Madurawela',
    'Millaniya',
    'Palindanuwara',
    'Walallawita',
  ],

  // Central Province
  Kandy: [
    'Kandy',
    'Gampola',
    'Nawalapitiya',
    'Wattegama',
    'Kadugannawa',
    'Peradeniya',
    'Akurana',
    'Pilimatalawa',
    'Udadumbara',
    'Yatinuwara',
    'Udunuwara',
    'Gangawata Korale',
    'Harispattuwa',
    'Pathahewaheta',
    'Kundasale',
    'Medadumbara',
    'Pasbage Korale',
    'Panvila',
    'Poojapitiya',
    'Ududumbara',
  ],
  Matale: [
    'Matale',
    'Dambulla',
    'Sigiriya',
    'Galewela',
    'Ukuwela',
    'Naula',
    'Rattota',
    'Pallepola',
    'Yatawatta',
    'Laggala-Pallegama',
    'Wilgamuwa',
  ],
  'Nuwara Eliya': [
    'Nuwara Eliya',
    'Hatton',
    'Talawakelle',
    'Ginigathena',
    'Kotagala',
    'Maskeliya',
    'Nuwara Eliya',
    'Walapane',
    'Ambagamuwa',
    'Kotmale',
    'Hanguranketha',
  ],

  // Southern Province
  Galle: [
    'Galle',
    'Hikkaduwa',
    'Ambalangoda',
    'Bentota',
    'Elpitiya',
    'Karapitiya',
    'Unawatuna',
    'Ahangama',
    'Baddegama',
    'Balapitiya',
    'Bope-Poddala',
    'Gonapinuwala',
    'Habaraduwa',
    'Imaduwa',
    'Karandeniya',
    'Neluwa',
    'Thawalama',
    'Udugama',
    'Wanduramba',
    'Welivitiya-Divithura',
    'Yakkalamulla',
  ],
  Matara: [
    'Matara',
    'Weligama',
    'Mirissa',
    'Akuressa',
    'Hakmana',
    'Devinuwara',
    'Dickwella',
    'Deniyaya',
    'Kamburupitiya',
    'Kirinda-Puhulwella',
    'Kotapola',
    'Malimbada',
    'Mulatiyana',
    'Pasgoda',
    'Pitabeddara',
    'Thihagoda',
    'Welipitiya',
  ],
  Hambantota: [
    'Hambantota',
    'Tangalle',
    'Tissamaharama',
    'Kataragama',
    'Ambalantota',
    'Beliatta',
    'Okewela',
    'Sooriyawewa',
    'Walasmulla',
    'Weerakatiya',
    'Angunakolapelessa',
    'Lunugamvehera',
  ],

  // Northern Province
  Jaffna: [
    'Jaffna',
    'Chavakachcheri',
    'Point Pedro',
    'Karainagar',
    'Velanai',
    'Kayts',
    'Chankanai',
    'Delft',
    'Jaffna',
    'Nallur',
    'Sandilipay',
    'Tellippalai',
    'Uduvil',
  ],
  Kilinochchi: ['Kilinochchi', 'Paranthan', 'Poonakary', 'Pachchilaipalli', 'Kandavalai'],
  Mannar: ['Mannar', 'Nanattan', 'Pesalai', 'Madhu', 'Musali', 'Nanaddan'],
  Vavuniya: [
    'Vavuniya',
    'Nedunkeni',
    'Settikulam',
    'Vavuniya North',
    'Vavuniya South',
    'Vengalacheddikulam',
  ],
  Mullaitivu: [
    'Mullaitivu',
    'Oddusuddan',
    'Puthukudiyiruppu',
    'Manthai East',
    'Maritimepattu',
    'Thunukkai',
    'Welioya',
  ],

  // Eastern Province
  Batticaloa: [
    'Batticaloa',
    'Kattankudy',
    'Eravur',
    'Valaichchenai',
    'Chenkalady',
    'Kaluwanchikudy',
    'Koralai Pattu North',
    'Koralai Pattu South',
    'Manmunai North',
    'Manmunai South and Eruvilpattu',
    'Manmunai West',
    'Paddiruppu',
    'Porativu Pattu',
  ],
  Ampara: [
    'Ampara',
    'Kalmunai',
    'Akkaraipattu',
    'Sainthamaruthu',
    'Pottuvil',
    'Uhana',
    'Addalachchenai',
    'Alayadivembu',
    'Damana',
    'Dehiattakandiya',
    'Irakkamam',
    'Karativu',
    'Lahugala',
    'Mahaoya',
    'Navithanveli',
    'Ninthavur',
    'Padiyathalawa',
    'Sammanthurai',
    'Thirukkovil',
  ],
  Trincomalee: [
    'Trincomalee',
    'Kinniya',
    'Mutur',
    'Kantale',
    'Gomarankadawala',
    'Kuchchaveli',
    'Padavi Sri Pura',
    'Seruvila',
    'Thambalagamuwa',
    'Town and Gravets',
    'Verugal',
  ],

  // North Western Province
  Kurunegala: [
    'Kurunegala',
    'Kuliyapitiya',
    'Narammala',
    'Wariyapola',
    'Pannala',
    'Melsiripura',
    'Alawwa',
    'Ambanpola',
    'Bamunakotuwa',
    'Bingiriya',
    'Dambokka',
    'Daulagala',
    'Galgamuwa',
    'Giriulla',
    'Hettipola',
    'Ibbagamuwa',
    'Katugampola',
    'Kobeigane',
    'Kotavehera',
    'Kuliyapitiya',
    'Maho',
    'Mawathagama',
    'Nikaweratiya',
    'Panduwasnuwara',
    'Polgahawela',
    'Polpithigama',
    'Rasnayakapura',
    'Rideegama',
    'Udubaddawa',
    'Weerambugedara',
    'Yapahuwa',
  ],
  Puttalam: [
    'Puttalam',
    'Chilaw',
    'Wennappuwa',
    'Nattandiya',
    'Marawila',
    'Dankotuwa',
    'Anamaduwa',
    'Arachchikattuwa',
    'Kalpitiya',
    'Karukupone',
    'Mahawewa',
    'Mundel',
    'Nawagattegama',
    'Pallama',
    'Puttalam',
  ],

  // North Central Province
  Anuradhapura: [
    'Anuradhapura',
    'Kekirawa',
    'Thambuttegama',
    'Eppawala',
    'Medawachchiya',
    'Galenbindunuwewa',
    'Galnewa',
    'Horowpothana',
    'Ipalogama',
    'Kahatagasdigiliya',
    'Kebithigollewa',
    'Mahawilachchiya',
    'Mihintale',
    'Nachchaduwa',
    'Nuwaragam Palatha Central',
    'Nuwaragam Palatha East',
    'Padaviya',
    'Palugaswewa',
    'Palagala',
    'Rajanganaya',
    'Rambewa',
    'Talawa',
  ],
  Polonnaruwa: [
    'Polonnaruwa',
    'Kaduruwela',
    'Hingurakgoda',
    'Dimbulagala',
    'Elahera',
    'Lankapura',
    'Medirigiriya',
    'Thamankaduwa',
    'Welikanda',
  ],

  // Uva Province
  Badulla: [
    'Badulla',
    'Bandarawela',
    'Ella',
    'Haputale',
    'Welimada',
    'Mahiyanganaya',
    'Passara',
    'Diyatalawa',
    'Girandurukotte',
    'Haldummulla',
    'Hali-Ela',
    'Kandaketiya',
    'Lunugala',
    'Meegahakivula',
    'Rideemaliyadda',
    'Soranathota',
    'Uva Paranagama',
  ],
  Monaragala: [
    'Monaragala',
    'Wellawaya',
    'Buttala',
    'Medagama',
    'Badalkumbura',
    'Bibila',
    'Bibile',
    'Katharagama',
    'Madulla',
    'Medagama',
    'Moneragala',
    'Sevanagala',
    'Siyambalanduwa',
    'Thanamalwila',
    'Wellawaya',
  ],

  // Sabaragamuwa Province
  Ratnapura: [
    'Ratnapura',
    'Embilipitiya',
    'Balangoda',
    'Pelmadulla',
    'Kuruwita',
    'Eheliyagoda',
    'Ayagama',
    'Godakawela',
    'Imbulpe',
    'Kahawatta',
    'Kalawana',
    'Kiriella',
    'Kolonne',
    'Nivitigala',
    'Opanayaka',
    'Palmadulla',
    'Rakwana',
    'Weligepola',
  ],
  Kegalle: [
    'Kegalle',
    'Mawanella',
    'Warakapola',
    'Rambukkana',
    'Galigamuwa',
    'Yatiyantota',
    'Aranayaka',
    'Bulathkohupitiya',
    'Dehiowita',
    'Deraniyagala',
    'Ruwanwella',
  ],
} as const

// Flatten all cities
export const allCities = Object.values(citiesByDistrict).flat()

// Get province for a district
export const getProvinceForDistrict = (district: string): string => {
  for (const [province, districts] of Object.entries(districtsByProvince)) {
    if (districts.some((d) => d === district)) {
      return province
    }
  }
  return 'Unknown'
}

// Get district for a city
export const getDistrictForCity = (city: string): string => {
  for (const [district, cities] of Object.entries(citiesByDistrict)) {
    if (cities.some((c) => c === city)) {
      return district
    }
  }
  return 'Unknown'
}

// Get complete location data for a city
export const getLocationData = (city: string): LocationData => {
  const district = getDistrictForCity(city)
  const province = getProvinceForDistrict(district)
  return { city, district, province }
}

// Search locations by query
export const searchLocations = (query: string): LocationData[] => {
  const lowercaseQuery = query.toLowerCase()
  const results: LocationData[] = []

  // Search cities
  for (const city of allCities) {
    if (city.toLowerCase().includes(lowercaseQuery)) {
      results.push(getLocationData(city))
    }
  }

  // Search districts
  for (const district of districts) {
    if (district.toLowerCase().includes(lowercaseQuery)) {
      // Add all cities in this district
      const cities = citiesByDistrict[district as keyof typeof citiesByDistrict] || []
      for (const city of cities) {
        if (!results.some((r) => r.city === city)) {
          results.push(getLocationData(city))
        }
      }
    }
  }

  return results.slice(0, 20) // Limit results
}
