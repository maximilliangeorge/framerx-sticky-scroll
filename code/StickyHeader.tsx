import * as React from "react"
import { useRef, useContext, createContext, useState } from "react"
import { isPlaceholder, renderPlaceholder, getChildProps } from "./Util"
import { ScrollContext } from "./ScrollContainer"
import { SectionContext } from "./StickySection"
import { Frame, useTransform } from "framer"

export function StickyHeader(props) {

    const el = useRef<HTMLDivElement>(null)
    const childProps = getChildProps(props)

    if (isPlaceholder()) return renderPlaceholder(props)

    // Context

    const { scrollY, navPush } = useContext(ScrollContext)

    const { setHeaderHeight, sectionHeight, progress } = useContext(SectionContext)

    setHeaderHeight(props.height)

    // State

    const [offsetTop, setOffsetTop] = useState(0)
    //const [transformY, setTransformY] = useState(0)

    const end = sectionHeight - props.height

    const transformY = useTransform(progress, (val) => {

      if (val == 0) {
        return 0 + navPush.get()
      } else if (val == 1) {
        return end
      } else {
        return Math.min(end * val + navPush.get(), end)
      }

    })

    return (
        <Frame ref={el} {...childProps} y={transformY}>
            {props.children}
        </Frame>
    )
}
