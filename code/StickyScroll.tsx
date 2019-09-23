import * as React from "react"
import { createContext, useState } from "react"
import { isPlaceholder, renderPlaceholder } from "./Util"
import { Frame, Scroll, motionValue, useMotionValue } from "framer"

export const ScrollContext = createContext({
  navPush: motionValue(0),
  scrollY: motionValue(0),
  windowHeight: 0
})

export function StickyScroll(props) {

    if (isPlaceholder()) return renderPlaceholder(props)

    const navPush = motionValue(0)
    const scrollY = motionValue(0)
    const windowHeight = props.height

    return (
        <ScrollContext.Provider value={{ scrollY, navPush, windowHeight }}>
            <Scroll contentOffsetY={scrollY} width={"100%"} height={"100%"}>
                <Frame>{props.children}</Frame>
            </Scroll>
        </ScrollContext.Provider>
    )
}
