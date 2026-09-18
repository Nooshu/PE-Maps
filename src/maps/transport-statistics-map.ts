import type { LonLat, MapDefinition } from "./basic-map.js"

const wolverhampton: LonLat[] = [
  [-2.22, 52.62],
  [-2.08, 52.62],
  [-2.06, 52.56],
  [-2.12, 52.54],
  [-2.22, 52.55]
]

const walsall: LonLat[] = [
  [-2.08, 52.62],
  [-1.9, 52.64],
  [-1.88, 52.57],
  [-1.98, 52.55],
  [-2.06, 52.56]
]

const sandwell: LonLat[] = [
  [-2.12, 52.54],
  [-2.06, 52.56],
  [-1.98, 52.55],
  [-1.96, 52.5],
  [-2.02, 52.47],
  [-2.1, 52.48]
]

const dudley: LonLat[] = [
  [-2.22, 52.55],
  [-2.12, 52.54],
  [-2.1, 52.48],
  [-2.02, 52.47],
  [-2.05, 52.42],
  [-2.18, 52.43]
]

const birmingham: LonLat[] = [
  [-1.98, 52.55],
  [-1.88, 52.57],
  [-1.78, 52.56],
  [-1.74, 52.5],
  [-1.78, 52.4],
  [-1.93, 52.39],
  [-2.02, 52.42],
  [-2.02, 52.47],
  [-1.96, 52.5]
]

const solihull: LonLat[] = [
  [-1.78, 52.45],
  [-1.74, 52.5],
  [-1.68, 52.48],
  [-1.6, 52.42],
  [-1.68, 52.37],
  [-1.82, 52.38],
  [-1.78, 52.4]
]

const coventry: LonLat[] = [
  [-1.58, 52.45],
  [-1.46, 52.45],
  [-1.42, 52.4],
  [-1.48, 52.36],
  [-1.58, 52.38]
]

export const veryHighBusUseIds = ["birmingham"] as const
export const highBusUseIds = ["sandwell", "wolverhampton"] as const
export const mediumBusUseIds = ["walsall", "dudley", "coventry"] as const
export const lowBusUseIds = ["solihull"] as const

export const transportStatisticsMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Bus journeys per person in 2024 for the 7 West Midlands metropolitan boroughs, shaded from light blue to dark blue",
  behaviour: "inline",
  zoom: 9,
  center: [-1.9, 52.49],
  bounds: [-2.28, 52.34, -1.38, 52.66],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [],
  lines: [],
  polygons: [
    {
      id: "wolverhampton",
      coordinates: wolverhampton,
      fillColor: "#1d70b8cc",
      strokeColor: "#003078",
      strokeWidth: 2
    },
    {
      id: "walsall",
      coordinates: walsall,
      fillColor: "#5694cacc",
      strokeColor: "#003078",
      strokeWidth: 2
    },
    {
      id: "sandwell",
      coordinates: sandwell,
      fillColor: "#1d70b8cc",
      strokeColor: "#003078",
      strokeWidth: 2
    },
    {
      id: "dudley",
      coordinates: dudley,
      fillColor: "#5694cacc",
      strokeColor: "#003078",
      strokeWidth: 2
    },
    {
      id: "birmingham",
      coordinates: birmingham,
      fillColor: "#003078cc",
      strokeColor: "#003078",
      strokeWidth: 2
    },
    {
      id: "solihull",
      coordinates: solihull,
      fillColor: "#b3d7f6cc",
      strokeColor: "#003078",
      strokeWidth: 2
    },
    {
      id: "coventry",
      coordinates: coventry,
      fillColor: "#5694cacc",
      strokeColor: "#003078",
      strokeWidth: 2
    }
  ],
  transportStatistics: {
    bannerTitle: "Example statistics",
    headline: "Bus use is highest in Birmingham and lowest in Solihull.",
    summary:
      "The map shades each West Midlands metropolitan borough by bus journeys per person in 2024. Darker blue means more journeys. These are example figures, not official Department for Transport statistics.",
    status: "Example data",
    statisticName: "Bus passenger journeys per person",
    period: "April 2023 to March 2024",
    geography: "West Midlands metropolitan boroughs",
    unit: "Journeys per person per year",
    average: "43",
    key: [
      {
        label: "Darkest blue",
        description:
          "60 or more journeys per person. Only Birmingham is in this band, at 68."
      },
      {
        label: "Dark blue",
        description:
          "45 to 59 journeys per person. Sandwell (54) and Wolverhampton (49) are in this band."
      },
      {
        label: "Mid blue",
        description:
          "30 to 44 journeys per person. Walsall (41), Dudley (36) and Coventry (33) are in this band."
      },
      {
        label: "Light blue",
        description:
          "Fewer than 30 journeys per person. Only Solihull is in this band, at 22."
      }
    ],
    locations: [
      "The 7 shaded areas are the metropolitan boroughs that make up the West Midlands Combined Authority area.",
      "Birmingham is the large central area. It has the highest bus use.",
      "Sandwell sits west of Birmingham, around West Bromwich and Smethwick.",
      "Wolverhampton is the north-west borough. Walsall is immediately east of it.",
      "Dudley is the south-west borough, around Dudley, Stourbridge and Halesowen.",
      "Solihull is south-east of Birmingham. It has the lowest bus use.",
      "Coventry is the separate shaded area further east, beyond the Meriden gap."
    ],
    authorities: [
      {
        id: "birmingham",
        name: "Birmingham",
        value: 68,
        valueLabel: "68",
        band: "60 or more",
        comparedWithAverage: "25 more than the average"
      },
      {
        id: "sandwell",
        name: "Sandwell",
        value: 54,
        valueLabel: "54",
        band: "45 to 59",
        comparedWithAverage: "11 more than the average"
      },
      {
        id: "wolverhampton",
        name: "Wolverhampton",
        value: 49,
        valueLabel: "49",
        band: "45 to 59",
        comparedWithAverage: "6 more than the average"
      },
      {
        id: "walsall",
        name: "Walsall",
        value: 41,
        valueLabel: "41",
        band: "30 to 44",
        comparedWithAverage: "2 fewer than the average"
      },
      {
        id: "dudley",
        name: "Dudley",
        value: 36,
        valueLabel: "36",
        band: "30 to 44",
        comparedWithAverage: "7 fewer than the average"
      },
      {
        id: "coventry",
        name: "Coventry",
        value: 33,
        valueLabel: "33",
        band: "30 to 44",
        comparedWithAverage: "10 fewer than the average"
      },
      {
        id: "solihull",
        name: "Solihull",
        value: 22,
        valueLabel: "22",
        band: "Fewer than 30",
        comparedWithAverage: "21 fewer than the average"
      }
    ],
    aboutTheData: [
      "The figures are example data for this page. They are not a Department for Transport release.",
      "In a live service this would be bus passenger journeys divided by resident population, for the financial year.",
      "The West Midlands average on this page is 43 journeys per person. That is the unweighted mean of the 7 boroughs.",
      "Colour shows the band, not the exact figure. Use the table for the number of journeys in each borough.",
      "Coventry is shown separately because it does not share a boundary with the other 6 boroughs."
    ],
    contacts: [
      {
        name: "Bus statistics",
        role: "Local bus passenger journeys",
        organisation: "Department for Transport",
        email: "bus.statistics@example.com",
        phone: "020 7946 0440",
        hours: "Monday to Friday, 9am to 5pm (except public holidays)"
      },
      {
        name: "Transport data",
        role: "West Midlands bus data",
        organisation: "Transport for West Midlands",
        email: "tfwm.data@example.com",
        phone: "020 7946 0441",
        hours: "Monday to Friday, 9am to 5pm"
      },
      {
        name: "Statistics enquiries",
        role: "How the figures are collected",
        organisation: "Department for Transport",
        email: "statistics.enquiries@example.com",
        phone: "020 7946 0442",
        hours: "Monday to Friday, 9am to 5pm"
      }
    ]
  },
  staticImageSrc: "/images/transport-statistics-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
