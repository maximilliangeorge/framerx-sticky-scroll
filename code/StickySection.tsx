import * as React from "react"
import { useRef, useContext, useState, useEffect, createContext } from "react"
import { ScrollContext } from "./ScrollContainer"
import { isPlaceholder, renderPlaceholder, getChildProps } from "./Util"
import { Frame, useTransform, MotionValue, useMotionValue } from "framer"

export const SectionContext = createContext()

export function StickySection(props) {

    if (isPlaceholder()) return renderPlaceholder(props)

    // Set-up

    const el = useRef<HTMLDivElement>(null)
    const childProps = getChildProps(props)

    // Context

    const { scrollY } = useContext(ScrollContext)

    // State

    const [sectionOffsetTop, setSectionOffsetTop] = useState(0)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [transformY, setTransformY] = useState(0)

    // Set initial distance from top

    useEffect(() => {
        const containerEl = el.current.parentNode
        setSectionOffsetTop(containerEl.offsetTop)
    }, [el])

    // Calculate progress

    const progress = useTransform(
        scrollY,
        [-sectionOffsetTop, -sectionOffsetTop - props.height + headerHeight],
        [0, 1]
    )

    const sectionHeight = props.height

    return (
        <SectionContext.Provider value={{ progress, sectionHeight, setHeaderHeight }}>
            <Frame {...childProps} ref={el}>
                {props.children}
            </Frame>
        </SectionContext.Provider>
    )
}
