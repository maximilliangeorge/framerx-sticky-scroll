import * as React from "react"
import { useState, useContext } from "react"
import { Frame, useTransform, transform, motionValue } from "framer"
import { ScrollContext } from "./StickyScroll"
import { isPlaceholder, renderPlaceholder, getChildProps, clamp } from "./Util"

const tailCache = motionValue(0)
const headCache = motionValue(0)
const scrollCache = motionValue(0)

export function StickyTopBar(props) {

    if (isPlaceholder()) return renderPlaceholder(props)

    const childProps = getChildProps(props)

    // State

    const [transformCache, setTransformCache] = useState(0)

    // Context

    const { scrollY, navPush } = useContext(ScrollContext)

    // Transform

    const transformY = useTransform(scrollY, val => {

      const scroll = - val
      const tail = tailCache.get()
      const head = headCache.get()

      const overscrolled = scroll < 0

      const scrolledSame = scroll == scrollCache.get()
      const scrolledDown = scroll > scrollCache.get()
      const scrolledUp = scroll < scrollCache.get()

      if (overscrolled) {
        navPush.set(0)
        return 0
      }

      const reducer = transform(scroll,
        [0, props.height],
        [props.height, 0]
      )

      if (scrolledDown) {

        const progress = transform(scroll,
          [head, head + props.height],
          [0, 1]
        )

        tailCache.set(scroll)

        scrollCache.set(scroll)

        navPush.set(props.height - reducer - progress * props.height)

        //setTransformCache(scroll - progress * props.height)

        return scroll - progress * props.height

      }

      if (scrolledUp) {

        const progress = transform(scroll,
          [tail, tail - props.height],
          [0, 1]
        )

        headCache.set(scroll)

        scrollCache.set(scroll)

        navPush.set(progress * props.height - reducer)

        //setTransformCache(scroll - props.height + progress * props.height)

        return scroll - props.height + progress * props.height

      }

    })

    return (
        <Frame {...childProps} size={"100%"} y={transformY}>
            {props.children}
        </Frame>
    )

}
