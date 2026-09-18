import type { LonLat, MapDefinition } from "./basic-map.js"

const searchArea: LonLat[] = [
  [-1.145, 53.98],
  [-1.055, 53.985],
  [-1.025, 53.955],
  [-1.045, 53.925],
  [-1.11, 53.92],
  [-1.145, 53.95]
]

export const planningApplicationsMap: MapDefinition = {
  containerId: "map",
  mapLabel:
    "Current and historic planning applications in York, showing the area searched and a pin for each application",
  behaviour: "inline",
  zoom: 12,
  center: [-1.081, 53.958],
  bounds: [-1.155, 53.915, -1.015, 53.99],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [
    {
      id: "york-central",
      coordinates: [-1.102, 53.9585],
      color: "#f47738",
      label: "York Central"
    },
    {
      id: "station-gateway",
      coordinates: [-1.093, 53.958],
      color: "#1d70b8",
      label: "Station Gateway"
    },
    {
      id: "bootham",
      coordinates: [-1.0875, 53.9665],
      color: "#1d70b8",
      label: "Bootham"
    },
    {
      id: "coppergate",
      coordinates: [-1.0805, 53.957],
      color: "#00703c",
      label: "Piccadilly"
    },
    {
      id: "hungate",
      coordinates: [-1.0755, 53.9582],
      color: "#00703c",
      label: "Hungate"
    },
    {
      id: "foss-islands",
      coordinates: [-1.0705, 53.9588],
      color: "#00703c",
      label: "Foss Islands"
    },
    {
      id: "the-groves",
      coordinates: [-1.0775, 53.966],
      color: "#d4351c",
      label: "The Groves"
    },
    {
      id: "university",
      coordinates: [-1.046, 53.9465],
      color: "#f47738",
      label: "Campus East"
    },
    {
      id: "fulford",
      coordinates: [-1.066, 53.9375],
      color: "#1d70b8",
      label: "Germany Beck"
    },
    {
      id: "clifton",
      coordinates: [-1.103, 53.9735],
      color: "#00703c",
      label: "Water Lane"
    }
  ],
  lines: [],
  polygons: [
    {
      id: "search-area",
      coordinates: searchArea,
      fillColor: "#1d70b822",
      strokeColor: "#1d70b8",
      strokeWidth: 2
    }
  ],
  planningApplicationsSearch: {
    bannerTitle: "Example search",
    headline: "There are 10 example planning applications in this part of York.",
    summary:
      "Each pin is an application. The shaded area is the search, from Clifton to Fulford. Use the table for the reference, address, proposal and status. These are example records, not live City of York Council data.",
    status: "10 applications",
    planningAuthority: "City of York Council",
    areaName: "York, from Clifton to Fulford",
    dateFrom: "1 January 2019",
    dateTo: "18 September 2026",
    applicationCount: "10",
    key: [
      {
        label: "Blue shaded area with a blue outline",
        description:
          "The area searched. It covers central York and the inner suburbs from Clifton in the north to Fulford in the south."
      },
      {
        label: "Pin west of the city walls",
        description:
          "York Central (consultation) and Station Gateway (under consideration), around York station and Leeman Road."
      },
      {
        label: "Pin north of the Minster",
        description:
          "Bootham listed building consent (under consideration) and a refused house in multiple occupation on Lowther Street, The Groves."
      },
      {
        label: "Pin east of the city centre",
        description:
          "Granted applications at Hungate, Piccadilly and Foss Islands Road."
      },
      {
        label: "Pin at Heslington and Fulford",
        description:
          "Student housing at Campus East (consultation) and 72 homes at Germany Beck, Fulford (under consideration)."
      },
      {
        label: "Pin in Clifton",
        description:
          "A granted householder extension on Water Lane."
      }
    ],
    locations: [
      "The search covers land inside York’s outer ring, from Clifton and Acomb to Hungate, the university and Fulford.",
      "York Central and the Station Gateway sit west of the city walls, around York station.",
      "Hungate, Piccadilly and Foss Islands are east of the city centre, between the Ouse and the Foss.",
      "The Groves and Bootham are north of the Minster, just outside the walls.",
      "Campus East is the University of York, south-east of the centre, beyond the A64 spur.",
      "Germany Beck is on the south-east edge of Fulford, inside the A64."
    ],
    applications: [
      {
        id: "york-central",
        reference: "22/01754/OUTM",
        address: "York Central, Leeman Road, York, YO26 4ZF",
        proposal: "Outline mixed-use development of homes, offices, a park and a new station access",
        status: "Consultation",
        received: "12 September 2022",
        decided: "Not yet decided. Comments close 2 October 2026.",
        applicationType: "Outline major"
      },
      {
        id: "station-gateway",
        reference: "24/00312/FULM",
        address: "Land at Station Road, York, YO24 1AB",
        proposal: "Station gateway public realm, bus stops and a new pedestrian crossing",
        status: "Under consideration",
        received: "4 March 2024",
        decided: "Not yet decided.",
        applicationType: "Full major"
      },
      {
        id: "bootham",
        reference: "25/01108/LBC",
        address: "18 Bootham, York, YO30 7BL",
        proposal: "Internal alterations to a grade II listed townhouse, including a new rear roof light",
        status: "Under consideration",
        received: "21 June 2025",
        decided: "Not yet decided.",
        applicationType: "Listed building consent"
      },
      {
        id: "coppergate",
        reference: "21/00890/FULM",
        address: "Piccadilly, York, YO1 9NX",
        proposal: "Demolition of a retail unit and erection of a hotel and ground-floor shops",
        status: "Granted",
        received: "8 April 2021",
        decided: "Granted 16 November 2022.",
        applicationType: "Full major"
      },
      {
        id: "hungate",
        reference: "19/01502/FULM",
        address: "Hungate riverside, York, YO1 9SW",
        proposal: "Residential-led mixed use with apartments, a riverside walk and public open space",
        status: "Granted",
        received: "3 July 2019",
        decided: "Granted 14 January 2021.",
        applicationType: "Full major"
      },
      {
        id: "foss-islands",
        reference: "20/02211/FUL",
        address: "Warehouse, Foss Islands Road, York, YO31 7UU",
        proposal: "Change of use from warehouse to 24 flats, with cycle storage and a courtyard",
        status: "Granted",
        received: "19 November 2020",
        decided: "Granted 2 August 2021.",
        applicationType: "Full"
      },
      {
        id: "the-groves",
        reference: "23/00944/FUL",
        address: "42 Lowther Street, The Groves, York, YO31 7LR",
        proposal: "Change of use from a dwellinghouse to a 7-bedroom house in multiple occupation",
        status: "Refused",
        received: "2 May 2023",
        decided: "Refused 28 July 2023.",
        applicationType: "Full"
      },
      {
        id: "university",
        reference: "26/00088/FULM",
        address: "Campus East, University of York, Heslington, York, YO10 5NA",
        proposal: "Three student residence blocks, a pavilion and landscape works",
        status: "Consultation",
        received: "11 January 2026",
        decided: "Not yet decided. Comments close 9 October 2026.",
        applicationType: "Full major"
      },
      {
        id: "fulford",
        reference: "24/01670/OUTM",
        address: "Germany Beck, Fordlands Road, Fulford, York, YO19 4QG",
        proposal: "Outline application for 72 homes, public open space and a new access from Fordlands Road",
        status: "Under consideration",
        received: "30 September 2024",
        decided: "Not yet decided.",
        applicationType: "Outline major"
      },
      {
        id: "clifton",
        reference: "25/00455/FUL",
        address: "11 Water Lane, Clifton, York, YO30 6PL",
        proposal: "Single-storey rear extension and a garden office",
        status: "Granted",
        received: "18 February 2025",
        decided: "Granted 4 April 2025.",
        applicationType: "Householder"
      }
    ],
    contacts: [
      {
        name: "Development management",
        role: "Planning applications",
        organisation: "City of York Council",
        email: "planning.applications@example.com",
        phone: "020 7946 0430",
        hours: "Monday to Friday, 9am to 5pm (except public holidays)"
      },
      {
        name: "Planning enforcement",
        role: "Unauthorised development",
        organisation: "City of York Council",
        email: "planning.enforcement@example.com",
        phone: "020 7946 0431",
        hours: "Monday to Friday, 9am to 5pm"
      },
      {
        name: "Conservation",
        role: "Listed buildings and conservation areas",
        organisation: "City of York Council",
        email: "conservation@example.com",
        phone: "020 7946 0432",
        hours: "Monday to Friday, 9am to 5pm. Quote the application reference."
      }
    ]
  },
  staticImageSrc: "/images/planning-applications-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
