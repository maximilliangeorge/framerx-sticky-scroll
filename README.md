A library of code components that enables sticky scroll behavior. There are still some bugs to iron out.

# How To Use

In order for this library to work you need to set up your layers properly. Each code component instance requires a corresponding design component. You attach them by dragging the widget thing.

Place StickyTopBar at the top level of your view, along with your StickySections.

Attach your StickySections to Frames that in turn can hold a StickyHeader at the top level.

Finally, create a StickyScroll and connect it to your main view. Now things should work!
