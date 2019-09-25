import * as React from "react"
import { createContext, useState } from "react"
import { isPlaceholder, renderPlaceholder } from "./Util"
import { Frame, Scroll, motionValue, useMotionValue, useTransform } from "framer"
import { Navigation } from "./Navigation"

export const ScrollContext = createContext({
    navPush: motionValue(0),
    scrollY: motionValue(0),
    windowHeight: 0,
    topBarHeight: 0,
    setTopBarHeight(val) {
        //this.topBarHeight = val
        return 0
    },
})

export function StickyScroll(props) {
    if (isPlaceholder()) return renderPlaceholder(props)

    const navPush = motionValue(0)
    const scrollY = motionValue(0)
    const windowHeight = props.height
    const [headCache, setHeadCache] = useState(0)
    const [tailCache, setTailCachje] = useState(0)
    const [topBarHeight, setTopBarHeight] = useState(0)
    const [showMenu, setShowMenu] = useState(true)

    const headerTransform = useTransform(scrollY, v => {
      if (showMenu) return 0
      return -200
    })

    const scrollTransform = useTransform(scrollY, v => {
      if (showMenu) return 100
      return -120
    })

    scrollY.onChange(v => {

      if (v > -100) {
        return setShowMenu(true)
      }

      return setShowMenu(false)

    })

    const scrollAnimation = {
      animate: {
        y: scrollTransform.get()
      },
      initial: {
        y: 0
      },
      transition: {
        type: "tween",
        ease: [0.69, 0, 0, 1],
        duration: 0.4,
      },
    }

    const headerAnimation = {
      animate: {
        y: headerTransform.get()
      },
      initial: {
        y: 0
      },
      transition: {
        type: "tween",
        ease: [0.69, 0, 0, 1],
        duration: 0.4,
      },
    }

    return (
        <Frame width={"100%"} height={props.height + 120} background={"#0F0F0F"}>
          <Navigation height={200} {...headerAnimation} />
          <ScrollContext.Provider
              value={{
                  scrollY,
                  navPush,
                  windowHeight,
                  topBarHeight,
                  setTopBarHeight,
              }}
          >
              <Scroll contentOffsetY={scrollY} {...scrollAnimation} width={"100%"} height={"100%"} z-index={0}>
                  <Frame>{props.children}</Frame>
              </Scroll>
          </ScrollContext.Provider>
      </Frame>
    )
}
