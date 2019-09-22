import * as React from "react"
import { Frame, RenderTarget } from "framer"

const centerTextStyle: React.CSSProperties = {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
}

export function isPlaceholder() {
    return (
        RenderTarget.current() === RenderTarget.canvas ||
        RenderTarget.current() === RenderTarget.thumbnail
    )
}

export function renderPlaceholder(props) {
    const childProps = props.children[0] ? props.children[0].props : {}

    if (props.children.length == 0) {
        return (
            <Frame size={"100%"} style={centerTextStyle}>
                Assign to an element.
            </Frame>
        )
    }

    return <Frame {...childProps}>{props.children}</Frame>
}

export function getChildProps(props) {
    if (!props) return {}
    if (!props.children) return {}
    return props.children[0].props
}

export function clamp(n, m) {
  return n <= m[0] ? m[0] : n >= m[1] ? m[1] : n
}
