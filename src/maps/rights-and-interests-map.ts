import type { LonLat, MapDefinition } from "./basic-map.js"

const titleExtent: LonLat[] = [
  [-2.2307, 51.4935],
  [-2.2304, 51.4939],
  [-2.2296, 51.49385],
  [-2.22885, 51.49388],
  [-2.2288, 51.49345],
  [-2.22955, 51.49342],
  [-2.23035, 51.4932]
]

const publicFootpath: LonLat[] = [
  [-2.2284, 51.4945],
  [-2.2283, 51.494],
  [-2.2282, 51.4936],
  [-2.2281, 51.4931],
  [-2.228, 51.4926]
]

const privateRightOfWay: LonLat[] = [
  [-2.22885, 51.49365],
  [-2.2296, 51.49362],
  [-2.2304, 51.49358]
]

const drainageEasement: LonLat[] = [
  [-2.2304, 51.4939],
  [-2.2296, 51.49385],
  [-2.22885, 51.49388]
]

export const rightsAndInterestsMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Registered title at Weavers Cottage, Castle Combe, showing the title extent, a private right of way, a drainage easement and the adjoining public footpath",
  behaviour: "inline",
  zoom: 18,
  center: [-2.2294, 51.49355],
  bounds: [-2.2322, 51.4923, -2.2266, 51.495],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [
    {
      id: "weavers-cottage",
      coordinates: [-2.2292, 51.49366],
      color: "#d4351c",
      label: "Weavers Cottage",
      showLabel: true
    }
  ],
  lines: [
    {
      id: "public-footpath",
      coordinates: publicFootpath,
      color: "#00703c",
      width: 4
    },
    {
      id: "private-right-of-way",
      coordinates: privateRightOfWay,
      color: "#f47738",
      width: 5
    },
    {
      id: "drainage-easement",
      coordinates: drainageEasement,
      color: "#1d70b8",
      width: 4
    }
  ],
  polygons: [
    {
      id: "title-extent",
      coordinates: titleExtent,
      fillColor: "#d4351c66",
      strokeColor: "#d4351c",
      strokeWidth: 3
    }
  ],
  rightsAndInterests: {
    bannerTitle: "Example title",
    headline: "This map shows the land in example title WT345678, and the rights that affect it.",
    summary:
      "The red outline is the registered extent of Weavers Cottage, the garden and the paddock. The orange line is a private right of way. The blue line is a drainage easement. The green line is a public footpath beside the title, not land in this title.",
    status: "Registered",
    titleNumber: "WT345678",
    propertyAddress: "Weavers Cottage, The Street, Castle Combe, Chippenham, SN14 7HU",
    tenure: "Freehold",
    classOfTitle: "Absolute",
    proprietor: "A and B Example (example proprietors)",
    firstRegistered: "4 June 1987",
    lastUpdated: "18 January 2025",
    administrativeArea: "Wiltshire",
    area: "About 0.12 hectares (cottage, garden and paddock)",
    key: [
      {
        label: "Red area with a red outline",
        description:
          "The registered title extent. This is the land in title WT345678: Weavers Cottage, the garden behind it, and the paddock to the west."
      },
      {
        label: "Orange line",
        description:
          "A private right of way. It runs from The Street, through the garden gate, to the paddock. The neighbouring cottage also has the benefit of this right."
      },
      {
        label: "Blue line",
        description:
          "A drainage easement along the north garden wall, in favour of Wessex Water. The proprietor must allow access to inspect and maintain the pipe."
      },
      {
        label: "Green line",
        description:
          "Public footpath CASTLE COMBE 12, part of the Macmillan Way. It follows the Bybrook on the east side of The Street. It is not land in this title."
      },
      {
        label: "Pin labelled Weavers Cottage",
        description:
          "The cottage building, on the east side of the title, facing The Street."
      }
    ],
    locations: [
      "Weavers Cottage stands on the west side of The Street, in the centre of Castle Combe, about 80 metres south of St Andrew’s Church.",
      "The red area covers the cottage, a long garden, and a small paddock behind the garden wall to the west.",
      "The orange line is the access from The Street to the paddock. It is a private right, not a public path.",
      "The blue line follows the north wall of the garden, from the paddock to The Street.",
      "The green line is the public footpath along the Bybrook, on the opposite side of The Street from the cottage.",
      "The Market Cross is about 40 metres south along The Street, outside this title."
    ],
    extentDescription: [
      "The red area is the land registered under title WT345678. It is a general boundary: it shows which land the title relates to, not the millimetre line of every wall.",
      "The east edge is the cottage front and the garden gate on The Street.",
      "The west edge is the paddock wall. Fields beyond that wall are a separate title.",
      "The north edge is the garden wall, where the drainage easement runs.",
      "The south edge adjoins the garden of the neighbouring cottage. That neighbour has the benefit of the orange right of way."
    ],
    interests: [
      {
        name: "Right of way to the paddock",
        type: "Private right of way",
        where: "From the gate on The Street, through the garden, to the paddock",
        beneficiary: "This title, and the neighbouring cottage to the south",
        details:
          "A right of way at all times, with or without vehicles, over the access marked in orange. The neighbouring cottage has the same right. It is not a public footpath."
      },
      {
        name: "Drainage easement",
        type: "Easement",
        where: "Along the north garden wall, from the paddock to The Street",
        beneficiary: "Wessex Water (example undertaker)",
        details:
          "A right to lay, inspect and maintain a drain. The proprietor must not build over the blue line without consent, and must allow access on reasonable notice."
      },
      {
        name: "Public footpath CASTLE COMBE 12",
        type: "Public right of way",
        where: "Along the Bybrook, on the east side of The Street, outside this title",
        beneficiary: "The public",
        details:
          "This path is recorded on the Wiltshire definitive map. It does not cross the red title land. It is shown because people using the cottage need to know it runs immediately opposite."
      }
    ],
    included: [
      "Weavers Cottage, including the front rooms facing The Street",
      "The garden behind the cottage",
      "The paddock west of the garden wall",
      "The private right of way marked in orange",
      "Garden walls, the street gate and the paddock gate that stand inside the red line"
    ],
    excluded: [
      "The Street, which is a public highway",
      "Public footpath CASTLE COMBE 12 and the Bybrook, east of The Street",
      "The neighbouring cottage to the south, which has its own title",
      "Fields west of the paddock wall",
      "St Andrew’s Church and the Market Cross"
    ],
    contacts: [
      {
        name: "Customer service",
        role: "Title information",
        organisation: "HM Land Registry",
        email: "title.information@example.com",
        phone: "020 7946 0420",
        hours: "Monday to Friday, 8am to 6pm (except public holidays)"
      },
      {
        name: "Customer support",
        role: "Official copies and title plans",
        organisation: "HM Land Registry",
        email: "official.copies@example.com",
        phone: "020 7946 0421",
        hours:
          "Monday to Friday, 9am to 5pm. Ask for an official copy of the register and title plan for WT345678."
      },
      {
        name: "Rights of way",
        role: "Public footpaths",
        organisation: "Wiltshire Council",
        email: "rights.of.way@example.com",
        phone: "020 7946 0422",
        hours: "Monday to Friday, 9am to 5pm. Quote footpath CASTLE COMBE 12."
      }
    ]
  },
  staticImageSrc: "/images/rights-and-interests-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}

export const publicFootpathIds = ["public-footpath"] as const
export const privateRightOfWayIds = ["private-right-of-way"] as const
export const drainageEasementIds = ["drainage-easement"] as const
