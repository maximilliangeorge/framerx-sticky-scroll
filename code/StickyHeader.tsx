import * as React from "react"
import { useRef, useContext, createContext, useState } from "react"
import { isPlaceholder, renderPlaceholder, getChildProps } from "./Util"
import { ScrollContext } from "./StickyScroll"
import { SectionContext } from "./StickySection"
import { Frame, useTransform, transform, addPropertyControls, ControlType } from "framer"

export function StickyHeader(props) {

    const el = useRef<HTMLDivElement>(null)
    const childProps = getChildProps(props)

    if (isPlaceholder()) return renderPlaceholder(props)

    // Context

    const { scrollY, navPush, windowHeight, topBarHeight } = useContext(ScrollContext)

    const { setHeaderHeight, sectionHeight, progress, offsetTop } = useContext(SectionContext)

    setHeaderHeight(props.height)

    // State

    const end = sectionHeight - props.height

    const transformY = useTransform(progress, val => {

      if (val == 0) {

        let t

        if (offsetTop <= topBarHeight) {

          t = 0

        } else {

          t = transform(scrollY.get(),
            [-offsetTop, -offsetTop + navPush.get()],
            [0, 1]
          )

        }

        return navPush.get() - navPush.get() * t

      } else if (val == 1) {

        const t = transform(scrollY.get(),
          [-offsetTop, -offsetTop + navPush.get()],
          [0, 1]
        )

        return end + (navPush.get() * t)

      } else {

        return Math.min((end * val) + navPush.get(), end)

      }

    })

    return (
        <Frame ref={el} {...childProps} y={transformY}>
            {props.children}
        </Frame>
    )
}
