import type { LonLat, MapDefinition } from "./basic-map.js"

const floodRiskArea: LonLat[] = [
  [-2.4193, 52.5312],
  [-2.4182, 52.5305],
  [-2.4166, 52.5306],
  [-2.4152, 52.5314],
  [-2.4144, 52.5328],
  [-2.4134, 52.5342],
  [-2.413, 52.5354],
  [-2.4136, 52.5368],
  [-2.4155, 52.538],
  [-2.417, 52.5386],
  [-2.4184, 52.5382],
  [-2.4192, 52.5368],
  [-2.4194, 52.5354],
  [-2.4192, 52.5342],
  [-2.419, 52.5328],
  [-2.4193, 52.5312]
]

export const floodRiskMap: MapDefinition = {
  containerId: "map",
  mapLabel: "Flood risk area in Bridgnorth Low Town, Shropshire",
  behaviour: "inline",
  zoom: 15,
  center: [-2.4178, 52.5342],
  bounds: [-2.423, 52.5292, -2.4132, 52.5388],
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
      id: "bridgnorth-flood-risk",
      coordinates: floodRiskArea,
      fillColor: "#d4351c66",
      strokeColor: "#d4351c",
      strokeWidth: 3
    }
  ],
  floodWarning: {
    bannerTitle: "Severe flood warning",
    headline: "Flooding is happening in Bridgnorth Low Town.",
    summary:
      "The River Severn has burst its banks. This is a severe flood warning. There is a danger to life.",
    severity: "Severe flood warning",
    riskToLife: "High – danger to life",
    location: "Bridgnorth Low Town, Shropshire, along the River Severn",
    roads: [
      "Underhill Street",
      "Bridge Street",
      "Cart Way",
      "Severn Terrace",
      "Riverside",
      "Mill Street",
      "New Road",
      "Kings Loade",
      "Wellmeadow",
      "the B4555 through Low Town"
    ],
    warningStarted: "6:30am on Friday 18 September 2026",
    expectedUntil: "9pm on Saturday 19 September 2026",
    whatYouShouldDo: [
      "Leave the area immediately if you are told to",
      "Call 999 if you or someone else is in danger",
      "Do not walk or drive through flood water",
      "Flood water can be deep, fast-moving and hide open drains",
      "Move vehicles, pets and important items upstairs or to higher ground if it is safe to do so"
    ]
  },
  staticImageSrc: "/images/flood-risk-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
