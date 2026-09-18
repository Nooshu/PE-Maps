import type { LonLat, MapDefinition } from "./basic-map.js"

const fosseField: LonLat[] = [
  [-1.77991, 51.87866],
  [-1.77599, 51.87711],
  [-1.7756, 51.87729],
  [-1.77502, 51.87724],
  [-1.77443, 51.87725],
  [-1.77349, 51.87717],
  [-1.7721, 51.87674],
  [-1.77268, 51.87844],
  [-1.77336, 51.87929],
  [-1.77571, 51.88178],
  [-1.77783, 51.88033],
  [-1.77913, 51.87932]
]

const westPark: LonLat[] = [
  [-1.77916, 51.88886],
  [-1.77912, 51.88869],
  [-1.77817, 51.88827],
  [-1.77671, 51.88749],
  [-1.7757, 51.88709],
  [-1.77443, 51.88689],
  [-1.77344, 51.88693],
  [-1.7722, 51.88714],
  [-1.77222, 51.88724],
  [-1.7732, 51.88816],
  [-1.77434, 51.8883],
  [-1.77554, 51.88848],
  [-1.7772, 51.8887],
  [-1.7785, 51.88881]
]

const northField: LonLat[] = [
  [-1.77628, 51.89011],
  [-1.77504, 51.8936],
  [-1.77475, 51.89406],
  [-1.77347, 51.89507],
  [-1.77283, 51.89426],
  [-1.77226, 51.89357],
  [-1.7717, 51.89269],
  [-1.7703, 51.89059],
  [-1.77133, 51.89054],
  [-1.77164, 51.8906],
  [-1.77182, 51.89058],
  [-1.7722, 51.89047],
  [-1.77391, 51.89041],
  [-1.77396, 51.88979]
]

const lansdowneGround: LonLat[] = [
  [-1.77681, 51.89434],
  [-1.77729, 51.89348],
  [-1.77927, 51.89046],
  [-1.78013, 51.88923],
  [-1.7798, 51.88909],
  [-1.77954, 51.88907],
  [-1.77867, 51.88903],
  [-1.77819, 51.889],
  [-1.77724, 51.88893],
  [-1.77698, 51.88891],
  [-1.77628, 51.89011],
  [-1.77584, 51.89155],
  [-1.77492, 51.89379],
  [-1.77501, 51.89399]
]

const stationMeadow: LonLat[] = [
  [-1.76869, 51.88673],
  [-1.76744, 51.88658],
  [-1.76798, 51.88522],
  [-1.76861, 51.88526],
  [-1.76877, 51.88501],
  [-1.76919, 51.88429],
  [-1.77087, 51.88482],
  [-1.76999, 51.88574],
  [-1.77006, 51.88604],
  [-1.76954, 51.8864]
]

const salmonsburySssi: LonLat[] = [
  [-1.74009, 51.88635],
  [-1.7451, 51.88474],
  [-1.74759, 51.88398],
  [-1.74947, 51.88363],
  [-1.7503, 51.88533],
  [-1.75026, 51.88608],
  [-1.75027, 51.88646],
  [-1.75265, 51.88691],
  [-1.75151, 51.88851],
  [-1.75076, 51.88925],
  [-1.7488, 51.89088],
  [-1.74735, 51.89102],
  [-1.74584, 51.88961],
  [-1.74525, 51.88875],
  [-1.74483, 51.88751],
  [-1.74231, 51.88624]
]

const windrushBuffer: LonLat[] = [
  [-1.7785, 51.88755],
  [-1.7722, 51.88735],
  [-1.7682, 51.8872],
  [-1.7682, 51.88655],
  [-1.7723, 51.8867],
  [-1.7785, 51.88685]
]

const riverWindrush: LonLat[] = [
  [-1.77796, 51.8872],
  [-1.77715, 51.88689],
  [-1.77655, 51.88642],
  [-1.77549, 51.88631],
  [-1.77427, 51.88621],
  [-1.77357, 51.88632],
  [-1.77315, 51.88643],
  [-1.77233, 51.88671],
  [-1.77043, 51.88688],
  [-1.76827, 51.88686],
  [-1.76571, 51.8867],
  [-1.76335, 51.88627],
  [-1.75982, 51.88456],
  [-1.75741, 51.88393]
]

const eligibleFill = {
  fillColor: "#00703c66",
  strokeColor: "#00703c",
  strokeWidth: 3
} as const

export const eligibleParcelIds = [
  "fosse-field",
  "west-park",
  "north-field",
  "station-meadow"
] as const

export const notAvailableParcelIds = ["lansdowne-ground"] as const

export const designatedSiteIds = ["salmonsbury-sssi"] as const

export const watercourseBufferIds = ["windrush-buffer"] as const

export const countrysideSchemesMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Countryside scheme land around Bourton-on-the-Water. Green fields are available to select, the orange field is already in an agreement, the blue strip is the River Windrush 6 metre buffer, and the red hatched area east of the village is Salmonsbury Meadows SSSI",
  behaviour: "inline",
  zoom: 14,
  center: [-1.76, 51.886],
  bounds: [-1.783, 51.875, -1.737, 51.897],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [
    {
      id: "fosse-field",
      coordinates: [-1.7756, 51.8783],
      color: "#00703c",
      label: "SP1619 7702 Fosse Field",
      showLabel: true
    },
    {
      id: "west-park",
      coordinates: [-1.77572, 51.88795],
      color: "#00703c",
      label: "SP1620 3308 West Park",
      showLabel: true
    },
    {
      id: "north-field",
      coordinates: [-1.77298, 51.89194],
      color: "#00703c",
      label: "SP1621 4410 North Field",
      showLabel: true
    },
    {
      id: "lansdowne-ground",
      coordinates: [-1.7776, 51.89082],
      color: "#f47738",
      label: "SP1621 2287 Lansdowne Ground",
      showLabel: true
    },
    {
      id: "station-meadow",
      coordinates: [-1.76908, 51.88571],
      color: "#00703c",
      label: "SP1620 1194 Station Meadow",
      showLabel: true
    }
  ],
  lines: [
    {
      id: "river-windrush",
      coordinates: riverWindrush,
      color: "#1d70b8",
      width: 4
    }
  ],
  polygons: [
    {
      id: "salmonsbury-sssi",
      coordinates: salmonsburySssi,
      fillColor: "#d4351c66",
      strokeColor: "#d4351c",
      strokeWidth: 3
    },
    { id: "fosse-field", coordinates: fosseField, ...eligibleFill },
    { id: "west-park", coordinates: westPark, ...eligibleFill },
    { id: "north-field", coordinates: northField, ...eligibleFill },
    { id: "station-meadow", coordinates: stationMeadow, ...eligibleFill },
    {
      id: "lansdowne-ground",
      coordinates: lansdowneGround,
      fillColor: "#f4773866",
      strokeColor: "#f47738",
      strokeWidth: 3
    },
    {
      id: "windrush-buffer",
      coordinates: windrushBuffer,
      fillColor: "#1d70b866",
      strokeColor: "#1d70b8",
      strokeWidth: 2
    }
  ],
  countrysideScheme: {
    bannerTitle: "Land you can select",
    headline: "4 parcels at Manor Farm, Bourton-on-the-Water are available for Sustainable Farming Incentive 2026.",
    summary:
      "Green fields are available. The orange field is already in Countryside Stewardship until 30 September 2028. The blue strip is the 6 metre buffer along the River Windrush. The red area east of the village is Salmonsbury Meadows SSSI and is not on this holding.",
    status: "Available to apply",
    schemeName: "Sustainable Farming Incentive 2026",
    holdingName: "Manor Farm",
    sbi: "106 847 221",
    cph: "10/234/5678",
    location: "Manor Farm, Lansdowne, Bourton-on-the-Water, Gloucestershire, GL54 2AR",
    agreementYear: "2026",
    totalRegistered: "20.30 hectares",
    totalAvailable: "15.08 hectares",
    totalRestricted: "0.69 hectares",
    totalNotAvailable: "4.53 hectares",
    designatedNearby: "17.53 hectares (Salmonsbury Meadows SSSI)",
    key: [
      {
        label: "Green filled area with a green outline",
        description:
          "A land parcel that is available to select for this application. These are Fosse Field, West Park, North Field and Station Meadow, west and north of the village."
      },
      {
        label: "Orange filled area with an orange outline",
        description:
          "Lansdowne Ground. This parcel is already in a Countryside Stewardship agreement until 30 September 2028, so you cannot add it to a new SFI application yet."
      },
      {
        label: "Blue strip and blue line",
        description:
          "The River Windrush and a 6 metre buffer drawn along its north bank, next to West Park. You must keep this buffer. It is eligible for a watercourse action but not for arable actions."
      },
      {
        label: "Red hatched area with a red outline",
        description:
          "Salmonsbury Meadows Site of Special Scientific Interest, part of Greystones Farm nature reserve, immediately east of the village. It is not on this holding and you cannot claim on it."
      }
    ],
    locations: [
      "The village of Bourton-on-the-Water sits in the middle of the map, where the River Windrush runs through the High Street.",
      "Fosse Field is the large green field south-west of the village, between the A429 Fosse Way and the lane towards Clapton-on-the-Hill.",
      "West Park is the green grassland immediately west of the village, north of the river, towards the Fosse Way.",
      "North Field is the green grassland north of West Park, on the north side of the village towards Lower Slaughter.",
      "Lansdowne Ground is the orange field west of North Field. It shares a boundary with West Park.",
      "Station Meadow is the smaller green field on the west edge of the village, south of the river and west of the railway / station approach.",
      "The blue line is the River Windrush. The blue strip along West Park is the 6 metre watercourse buffer you must keep.",
      "The red area east of the village is Salmonsbury Meadows SSSI on Greystones Farm, between the village and the River Dikler. The River Eye runs through those meadows. This land is not on Manor Farm."
    ],
    parcels: [
      {
        id: "fosse-field",
        reference: "SP1619 7702",
        name: "Fosse Field",
        landCover: "Arable",
        location: "South-west of the village, next to the A429 Fosse Way",
        totalArea: "6.43 ha",
        eligibleArea: "6.43 ha",
        status: "Available",
        notes: "You can select the whole parcel for arable SFI actions."
      },
      {
        id: "west-park",
        reference: "SP1620 3308",
        name: "West Park",
        landCover: "Permanent grassland",
        location: "West of the village, north of the River Windrush",
        totalArea: "2.35 ha",
        eligibleArea: "2.12 ha",
        status: "Available, with buffer",
        notes:
          "0.23 hectares along the river is in the 6 metre watercourse buffer. You can select the rest for grassland actions."
      },
      {
        id: "north-field",
        reference: "SP1621 4410",
        name: "North Field",
        landCover: "Permanent grassland",
        location: "North of the village, towards Lower Slaughter",
        totalArea: "5.55 ha",
        eligibleArea: "5.55 ha",
        status: "Available",
        notes: "You can select the whole parcel for grassland SFI actions."
      },
      {
        id: "lansdowne-ground",
        reference: "SP1621 2287",
        name: "Lansdowne Ground",
        landCover: "Arable",
        location: "North-west of the village, west of North Field",
        totalArea: "4.53 ha",
        eligibleArea: "0 ha",
        status: "Not available",
        notes: "Already in Countryside Stewardship Mid Tier until 30 September 2028."
      },
      {
        id: "station-meadow",
        reference: "SP1620 1194",
        name: "Station Meadow",
        landCover: "Permanent grassland",
        location: "West edge of the village, south of the River Windrush",
        totalArea: "1.44 ha",
        eligibleArea: "0.98 ha",
        status: "Available, with buffer",
        notes:
          "0.46 hectares next to the river is in the 6 metre watercourse buffer. You can select 0.98 hectares for grassland actions."
      }
    ],
    requirements: [
      "The land must be registered to this holding on the Rural Land Register.",
      "Each parcel you select must be at least 0.10 hectares.",
      "SFI actions must match the land cover. Use arable actions only on Fosse Field. Use grassland actions on West Park, North Field and Station Meadow.",
      "Keep a 6 metre buffer from the River Windrush. That strip is eligible for a watercourse action, not for arable cropping.",
      "Do not include land in a Site of Special Scientific Interest unless Natural England has given consent. Salmonsbury Meadows, east of the village, is an SSSI and is not on this holding.",
      "Do not include land that is already in another agri-environment agreement. Lansdowne Ground is in Countryside Stewardship until 30 September 2028.",
      "Village, garden and hardstanding around Bourton-on-the-Water High Street is not agricultural land and is not on the register."
    ],
    howToSelect: [
      "Select every parcel marked Available: SP1619 7702 Fosse Field, SP1620 3308 West Park, SP1621 4410 North Field and SP1620 1194 Station Meadow.",
      "On West Park, select 2.12 hectares and leave the 0.23 hectare river buffer for a watercourse action or unclaimed.",
      "On Station Meadow, select 0.98 hectares and leave the 0.46 hectare river buffer for a watercourse action or unclaimed.",
      "Do not select SP1621 2287 Lansdowne Ground. It is orange on the map because it is already in Countryside Stewardship.",
      "Do not select the red SSSI east of the village. It belongs to Greystones Farm nature reserve, not to Manor Farm.",
      "The largest available area you can enter on this application is 15.08 hectares."
    ],
    ineligibleNearby: [
      "Salmonsbury Meadows SSSI is 17.53 hectares of unimproved grassland immediately east of Bourton-on-the-Water. It was notified in 1985.",
      "It is part of Gloucestershire Wildlife Trust’s Greystones Farm nature reserve, between the village and the River Dikler. The River Eye runs through the meadows.",
      "The site is also a scheduled monument at Salmonsbury Camp. You cannot enter this land on an SFI application for Manor Farm.",
      "If you manage SSSI land on another holding, you need Natural England’s consent before you apply for a countryside scheme on that land."
    ],
    contacts: [
      {
        name: "Rural Payments helpline",
        role: "Sustainable Farming Incentive applications",
        organisation: "Rural Payments Agency",
        email: "ruralpayments@example.com",
        phone: "020 7946 0600",
        hours: "Monday to Friday, 8:30am to 5pm. Quote SBI 106 847 221."
      },
      {
        name: "Protected sites team",
        role: "SSSI consent",
        organisation: "Natural England",
        email: "sssi.consent@example.com",
        phone: "020 7946 0601",
        hours: "Monday to Friday, 9am to 5pm. Quote Salmonsbury Meadows SSSI."
      },
      {
        name: "Cotswold catchment officer",
        role: "Watercourse buffers and Countryside Stewardship",
        organisation: "Rural Payments Agency",
        email: "cotswold.catchment@example.com",
        phone: "020 7946 0602",
        hours: "Monday to Friday, 9am to 5pm"
      }
    ]
  },
  staticImageSrc: "/images/countryside-schemes-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
