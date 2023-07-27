import React, { useRef } from "react";
import SimpleBar from "simplebar-react";

export default function RootLayoutSidebarContent() {
  const ref = useRef();

  return (
    <SimpleBar className="h-100" ref={ref}>
      <div id="sidebar-menu"></div>
    </SimpleBar>
  );
}
