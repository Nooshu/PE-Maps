import type { LonLat, MapDefinition } from "./basic-map.js"

const changeArea: LonLat[] = [
  [-1.9105, 52.4792],
  [-1.9025, 52.4832],
  [-1.896, 52.484],
  [-1.8905, 52.4825],
  [-1.891, 52.478],
  [-1.8965, 52.4755],
  [-1.902, 52.4758],
  [-1.9105, 52.4772],
  [-1.9105, 52.4792]
]

const newStreet: LonLat[] = [
  [-1.89508, 52.47854],
  [-1.89689, 52.47887],
  [-1.89797, 52.47906],
  [-1.89942, 52.4792],
  [-1.90103, 52.47935],
  [-1.90243, 52.47942],
  [-1.90301, 52.47941]
]

const corporationStreet: LonLat[] = [
  [-1.89793, 52.47906],
  [-1.89712, 52.47983],
  [-1.89616, 52.48067],
  [-1.89567, 52.4811],
  [-1.89481, 52.48181],
  [-1.89371, 52.48283],
  [-1.89293, 52.4837],
  [-1.89242, 52.48446]
]

const colmoreRow: LonLat[] = [
  [-1.89729, 52.4827],
  [-1.89817, 52.48216],
  [-1.89929, 52.4816],
  [-1.90036, 52.48111],
  [-1.90112, 52.48077],
  [-1.9022, 52.48023]
]

const broadStreet: LonLat[] = [
  [-1.9062, 52.47865],
  [-1.9078, 52.47815],
  [-1.9095, 52.4775]
]

const bullStreet: LonLat[] = [
  [-1.89434, 52.48032],
  [-1.89499, 52.48073],
  [-1.89546, 52.48123],
  [-1.89596, 52.48173],
  [-1.89657, 52.48202]
]

const daleEnd: LonLat[] = [
  [-1.89418, 52.48031],
  [-1.89364, 52.48098],
  [-1.89304, 52.48156],
  [-1.89231, 52.48227],
  [-1.89157, 52.48286]
]

const smallbrookQueensway: LonLat[] = [
  [-1.8999, 52.47523],
  [-1.8985, 52.47571],
  [-1.89748, 52.47611],
  [-1.8968, 52.47639],
  [-1.89646, 52.47699]
]

const moorStreetQueensway: LonLat[] = [
  [-1.89332, 52.4785],
  [-1.89269, 52.47918],
  [-1.89231, 52.47996],
  [-1.89182, 52.48049],
  [-1.8912, 52.4812],
  [-1.89055, 52.4819]
]

const suffolkStreetQueensway: LonLat[] = [
  [-1.89988, 52.4723],
  [-1.89965, 52.47374],
  [-1.90019, 52.47455],
  [-1.90065, 52.47526],
  [-1.9014, 52.4765],
  [-1.9019, 52.4778],
  [-1.9017, 52.4792],
  [-1.9008, 52.481],
  [-1.8995, 52.4828],
  [-1.8982, 52.4845],
  [-1.897, 52.4858]
]

const stChadsQueensway: LonLat[] = [
  [-1.8992, 52.4854],
  [-1.89653, 52.48609],
  [-1.89437, 52.48602],
  [-1.8922, 52.4856]
]

const speedChangeLine = {
  color: "#f47738",
  width: 7
} as const

const strategicLine = {
  color: "#1d70b8",
  width: 6
} as const

export const speedChangeRoadIds = [
  "new-street",
  "corporation-street",
  "colmore-row",
  "broad-street",
  "bull-street",
  "dale-end",
  "smallbrook-queensway",
  "moor-street-queensway"
] as const

export const strategicRoadIds = ["suffolk-street-queensway", "st-chads-queensway"] as const

export const roadNetworkMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Proposed city centre 20 miles per hour zone in Birmingham, with roads where the speed limit is changing highlighted in orange and the A38 strategic routes in blue",
  behaviour: "inline",
  zoom: 14,
  center: [-1.9, 52.479],
  bounds: [-1.918, 52.472, -1.888, 52.488],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [],
  lines: [
    {
      id: "suffolk-street-queensway",
      coordinates: suffolkStreetQueensway,
      ...strategicLine
    },
    {
      id: "st-chads-queensway",
      coordinates: stChadsQueensway,
      ...strategicLine
    },
    { id: "new-street", coordinates: newStreet, ...speedChangeLine },
    { id: "corporation-street", coordinates: corporationStreet, ...speedChangeLine },
    { id: "colmore-row", coordinates: colmoreRow, ...speedChangeLine },
    { id: "broad-street", coordinates: broadStreet, ...speedChangeLine },
    { id: "bull-street", coordinates: bullStreet, ...speedChangeLine },
    { id: "dale-end", coordinates: daleEnd, ...speedChangeLine },
    { id: "smallbrook-queensway", coordinates: smallbrookQueensway, ...speedChangeLine },
    { id: "moor-street-queensway", coordinates: moorStreetQueensway, ...speedChangeLine }
  ],
  polygons: [
    {
      id: "change-area",
      coordinates: changeArea,
      fillColor: "#f4773866",
      strokeColor: "#f47738",
      strokeWidth: 2
    }
  ],
  roadNetworkScheme: {
    bannerTitle: "Speed limits changing",
    headline: "Birmingham City Council proposes a 20mph zone in the city centre from 6 April 2027.",
    summary:
      "Orange roads on the map would drop from 30mph to 20mph. Blue roads are the A38 strategic routes and would stay at 30mph. The shaded area is the proposed zone.",
    status: "Proposed",
    reference: "BCC/ETRO/2026/118",
    authority: "Birmingham City Council",
    schemeName: "City Centre Safer Speeds experimental traffic order",
    starts: "6 April 2027",
    experimentalUntil: "5 October 2028",
    decisionDate: "January 2029",
    key: [
      {
        label: "Orange shaded area with an orange outline",
        description:
          "The proposed 20mph zone covering central Birmingham, including New Street, Corporation Street, Broad Street, Colmore Row and the streets around the Bullring."
      },
      {
        label: "Orange line",
        description:
          "A road where the speed limit would change from 30mph to 20mph. These are the highlighted roads on both the interactive map and the static image."
      },
      {
        label: "Blue line",
        description:
          "A strategically important route on the A38 Queensway. The speed limit would stay at 30mph so through-traffic can still use the inner ring road."
      }
    ],
    locations: [
      "The shaded area is the city centre of Birmingham, around New Street station, the Bullring and Victoria Square.",
      "New Street runs east to west through the shopping core, from High Street towards Victoria Square.",
      "Corporation Street runs north-east from New Street towards Old Square and Aston.",
      "Colmore Row runs along the north side of the core, past the Town Hall and St Philip’s Cathedral.",
      "Broad Street is shown on the west side of the zone, from around Centenary Square. Only this city-centre length is in the order.",
      "Bull Street and Dale End sit east of Corporation Street, between the retail core and Moor Street Queensway.",
      "Smallbrook Queensway and Moor Street Queensway form the south and east edges of the zone, next to New Street station and the Bullring.",
      "The blue A38 Suffolk Street Queensway runs north–south on the west side of the zone. St Chads Queensway is the blue road on the north side. These are the strategic inner-ring routes and are not dropping to 20mph."
    ],
    speedChanges: [
      {
        name: "New Street",
        classification: "Local city-centre street",
        fromLimit: "30mph",
        toLimit: "20mph",
        starts: "6 April 2027"
      },
      {
        name: "Corporation Street",
        classification: "Local distributor",
        fromLimit: "30mph",
        toLimit: "20mph",
        starts: "6 April 2027"
      },
      {
        name: "Colmore Row",
        classification: "Local distributor",
        fromLimit: "30mph",
        toLimit: "20mph",
        starts: "6 April 2027"
      },
      {
        name: "Broad Street",
        classification: "Local distributor (A456 in part)",
        fromLimit: "30mph",
        toLimit: "20mph",
        starts: "6 April 2027"
      },
      {
        name: "Bull Street",
        classification: "Local street",
        fromLimit: "30mph",
        toLimit: "20mph",
        starts: "6 April 2027"
      },
      {
        name: "Dale End",
        classification: "Local street",
        fromLimit: "30mph",
        toLimit: "20mph",
        starts: "6 April 2027"
      },
      {
        name: "Smallbrook Queensway",
        classification: "City-centre distributor",
        fromLimit: "30mph",
        toLimit: "20mph",
        starts: "6 April 2027"
      },
      {
        name: "Moor Street Queensway",
        classification: "City-centre distributor",
        fromLimit: "30mph",
        toLimit: "20mph",
        starts: "6 April 2027"
      }
    ],
    unchangedRoads: [
      {
        name: "A38 Suffolk Street Queensway",
        classification: "Strategic A-road",
        limit: "30mph",
        note: "Stays at 30mph. Shown in blue on the west side of the zone."
      },
      {
        name: "A38 St Chads Queensway",
        classification: "Strategic A-road",
        limit: "30mph",
        note: "Stays at 30mph. Shown in blue on the north side of the inner ring."
      }
    ],
    strategicRoutes: [
      "A38 Suffolk Street Queensway remains 30mph. It is the strategic north–south route through the city centre and is shown in blue.",
      "A38 St Chads Queensway remains 30mph. It carries through-traffic on the north side of the inner ring and is shown in blue.",
      "These roads stay at 30mph so buses, coaches and through-traffic can still use the Queensway without entering the 20mph streets."
    ],
    contacts: [
      {
        name: "Amrit Kaur",
        role: "Traffic and road safety",
        organisation: "Birmingham City Council",
        email: "amrit.kaur@example.com",
        phone: "020 7946 0500",
        hours: "Monday to Friday, 9am to 5pm (except public holidays)"
      },
      {
        name: "Traffic orders team",
        role: "Comments on the experimental order",
        organisation: "Birmingham City Council",
        email: "traffic.orders@example.com",
        phone: "020 7946 0501",
        hours: "Monday to Friday, 9am to 5pm. Quote BCC/ETRO/2026/118."
      },
      {
        name: "Highways control room",
        role: "Faults, signs and temporary closures",
        organisation: "Birmingham City Council",
        email: "highways@example.com",
        phone: "020 7946 0502",
        hours: "24 hours a day for dangerous defects. Use the daytime number for this scheme."
      }
    ]
  },
  staticImageSrc: "/images/road-network-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
