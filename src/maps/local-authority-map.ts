import type { LonLat, MapDefinition } from "./basic-map.js"

const authorityBoundary: LonLat[] = [
  [-2.598, 51.511],
  [-2.59, 51.5102],
  [-2.585, 51.5088],
  [-2.58, 51.5075],
  [-2.5755, 51.5078],
  [-2.57, 51.5085],
  [-2.564, 51.5092],
  [-2.558, 51.508],
  [-2.55, 51.5065],
  [-2.542, 51.507]
]

const southGloucestershire: LonLat[] = [
  ...authorityBoundary,
  [-2.542, 51.522],
  [-2.598, 51.522]
]

const bristol: LonLat[] = [
  [-2.598, 51.49],
  [-2.542, 51.49],
  ...[...authorityBoundary].reverse()
]

export const localAuthorityMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Local authority boundary at Filton Avenue, showing South Gloucestershire to the north, Bristol to the south, and a property in Filton",
  behaviour: "inline",
  zoom: 14,
  center: [-2.573, 51.508],
  bounds: [-2.602, 51.488, -2.536, 51.524],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [
    {
      id: "property",
      coordinates: [-2.5735, 51.5095],
      color: "#0b0c0c",
      label: "400 Filton Avenue",
      showLabel: true
    }
  ],
  lines: [
    {
      id: "authority-boundary",
      coordinates: authorityBoundary,
      color: "#0b0c0c",
      width: 4
    }
  ],
  polygons: [
    {
      id: "south-gloucestershire",
      coordinates: southGloucestershire,
      fillColor: "#1d70b866",
      strokeColor: "#1d70b8",
      strokeWidth: 2
    },
    {
      id: "bristol",
      coordinates: bristol,
      fillColor: "#f4773866",
      strokeColor: "#f47738",
      strokeWidth: 2
    }
  ],
  localAuthorityLookup: {
    bannerTitle: "Example property",
    headline: "This property is in South Gloucestershire, not Bristol.",
    summary:
      "400 Filton Avenue is about 80 metres north of the boundary. South Gloucestershire Council is responsible for planning, bins, council tax and most other local services here. Bristol City Council starts on the south side of Filton Avenue.",
    status: "South Gloucestershire",
    propertyAddress: "400 Filton Avenue, Filton, Bristol, BS34 7LE",
    uprn: "000000318412",
    postcode: "BS34 7LE",
    responsibleAuthority: "South Gloucestershire Council",
    authorityType: "Unitary authority",
    neighbouringAuthority: "Bristol City Council",
    distanceToBoundary: "About 80 metres south, where Filton Avenue crosses into Bristol",
    key: [
      {
        label: "Blue area with a blue outline",
        description:
          "South Gloucestershire. This is the local authority for 400 Filton Avenue. It covers Filton, Patchway, Bradley Stoke and land north of the black boundary line."
      },
      {
        label: "Orange area with an orange outline",
        description:
          "Bristol City Council. This is the neighbouring authority. It covers Horfield, Lockleaze and land south of the black boundary line."
      },
      {
        label: "Black line",
        description:
          "The boundary between South Gloucestershire and Bristol. It crosses Filton Avenue west of this property, then continues towards the M32."
      },
      {
        label: "Pin labelled 400 Filton Avenue",
        description:
          "The property this search is for. It stands on the north side of Filton Avenue, inside South Gloucestershire."
      }
    ],
    locations: [
      "The property is on the north side of Filton Avenue, Filton, postcode BS34 7LE.",
      "Filton village and Filton Abbey Wood station are north of the property, in South Gloucestershire.",
      "The black line is the local authority boundary. It crosses Filton Avenue about 80 metres south-west of number 400.",
      "South of the line, Filton Avenue continues into Horfield. Those addresses have a BS7 postcode and are in Bristol.",
      "The A38 Gloucester Road is west of the property. North of the boundary it is in Filton. South of the boundary it is in Horfield.",
      "Lockleaze and the M32 are east of the property, in Bristol. UWE Frenchay campus is north-east, in South Gloucestershire."
    ],
    services: [
      {
        name: "Planning",
        details:
          "South Gloucestershire Council is the local planning authority. Do not send a planning application to Bristol City Council for this address."
      },
      {
        name: "Bins and recycling",
        details:
          "South Gloucestershire Council collects household waste from this property. Collection days and which bin to use are different from Bristol."
      },
      {
        name: "Council tax",
        details:
          "Council tax is paid to South Gloucestershire Council. The parish is Filton."
      },
      {
        name: "Schools",
        details:
          "School admissions for this address are handled by South Gloucestershire Council. Catchment areas stop at the black line on this map."
      },
      {
        name: "Highways and street lighting",
        details:
          "South Gloucestershire Council is the highway authority for Filton Avenue on this side of the boundary. Bristol City Council is the highway authority south of the line."
      }
    ],
    whatChanges: [
      "If you cross the black line heading south-west along Filton Avenue, you enter Bristol. House numbers on that stretch use a BS7 postcode.",
      "Planning policies, the local plan and who decides applications all change at the boundary.",
      "Bin collection days, bulky waste rules and recycling boxes are different in Bristol.",
      "You would pay council tax to Bristol City Council instead of South Gloucestershire Council.",
      "Both councils are unitary authorities. There is no county council sitting above either of them."
    ],
    contacts: [
      {
        name: "Customer service",
        role: "Which authority covers this property",
        organisation: "South Gloucestershire Council",
        email: "local.authority@example.com",
        phone: "020 7946 0410",
        hours: "Monday to Friday, 9am to 5pm (except public holidays)"
      },
      {
        name: "Development management",
        role: "Planning applications",
        organisation: "South Gloucestershire Council",
        email: "planning@example.com",
        phone: "020 7946 0411",
        hours: "Monday to Friday, 9am to 5pm. Quote 400 Filton Avenue, Filton."
      },
      {
        name: "Customer service",
        role: "If you need Bristol City Council instead",
        organisation: "Bristol City Council",
        email: "bristol.services@example.com",
        phone: "020 7946 0412",
        hours: "Monday to Friday, 9am to 5pm. Use this only for addresses south of the boundary."
      }
    ]
  },
  staticImageSrc: "/images/local-authority-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
