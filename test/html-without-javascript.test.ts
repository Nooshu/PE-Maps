import { describe, expect, it } from "vitest"

import {
  htmlWithoutJavaScript,
  isJavaScriptOffQuery,
  isJavaScriptOffSearchParams
} from "../src/html-without-javascript.js"

describe("htmlWithoutJavaScript", () => {
  it("strips script elements and noscript wrappers", () => {
    const html = [
      "<p>Visible</p>",
      '<script type="module" src="/javascripts/map.js"></script>',
      "<noscript><img src=/images/basic-map.png alt=\"Map\"></noscript>",
      "<script>document.body.classList.add('js')</script>"
    ].join("")

    expect(htmlWithoutJavaScript(html)).toBe(
      '<p>Visible</p><img src=/images/basic-map.png alt="Map">'
    )
  })

  it("leaves pages without scripts unchanged", () => {
    expect(htmlWithoutJavaScript("<p>Hello</p>")).toBe("<p>Hello</p>")
  })
})

describe("isJavaScriptOffQuery", () => {
  it("is true only when js is the string off", () => {
    expect(isJavaScriptOffQuery({ js: "off" })).toBe(true)
    expect(isJavaScriptOffQuery({ js: "on" })).toBe(false)
    expect(isJavaScriptOffQuery({})).toBe(false)
    expect(isJavaScriptOffQuery({ js: ["off"] })).toBe(false)
  })
})

describe("isJavaScriptOffSearchParams", () => {
  it("is true only when the js query parameter is off", () => {
    expect(isJavaScriptOffSearchParams(new URLSearchParams("js=off"))).toBe(true)
    expect(isJavaScriptOffSearchParams(new URLSearchParams("js=on"))).toBe(false)
    expect(isJavaScriptOffSearchParams(new URLSearchParams())).toBe(false)
  })
})
