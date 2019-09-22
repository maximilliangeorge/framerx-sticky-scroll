// import * as React from "react"
// import { Design_Navigation } from "./canvas"
// import { createContext, useContext, useState, useRef, useEffect } from "react"
// import {
//     Frame,
//     Scroll,
//     addPropertyControls,
//     ControlType,
//     useViewportScroll,
//     useTransform,
//     useMotionValue,
//     RenderTarget,
// } from "framer"

// // Util

// const centerTextStyle: React.CSSProperties = {
//     textAlign: "center",
//     justifyContent: "center",
//     alignItems: "center",
// }

// function isPlaceholder() {
//     return (
//         RenderTarget.current() === RenderTarget.canvas ||
//         RenderTarget.current() === RenderTarget.thumbnail
//     )
// }

// function renderPlaceholder(props) {
//     const childProps = props.children[0] ? props.children[0].props : {}

//     if (props.children.length == 0) {
//         return (
//             <Frame size={"100%"} style={centerTextStyle}>
//                 Assign to an element.
//             </Frame>
//         )
//     }

//     return <Frame {...childProps}>{props.children}</Frame>
// }

// // Default sizes

// const navDefaultSize = Design_Navigation.defaultProps._sizeOfMasterOnCanvas

// // Context

// const ScrollContext = createContext({
//     scrollY: null,
// })

// const SectionContext = createContext({
//     sectionOffsetTop: 0,
//     sectionHeight: 0,
// })

// // Navigational Menu

// export function NavigationCode(props) {
//     return (
//         <Frame size={"100%"}>
//             <Design_Navigation />
//         </Frame>
//     )
// }

// NavigationCode.defaultProps = {
//     ...navDefaultSize,
// }

// // Sticky Section

// export function StickySection(props) {
//     const el = useRef<HTMLDivElement>(null)
//     const childProps = props.children[0] ? props.children[0].props : {}
//     const { scrollY } = useContext(ScrollContext)
//     const [sectionOffsetTop, setSectionOffsetTop] = useState(0)
//     const [headerHeight, setHeaderHeight] = useState(0)
//     const [transformY, setTransformY] = useState(0)

//     //let progress = useMotionValue(0)

//     // Fixes error on canvas bug

//     if (isPlaceholder()) return renderPlaceholder(props)

//     // Set initial distance from top

//     useEffect(() => {
//         const containerEl = el.current.parentNode
//         setSectionOffsetTop(containerEl.offsetTop)
//     }, [el])

//     // Calculate progress

//     if (!scrollY) return

//     //const normalizedScrollY = Math.abs(scrollY.get())

//     const progress = useTransform(
//         scrollY,
//         [-sectionOffsetTop, -sectionOffsetTop - props.height + headerHeight],
//         [0, 1]
//     )

//     /* useEffect(() => {
//         progress.onChange(v => {
//           console.log(v)
//         })
//     }, [progress]) */

//     const context = {
//         progress,
//         setHeaderHeight,
//         sectionHeight: props.height,
//     }

//     return (
//         <SectionContext.Provider value={context}>
//             <Frame {...childProps} ref={el}>
//                 {props.children}
//             </Frame>
//         </SectionContext.Provider>
//     )
// }

// // Sticky Header

// export function StickyHeader(props) {
//     const el = useRef<HTMLDivElement>(null)
//     const childProps = props.children[0] ? props.children[0].props : {}

//     // Fixes error on canvas bug

//     if (isPlaceholder()) return renderPlaceholder(props)

//     // Context

//     const { scrollY } = useContext(ScrollContext)
//     const { setHeaderHeight, sectionHeight, progress } = useContext(
//         SectionContext
//     )

//     setHeaderHeight(props.height)

//     // State

//     const [offsetTop, setOffsetTop] = useState(0)
//     const [transformY, setTransformY] = useState(0)

//     const end = sectionHeight - props.height

//     progress.onChange(
//         v => {
//             if (v == 0) {
//                 setTransformY(0)
//             } else if (v == 1) {
//                 setTransformY(end)
//             } else {
//                 setTransformY(end * v)
//             }
//         },
//         [progress, scrollY]
//     )

//     return (
//         <Frame ref={el} {...childProps} y={transformY}>
//             {props.children}
//         </Frame>
//     )
// }

// // Scroll Container

// export function ScrollContainer(props) {
//     const childProps = props.children[0] ? props.children[0].props : null

//     if (isPlaceholder()) return renderPlaceholder(props)

//     const scrollY = useMotionValue(0)

//     return (
//         <ScrollContext.Provider value={{ scrollY }}>
//             <Scroll contentOffsetY={scrollY} size={"100%"}>
//                 <Frame>{props.children}</Frame>
//             </Scroll>
//         </ScrollContext.Provider>
//     )
// }
