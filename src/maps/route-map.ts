import { routeCoordinates } from "./buckingham-westminster-coordinates.js"
import type { MapDefinition } from "./basic-map.js"

export const routeMap: MapDefinition = {
  containerId: "map",
  mapLabel: "Walking route from Buckingham Palace to Westminster Abbey",
  behaviour: "inline",
  zoom: 15,
  center: [-0.134, 51.5008],
  bounds: [-0.144, 51.4984, -0.1245, 51.5034],
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
      color: "#1d70b8",
      label: "Buckingham Palace",
      showLabel: true
    },
    {
      id: "westminster-abbey",
      coordinates: [-0.12641, 51.49949],
      color: "#00703c",
      label: "Westminster Abbey",
      showLabel: true
    }
  ],
  lines: [
    {
      id: "walking-route",
      coordinates: routeCoordinates,
      color: "#1d70b8",
      width: 6
    }
  ],
  polygons: [],
  directions: {
    caption: "Walking directions from Buckingham Palace to Westminster Abbey",
    summary: "This walking route is about 1,400 metres. It takes around 15 minutes.",
    steps: [
      {
        number: 1,
        instruction: "Leave Buckingham Palace and join Constitution Hill",
        distance: "20 metres"
      },
      {
        number: 2,
        instruction: "Continue onto Queen's Gardens",
        distance: "200 metres"
      },
      {
        number: 3,
        instruction: "Continue onto Spur Road",
        distance: "120 metres"
      },
      {
        number: 4,
        instruction: "Turn slight left onto Birdcage Walk",
        distance: "640 metres"
      },
      {
        number: 5,
        instruction: "Continue onto Great George Street",
        distance: "270 metres"
      },
      {
        number: 6,
        instruction: "Turn right onto Parliament Square",
        distance: "60 metres"
      },
      {
        number: 7,
        instruction: "Keep left onto St Margaret Street",
        distance: "110 metres"
      },
      {
        number: 8,
        instruction: "Turn right onto Old Palace Yard. Westminster Abbey is ahead",
        distance: "20 metres"
      }
    ]
  },
  staticImageSrc: "/images/route-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}
