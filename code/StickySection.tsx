import * as React from "react"
import { useRef, useContext, useState, useEffect, createContext } from "react"
import { ScrollContext } from "./StickyScroll"
import { isPlaceholder, renderPlaceholder, getChildProps } from "./Util"
import { Frame, useTransform, motionValue, useMotionValue, addPropertyControls, ControlType } from "framer"

export const SectionContext = createContext({
    progress: motionValue(0),
    sectionHeight: 0,
    setHeaderHeight: null,
    offsetTop: 0,
})

export function StickySection(props) {
    if (isPlaceholder()) return renderPlaceholder(props)

    // Set-up

    const el = useRef(null)
    const childProps = getChildProps(props)

    // Context

    const { scrollY, navPush } = useContext(ScrollContext)

    // State

    const [offsetTop, setOffsetTop] = useState(0)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [transformY, setTransformY] = useState(0)

    // Set initial distance from top

    useEffect(() => {
        const containerEl: HTMLElement = el.current.parentNode
        setOffsetTop(containerEl.offsetTop)
    }, [el])

    // Calculate progress

    const progress = useTransform(
        scrollY,
        [-offsetTop + props.topModifier, -offsetTop + props.topModifier - props.height + headerHeight],
        [0, 1]
    )

    const sectionHeight = props.height

    return (
        <SectionContext.Provider
            value={{ progress, sectionHeight, setHeaderHeight, offsetTop }}
        >
            <Frame {...childProps} ref={el}>
                {props.children}
            </Frame>
        </SectionContext.Provider>
    )
}

StickySection.defaultProps = {
  topModifier: 0,
}

addPropertyControls(StickySection, {
  topModifier: { type: ControlType.Number, title: "Top Offset", displayStepper: false, },
})
