import React from "react";
import "./Item.css";
export default function Item({
  item,
  itemContext,
  getItemProps,
  getResizeProps
}) {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  return (
    <div {...getItemProps({ className: `item-${item.task}` })}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}

      <div
        className="rct-item-content"
        style={{ maxHeight: `${itemContext.dimensions.height}` }}
      >
        <div>{itemContext.title}</div>
        <div className="close">×</div>
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
    </div>
  );
}
