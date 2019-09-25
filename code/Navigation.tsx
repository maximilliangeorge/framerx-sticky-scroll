import * as React from "react"
import { Stack, Frame, addPropertyControls } from "framer"

import {
  Design_Navigation,
  Design_Menu_Item,
  Design_Modal_New_In,
  Design_Modal_Men,
  Design_Modal_Women,
  Design_Modal_Children,
  Design_Modal_Accessories,
  Design_Modal_Grenoble,
  Design_Modal_Genius } from "./canvas"

const navDefaultProps = Design_Navigation.defaultProps._sizeOfMasterOnCanvas

export function Navigation(props) {

  const menuItems = [
    { label: "New In", key: "newIn", width: 53 },
    { label: "Men", key: "men", width: 33 },
    { label: "Women", key: "women", width: 56 },
    { label: "Children", key: "children", width: 65 },
    { label: "Accessories", key: "accessories", width: 92 },
    { label: "Grenoble", key: "grenoble", width: 70 },
    { label: "Genius", key: "genius", width: 54 }
  ]

  const [expanded, setExpanded] = React.useState(false)
  const [currentModalKey, setCurrentModalKey] = React.useState('')

  function handleHoverStart(key) {
    setExpanded(true)
    setCurrentModalKey(key)
  }

  function handleHoverEnd() {
    setExpanded(false)
  }

  const modalAnimation = {
    z: expanded ? 10 : 0,
    initial: {
      y: expanded ? 0 : "-100%"
    },
    animate: {
      y: expanded ? 0 : "-100%"
    },
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.15
    }
  }

  const modals = {
    newIn: <Design_Modal_New_In />,
    men: <Design_Modal_Men />,
    women: <Design_Modal_Women />,
    children: <Design_Modal_Children />,
    accessories: <Design_Modal_Accessories />,
    grenoble: <Design_Modal_Grenoble />,
    genius: <Design_Modal_Genius />
  }

  const currentModal = modals[currentModalKey]

  return (
    <Frame {...navDefaultProps} onHoverEnd={handleHoverEnd} z={100} y={props.y} animate={props.animate} initial={props.initial} transition={props.transition}>

      <Design_Navigation {...navDefaultProps} z={10} />

      <Stack top={60} right={182} height={18} width={486} direction="horizontal" distribution={"start"} z={10}>

        {menuItems.map(item => {
            return (
              <Design_Menu_Item
                onHoverStart={() => handleHoverStart(item.key)}
                key={item.key}
                text={item.label}
                height={"100%"}
                width={item.width}
                style={{
                  cursor: "pointer"
                }}
              >
              </Design_Menu_Item>
            )
        })}

      </Stack>

      <Frame width={"100%"} height={283} background={"#0F0F0F"} top={navDefaultProps.height} {...modalAnimation} z={0}>
        { currentModal }
      </Frame>

    </Frame>
  )

}
