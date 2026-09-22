import { basicMap, type MapDefinition } from "./basic-map.js"

export const openMapButtonMap: MapDefinition = {
  ...basicMap,
  behaviour: "buttonFirst",
  buttonText: "Open map of London",
  hasExitButton: true
}
