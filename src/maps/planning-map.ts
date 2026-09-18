import type { LonLat, MapDefinition } from "./basic-map.js"

const developmentSite: LonLat[] = [
  [0.01057, 50.8759],
  [0.01078, 50.87571],
  [0.01113, 50.87575],
  [0.01201, 50.87583],
  [0.01284, 50.87575],
  [0.01321, 50.87571],
  [0.01346, 50.87545],
  [0.01389, 50.87557],
  [0.01462, 50.87577],
  [0.01526, 50.87591],
  [0.01499, 50.87618],
  [0.01491, 50.87635],
  [0.01457, 50.8765],
  [0.01401, 50.87677],
  [0.01347, 50.87704],
  [0.01264, 50.87745],
  [0.01253, 50.87751],
  [0.01225, 50.87674],
  [0.01166, 50.87672],
  [0.01109, 50.87667],
  [0.01087, 50.87667],
  [0.01096, 50.87611],
  [0.01074, 50.87599],
  [0.01057, 50.8759]
]

const wildlifeAndTrees: LonLat[] = [
  [0.0094, 50.8758],
  [0.01057, 50.8759],
  [0.01074, 50.87599],
  [0.01096, 50.87611],
  [0.01087, 50.87667],
  [0.01081, 50.87692],
  [0.0106, 50.8772],
  [0.01019, 50.87772],
  [0.00986, 50.87777],
  [0.00939, 50.87779],
  [0.00925, 50.8772],
  [0.00928, 50.8765],
  [0.0094, 50.8758]
]

const constructionAccess: LonLat[] = [
  [0.0187, 50.87586],
  [0.01744, 50.87577],
  [0.01526, 50.87591],
  [0.01462, 50.87577],
  [0.01389, 50.87557]
]

export const planningMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Proposed development at Phoenix Industrial Estate, North Street, Lewes, showing the red line site, wildlife and trees along the River Ouse, and the construction access on Phoenix Causeway",
  behaviour: "inline",
  zoom: 14,
  center: [0.0135, 50.8764],
  bounds: [0.008, 50.8695, 0.0215, 50.8848],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [
    {
      id: "site-entrance",
      coordinates: [0.01462, 50.87577],
      color: "#d4351c",
      label: "Site entrance",
      showLabel: true
    },
    {
      id: "waitrose",
      coordinates: [0.01406, 50.87512],
      color: "#1d70b8",
      label: "Waitrose and town shops",
      showLabel: true
    },
    {
      id: "pells-pool",
      coordinates: [0.0096, 50.87749],
      color: "#1d70b8",
      label: "Pells Pool",
      showLabel: true
    },
    {
      id: "south-malling-school",
      coordinates: [0.01748, 50.88167],
      color: "#1d70b8",
      label: "South Malling Primary School",
      showLabel: true
    },
    {
      id: "lewes-station",
      coordinates: [0.01161, 50.87058],
      color: "#1d70b8",
      label: "Lewes railway station",
      showLabel: true
    },
    {
      id: "malling-down",
      coordinates: [0.01978, 50.8834],
      color: "#00703c",
      label: "Malling Down Nature Reserve",
      showLabel: true
    }
  ],
  lines: [
    {
      id: "construction-access",
      coordinates: constructionAccess,
      color: "#1d70b8",
      width: 6
    }
  ],
  polygons: [
    {
      id: "wildlife-and-trees",
      coordinates: wildlifeAndTrees,
      fillColor: "#00703c66",
      strokeColor: "#00703c",
      strokeWidth: 3
    },
    {
      id: "development-site",
      coordinates: developmentSite,
      fillColor: "#d4351c66",
      strokeColor: "#d4351c",
      strokeWidth: 3
    }
  ],
  planningApplication: {
    bannerTitle: "Inquiry dates announced",
    headline: "The inquiry into this planning appeal opens on 6 October 2026 in Lewes.",
    summary:
      "You can speak at the inquiry if you have already made a representation, or watch without speaking. The inspector will visit the Phoenix Industrial Estate and nearby streets during the inquiry.",
    status: "Inquiry",
    reference: "APP/Y9507/W/26/3361842",
    appellant: "Ouse Valley Developments Ltd",
    localPlanningAuthority: "South Downs National Park Authority",
    siteAddress: "Phoenix Industrial Estate, North Street, Lewes, East Sussex, BN7 2QJ",
    proposal:
      "Outline planning permission for a mixed-use redevelopment of about 4.8 hectares, with up to 120 homes, 1,200 square metres of workspace, a community hall, a riverside walk and public open space. Access would be from Phoenix Causeway.",
    procedure: "Public inquiry",
    inquiryOpens: "10am on Tuesday 6 October 2026",
    decisionExpected: "January 2027",
    key: [
      {
        label: "Red area with a red outline",
        description:
          "The appeal site. This is the red line boundary of the proposed development at Phoenix Industrial Estate, between Phoenix Causeway and the River Ouse."
      },
      {
        label: "Green area with a green outline",
        description:
          "Wildlife and trees along the River Ouse, including riverbank habitat and trees protected by a tree preservation order. On the interactive map this area is hatched."
      },
      {
        label: "Blue line",
        description:
          "The proposed construction access. Heavy goods vehicles would use Phoenix Causeway (A26) from Malling Street to the site entrance."
      },
      {
        label: "Pins",
        description:
          "The site entrance on Phoenix Causeway, plus nearby facilities: Waitrose and town shops, Pells Pool, South Malling Primary School, Lewes railway station, and Malling Down Nature Reserve. These are labelled on the interactive map."
      }
    ],
    locations: [
      "The appeal site is the Phoenix Industrial Estate, also known as the North Street Quarter, on the north side of Lewes town centre.",
      "It sits between Phoenix Causeway (A26) to the south, North Street and Phoenix Place through the site, and the River Ouse on the west.",
      "Lewes Conservation Area adjoins the southern and western edges. The whole town is inside the South Downs National Park.",
      "Malling Field recreation ground is on the east bank of the river, opposite the northern end of the site.",
      "The Pells neighbourhood, including Pells Pool, lies immediately west of the riverbank wildlife area."
    ],
    roads: [
      {
        name: "Phoenix Causeway (A26)",
        effect:
          "Main construction access. Temporary traffic lights and a new site entrance would be used. Bus stops by Waitrose may be moved during the works."
      },
      {
        name: "Malling Street (A26)",
        effect:
          "Construction vehicles would approach from the A26 roundabout at Malling Street. Expect slower traffic at peak times."
      },
      {
        name: "North Street",
        effect:
          "Would be realigned through the new neighbourhood. Through-traffic would be limited once the development is occupied."
      },
      {
        name: "Phoenix Place",
        effect:
          "Would close to general traffic during demolition and rebuilding, except for site vehicles and people who live nearby."
      },
      {
        name: "Brooks Road",
        effect:
          "May take extra traffic heading to Tesco and the industrial units east of the river while Phoenix Causeway is restricted."
      },
      {
        name: "Eastgate Street and Little East Street",
        effect:
          "Town centre streets south of the causeway. Not proposed as a construction route. Pedestrian routes to the High Street would stay open."
      }
    ],
    facilities: [
      {
        name: "Waitrose and Lewes town shops",
        details:
          "Immediately south of Phoenix Causeway, about 50 metres from the site entrance. Shoppers on foot would use a controlled crossing. Some parking on the causeway would be suspended during the works."
      },
      {
        name: "Lewes railway station",
        details:
          "About 650 metres south, around a 10-minute walk via Eastgate Street and Station Street. Services run to Brighton, London Victoria and Eastbourne. The appellant says most new residents would walk or use the train."
      },
      {
        name: "South Malling Church of England Primary and Nursery School",
        details:
          "About 700 metres north on Church Lane. The local authority has said the 120 homes could mean around 30 extra primary-age children. No new school is proposed on the site."
      },
      {
        name: "Pells Pool",
        details:
          "Historic freshwater lido west of the river, about 200 metres from the wildlife area. The proposal includes a new footbridge over the Ouse, which would make the pool easier to reach from the new homes."
      },
      {
        name: "Lewes Library",
        details:
          "About 400 metres south in Styles Field. No change is proposed to the library."
      },
      {
        name: "GP services",
        details:
          "The nearest GP practices are in the town centre and at School Hill. The appellant has not offered a new surgery. The integrated care board has asked for a contribution if the appeal is allowed."
      }
    ],
    wildlife: [
      "The green area on the map is the River Ouse corridor. It is a commuting route for otters and supports water voles, kingfishers and coarse fish.",
      "Twelve mature London plane and lime trees on Phoenix Causeway are covered by a tree preservation order. The proposal would remove 4 of them to form the site entrance and keep 8, with 36 new trees planted on the riverside walk.",
      "Malling Down Nature Reserve, east of the town, is chalk grassland in the South Downs National Park. It is a Site of Special Scientific Interest. The development would not take land from the reserve, but more people walking there could put pressure on the grassland and on Adonis blue and chalkhill blue butterflies.",
      "The site is in Flood Zones 2 and 3 beside the tidal Ouse. The proposal includes a riverside flood defence and raised finished floor levels.",
      "Bats use the existing industrial buildings. Emergence surveys recorded common pipistrelle and soprano pipistrelle. Demolition would need a licence from Natural England."
    ],
    impacts: [
      "Up to 120 homes, including 50% affordable housing, on a brownfield site inside the national park.",
      "Loss of existing employment floorspace on the industrial estate. The appellant says replacement workspace would be provided on the ground floor of the new buildings.",
      "Buildings of up to 5 storeys, which would be taller than most of historic Lewes. The inspector will consider the effect on views from Lewes Castle, Malling Down and the Cliffe High Street conservation area.",
      "Construction is expected to last about 4 years if the appeal is allowed, with the noisiest demolition in the first 9 months. Working hours proposed are 8am to 6pm on weekdays and 8am to 1pm on Saturdays.",
      "A new public riverside walk and footbridge would open the riverbank, which is currently fenced off as private industrial land.",
      "The Pells and Cliffe neighbourhoods would see more people walking through, and more competition for GP appointments and primary school places.",
      "Additional surface water would be held in underground tanks before it reaches the Ouse, to avoid increasing flood risk downstream towards Newhaven."
    ],
    timetable: [
      { event: "Appeal received", date: "3 June 2026" },
      { event: "Questionnaire from the local planning authority", date: "17 June 2026" },
      { event: "Statements of case", date: "15 July 2026" },
      { event: "Proofs of evidence", date: "8 September 2026" },
      { event: "Inquiry opens, Lewes Town Hall", date: "10am, 6 October 2026" },
      { event: "Inquiry sitting days", date: "6 to 10 October 2026" },
      { event: "Inspector’s site visit", date: "8 October 2026" },
      { event: "Decision expected", date: "January 2027" }
    ],
    contacts: [
      {
        name: "Priya Shah",
        role: "Case officer",
        organisation: "The Planning Inspectorate",
        email: "priya.shah@example.com",
        phone: "020 7946 0101",
        hours: "Monday to Friday, 9am to 5pm (except public holidays)"
      },
      {
        name: "Dr Helen Okonkwo",
        role: "Planning inspector",
        organisation: "The Planning Inspectorate",
        email: "helen.okonkwo@example.com",
        phone: "020 7946 0101",
        hours: "Contact through the case officer. Do not write to the inspector directly."
      },
      {
        name: "James Whitaker",
        role: "Principal planning officer",
        organisation: "South Downs National Park Authority",
        email: "james.whitaker@example.com",
        phone: "020 7946 0182",
        hours: "Monday to Friday, 9am to 4:30pm (except public holidays)"
      },
      {
        name: "Amira Begum",
        role: "Community liaison manager",
        organisation: "Ouse Valley Developments Ltd",
        email: "amira.begum@example.com",
        phone: "020 7946 0234",
        hours: "Monday to Friday, 9am to 5:30pm"
      }
    ]
  },
  staticImageSrc: "/images/planning-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
