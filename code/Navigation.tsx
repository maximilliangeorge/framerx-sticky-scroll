import * as React from "react"
import { useState, useContext } from "react"
import { Frame, useTransform, transform, motionValue } from "framer"
import { ScrollContext } from "./ScrollContainer"
import { isPlaceholder, renderPlaceholder, getChildProps, clamp } from "./Util"

const tailCache = motionValue(0)
const headCache = motionValue(0)
const scrollCache = motionValue(0)

export function Navigation(props) {

    if (isPlaceholder()) return renderPlaceholder(props)

    // Params

    /* const offsetFactor = 1
    const offset = props.height * offsetFactor
    const threshold = 2 */
    const childProps = getChildProps(props)

    // State

    //const [prevY, setPrevY] = useState(0)
    //const [visible, setVisible] = useState(true)

    // Context

    const { scrollY, navPush } = useContext(ScrollContext)

    function setPush(val) {

      //navPush.set(0)
      navPush.set(val)

    }

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
        return 0
      }

      if (scroll < props.height) {
        return 0
      }

      if (scrolledDown) {

        const progress = transform(scroll,
          [head, head + props.height],
          [0, 1]
        )

        tailCache.set(scroll)

        scrollCache.set(scroll)

        setPush(props.height - progress * props.height)

        return scroll - progress * props.height

      }

      if (scrolledUp) {

        const progress = transform(scroll,
          [tail, tail - props.height],
          [0, 1]
        )

        headCache.set(scroll)

        scrollCache.set(scroll)

        setPush(progress * props.height)

        return scroll - props.height + progress * props.height

      }

      /* if (overscrolled) {

        return 0

      } else if (scrolledDown) {

        console.log('down', tail, head)

        tailCache.set(scroll)
        scrollCache.set(scroll)

        navPush.set(head)

        return 0

      } else if (scrolledUp) {

        console.log('up', tail, head)

        const val = tail - scroll - threshold
        const progress = transform(val, [0, offset], [0, 1])

        navPush.set(clamp(val, [0, offset]))

        headCache.set(scroll)
        scrollCache.set(scroll)

        return scroll - offset + offset * progress

      } */

    })

    return (
        <Frame {...childProps} size={"100%"} y={transformY}>
            {props.children}
        </Frame>
    )

}
