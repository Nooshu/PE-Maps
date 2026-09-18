import type { LonLat, MapDefinition } from "./basic-map.js"

const titleExtent: LonLat[] = [
  [-0.15113, 51.50182],
  [-0.15007, 51.50224],
  [-0.14823, 51.50233],
  [-0.14299, 51.50213],
  [-0.14278, 51.50188],
  [-0.14252, 51.50164],
  [-0.14172, 51.50133],
  [-0.1413, 51.50055],
  [-0.14195, 51.50011],
  [-0.14247, 51.49982],
  [-0.14277, 51.49996],
  [-0.14306, 51.49946],
  [-0.14376, 51.49852],
  [-0.14411, 51.49823],
  [-0.14606, 51.49832],
  [-0.14685, 51.49833],
  [-0.1473, 51.49873],
  [-0.14844, 51.49996],
  [-0.15006, 51.501],
  [-0.15113, 51.50182]
]

export const titleExtentMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Registered title extent for Buckingham Palace, showing the palace buildings and private gardens edged in red",
  behaviour: "inline",
  zoom: 15,
  center: [-0.146, 51.5008],
  bounds: [-0.1525, 51.4974, -0.1395, 51.5034],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [
    {
      id: "buckingham-palace",
      coordinates: [-0.14189, 51.50136],
      color: "#d4351c",
      label: "Buckingham Palace",
      showLabel: true
    }
  ],
  lines: [],
  polygons: [
    {
      id: "title-extent",
      coordinates: titleExtent,
      fillColor: "#d4351c66",
      strokeColor: "#d4351c",
      strokeWidth: 3
    }
  ],
  registeredTitle: {
    bannerTitle: "Example title",
    headline: "This map shows the land in example title NGL815204, Buckingham Palace.",
    summary:
      "The red outline is the registered extent: the palace buildings, the east forecourt and the private gardens. It is not an official copy of the title plan. HM Land Registry title plans use a red edging to show the same kind of boundary.",
    status: "Registered",
    titleNumber: "NGL815204",
    propertyAddress: "Buckingham Palace, London, SW1A 1AA",
    tenure: "Freehold",
    classOfTitle: "Absolute",
    proprietor: "The Crown (example proprietor)",
    firstRegistered: "13 October 2003",
    lastUpdated: "2 April 2024",
    administrativeArea: "City of Westminster, Greater London",
    area: "About 17 hectares (the palace buildings, east forecourt and private gardens)",
    key: [
      {
        label: "Red area with a red outline",
        description:
          "The registered title extent. This is the land in title NGL815204: Buckingham Palace, the east forecourt facing The Mall, and the private gardens to the west."
      },
      {
        label: "Pin labelled Buckingham Palace",
        description:
          "The main palace building, on the east side of the title, facing The Mall and St James’s Park. The pin is labelled on the interactive map."
      }
    ],
    extentDescription: [
      "The red area is the land registered under title NGL815204. It covers Buckingham Palace and the private gardens behind it, on the west side of St James’s Park.",
      "The north edge follows Constitution Hill. Green Park lies on the far side of that road and is not in this title.",
      "The east edge is the palace façade and the gravel forecourt, where Changing the Guard takes place. The Mall and St James’s Park are immediately east, outside the red line.",
      "The south edge runs towards Buckingham Palace Road and Buckingham Gate. Victoria station is about 600 metres south, outside the title.",
      "The west edge follows the garden wall along Grosvenor Place. Belgravia is on the far side of that road and is not in this title.",
      "The gardens include lawn, woodland, a lake and the north-west tennis court. They are private and are not a public park.",
      "HM Land Registry title plans show this kind of land with a red edging. The boundary is a general boundary: it shows which land the title relates to, not the exact millimetre line of every wall or kerb."
    ],
    included: [
      "The palace building, including the east front, inner courtyards and service wings",
      "The east forecourt and the grand entrance facing The Mall",
      "The private gardens west of the palace, including the lake",
      "Internal palace roads and Ambassador’s Court",
      "Garden walls, gates and lodges that stand inside the red line"
    ],
    excluded: [
      "Constitution Hill, which is a public highway along the north side",
      "The Mall and St James’s Park, east of the forecourt",
      "Green Park, north of Constitution Hill",
      "Grosvenor Place and the properties in Belgravia to the west",
      "Buckingham Palace Road and Victoria station to the south",
      "The Queen Victoria Memorial and the public island in front of the east gates"
    ],
    surrounding: [
      {
        name: "Green Park",
        details:
          "Immediately north, across Constitution Hill. A Royal Park, not in this title. About 19 hectares of public parkland stretching to Piccadilly."
      },
      {
        name: "St James’s Park and The Mall",
        details:
          "Immediately east of the palace façade. The Mall is the ceremonial route to Trafalgar Square. The park is a Royal Park and is a separate title."
      },
      {
        name: "Grosvenor Place and Belgravia",
        details:
          "West of the garden wall. A trunk road (A302) with embassy and residential buildings. Those plots have their own registered titles."
      },
      {
        name: "Victoria and Buckingham Palace Road",
        details:
          "South of the title. Victoria station is about a 10-minute walk. Coach and bus stands on Buckingham Palace Road are outside the red line."
      },
      {
        name: "Hyde Park Corner and Wellington Arch",
        details:
          "About 400 metres north-west, where Constitution Hill meets Park Lane. Outside this title."
      }
    ],
    contacts: [
      {
        name: "Customer service",
        role: "Title information",
        organisation: "HM Land Registry",
        email: "title.information@example.com",
        phone: "020 7946 0400",
        hours: "Monday to Friday, 8am to 6pm (except public holidays)"
      },
      {
        name: "Customer support",
        role: "Official copies and title plans",
        organisation: "HM Land Registry",
        email: "official.copies@example.com",
        phone: "020 7946 0401",
        hours: "Monday to Friday, 9am to 5pm. Ask for an official copy of the register and title plan for NGL815204."
      },
      {
        name: "City of Westminster",
        role: "Local land charges and planning",
        organisation: "Westminster City Council",
        email: "land.charges@example.com",
        phone: "020 7946 0402",
        hours: "Monday to Friday, 9am to 5pm (except public holidays)"
      }
    ]
  },
  staticImageSrc: "/images/title-extent-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
