import type { LonLat, MapDefinition } from "./basic-map.js"

const tpoWoodland: LonLat[] = [
  [-3.20911, 56.2541],
  [-3.20884, 56.25368],
  [-3.20836, 56.25346],
  [-3.20733, 56.25397],
  [-3.20696, 56.25414],
  [-3.20695, 56.25349],
  [-3.20592, 56.25359],
  [-3.20493, 56.25367],
  [-3.20493, 56.25394],
  [-3.20501, 56.25517],
  [-3.20533, 56.25566],
  [-3.20586, 56.25604],
  [-3.20681, 56.25617],
  [-3.20703, 56.25618],
  [-3.2068, 56.25574],
  [-3.20676, 56.25534],
  [-3.20768, 56.25498],
  [-3.20838, 56.25436],
  [-3.20911, 56.2541]
]

export const treePreservationMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Tree Preservation Order covering Falkland Palace Gardens, Fife, with individual protected trees on East Port and High Street",
  behaviour: "inline",
  zoom: 16,
  center: [-3.2068, 56.2548],
  bounds: [-3.211, 56.2524, -3.2, 56.2572],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [
    {
      id: "t1-veteran-beech",
      coordinates: [-3.20681, 56.2561],
      color: "#00703c",
      label: "T1 Veteran beech",
      showLabel: true
    },
    {
      id: "t2-holm-oak",
      coordinates: [-3.20645, 56.2551],
      color: "#00703c",
      label: "T2 Holm oak",
      showLabel: true
    },
    {
      id: "t3-lime",
      coordinates: [-3.206, 56.25365],
      color: "#00703c",
      label: "T3 Lime, East Port",
      showLabel: true
    },
    {
      id: "t4-copper-beech",
      coordinates: [-3.20915, 56.25328],
      color: "#1d70b8",
      label: "T4 Copper beech",
      showLabel: true
    },
    {
      id: "t5-yew",
      coordinates: [-3.2082, 56.2534],
      color: "#1d70b8",
      label: "T5 Yew, churchyard",
      showLabel: true
    }
  ],
  lines: [],
  polygons: [
    {
      id: "tpo-woodland",
      coordinates: tpoWoodland,
      fillColor: "#00703c66",
      strokeColor: "#00703c",
      strokeWidth: 3
    }
  ],
  treePreservationOrder: {
    bannerTitle: "Consent needed",
    headline: "You must get Fife Council’s consent before you work on these trees.",
    summary:
      "This Tree Preservation Order covers woodland in Falkland Palace Gardens and 5 individual trees on East Port and High Street. Cutting down, topping, lopping or damaging a protected tree without consent is a criminal offence.",
    status: "Confirmed",
    reference: "FIFE/TPO/014/1987",
    title: "Fife Council Tree Preservation Order No. 14 (Falkland Palace Gardens and High Street) 1987",
    planningAuthority: "Fife Council",
    made: "16 January 1987",
    confirmed: "12 March 1987",
    lastVaried: "4 June 2022 (trees T4 and T5 added)",
    conservationArea: "Falkland Conservation Area",
    siteAddress: "Falkland Palace Gardens, East Port and High Street, Falkland, Fife, KY15 7BZ",
    areaDescription:
      "About 2.4 hectares of palace gardens and woodland on the north side of Falkland village, plus 2 individual trees just outside the gardens on High Street.",
    key: [
      {
        label: "Green area with a green outline",
        description:
          "The woodland Tree Preservation Order. This is Falkland Palace Gardens, between East Port, High Street properties and the north orchard wall. On the interactive map the area is hatched."
      },
      {
        label: "Pins labelled T1, T2 and T3",
        description:
          "Individual trees inside the woodland order: a veteran beech on the north boundary, a holm oak in the centre of the gardens, and a common lime on East Port."
      },
      {
        label: "Pins labelled T4 and T5",
        description:
          "Individual trees added to the order in 2022, just west of the gardens: a copper beech on High Street near Mill Wynd, and a yew in Falkland Parish Church churchyard."
      }
    ],
    locations: [
      "The protected woodland is Falkland Palace Gardens, on the north side of the village of Falkland in north-east Fife.",
      "East Port runs along the south edge of the green area. The palace building stands just inside the southern boundary, on the north side of East Port.",
      "High Street and Falkland Parish Church sit immediately west of the gardens. Trees T4 and T5 stand here, outside the green woodland polygon but still on the same order.",
      "The north boundary is a stone wall and a line of mature beech, including veteran tree T1. Beyond that is open parkland on the Falkland Estate.",
      "The east boundary follows the garden wall towards open fields. Falkland Primary School is about 350 metres east on Pleasance.",
      "Back Wynd connects High Street to East Port along the south-west corner of the gardens.",
      "The whole village, including the gardens, is inside Falkland Conservation Area. Trees in the conservation area that are not on this order still need 6 weeks’ written notice before most works.",
      "East Lomond hill rises to the south-west of the village. It is not covered by this order."
    ],
    trees: [
      {
        reference: "T1",
        species: "Common beech (Fagus sylvatica)",
        location: "North boundary of Palace Gardens, beside the orchard wall",
        details:
          "A veteran beech about 250 years old, 22 metres tall, with a trunk 1.8 metres across. It has a large cavity on the north side. Fife Council’s 2022 inspection (TPO/FIF/2022/0418) found it in fair condition. No works are currently approved."
      },
      {
        reference: "T2",
        species: "Holm oak (Quercus ilex)",
        location: "Centre of Palace Gardens, north of the palace building",
        details:
          "An evergreen oak planted in the 19th century as part of the palace pleasure grounds. About 16 metres tall. It is a landmark in views from East Port. Crown reduction was refused in 2019."
      },
      {
        reference: "T3",
        species: "Common lime (Tilia × europaea)",
        location: "South edge of the gardens, on the north pavement of East Port",
        details:
          "A street lime about 18 metres tall. Its roots sit under the East Port footway. Fife Council highways and the tree officer must both agree any works near the pavement. Consent TPO/FIF/2021/0092 allowed deadwood removal only, and expired on 30 September 2023."
      },
      {
        reference: "T4",
        species: "Copper beech (Fagus sylvatica ‘Purpurea’)",
        location: "High Street, west of Falkland Parish Church, near Mill Wynd",
        details:
          "Added to the order on 4 June 2022 after a planning application to fell it for a dropped kerb. About 14 metres tall. It contributes to the conservation area street scene. No works are currently approved."
      },
      {
        reference: "T5",
        species: "Yew (Taxus baccata)",
        location: "Falkland Parish Church churchyard, east of the church door",
        details:
          "A churchyard yew estimated at more than 200 years old. Added to the order in 2022 at the same time as T4. Churchyard maintenance still needs TPO consent unless the tree is dead or dangerous and the council has been told."
      }
    ],
    cannotDo: [
      "Cut down, uproot, top, lop, wilfully damage or wilfully destroy any tree on this order, unless Fife Council has given written consent or an exception applies.",
      "Dig, pave or lay services within the root protection area in a way that is likely to damage a protected tree, without consent.",
      "Ignore a condition on a consent, such as a requirement to plant a replacement tree.",
      "Carry out works to T1 to T5, or to other trees that form the woodland in the green area, just because you own the land or have planning permission for something else. A planning permission does not replace TPO consent unless it says so."
    ],
    canDo: [
      "Apply to Fife Council for consent to do specified works. Include a tree report if the works are more than minor pruning.",
      "Remove deadwood, or a tree that is dead, dying or dangerous, if you give the council 5 days’ written notice first, unless there is an immediate risk of serious harm. You may still need to plant a replacement.",
      "Do work that a statutory undertaker needs to do in an emergency to keep an electricity or water supply safe. The undertaker should still tell the council as soon as possible.",
      "Ask the tree officer for pre-application advice before you design an extension, a dropped kerb or a new driveway near these trees."
    ],
    howToApply: [
      "Use Fife Council’s application for works to trees covered by a TPO. Quote reference FIFE/TPO/014/1987 and the tree number, for example T3.",
      "Say exactly what you want to do (for example ‘reduce the south crown of T3 by up to 2 metres’) rather than ‘prune as needed’.",
      "Fife Council aims to decide applications in 8 weeks. Do not start work until you have the decision in writing.",
      "If consent is refused, or a condition is attached that you disagree with, you can appeal to Scottish Ministers through the Planning and Environmental Appeals Division (DPEA)."
    ],
    howToReport: [
      "If you think someone is cutting or damaging a protected tree, contact Fife Council planning enforcement and quote FIFE/TPO/014/1987.",
      "Give the tree number if you know it, the street (East Port, High Street or Palace Gardens), the date and time, and photographs if it is safe to take them.",
      "If work is happening at the time you call, say so. The council can visit the same day where trees are being felled.",
      "If a tree has fallen or is in danger of falling onto East Port, High Street or a building, call Fife Council’s emergency number. Do not wait for a TPO application.",
      "The National Trust for Scotland manages Falkland Palace and the gardens. Report damage inside the gardens to the property as well as to the council."
    ],
    contacts: [
      {
        name: "Fraser McLeod",
        role: "Tree officer",
        organisation: "Fife Council",
        email: "fraser.mcleod@example.com",
        phone: "020 7946 0310",
        hours: "Monday to Friday, 9am to 5pm (except public holidays)"
      },
      {
        name: "Planning enforcement",
        role: "Report unauthorised tree works",
        organisation: "Fife Council",
        email: "planning.enforcement@example.com",
        phone: "020 7946 0311",
        hours: "Monday to Friday, 9am to 5pm. For a tree that is falling, use the emergency number."
      },
      {
        name: "Emergency contact centre",
        role: "Dangerous tree on the highway",
        organisation: "Fife Council",
        email: "emergencies@example.com",
        phone: "020 7946 0999",
        hours: "24 hours a day, 7 days a week, for trees that are unsafe on East Port or High Street"
      },
      {
        name: "Lorna Reid",
        role: "Property operations manager",
        organisation: "National Trust for Scotland, Falkland Palace",
        email: "lorna.reid@example.com",
        phone: "020 7946 0312",
        hours: "Monday to Friday, 10am to 4pm (palace opening days)"
      }
    ]
  },
  staticImageSrc: "/images/tree-preservation-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
