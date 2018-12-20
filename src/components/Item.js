import React from "react";
import "./Item.css";

export default function Item(
  { item, itemContext, getItemProps, getResizeProps },
  groupStore
) {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  const { removeItems } = groupStore;
  return (
    <div {...getItemProps({ className: `item-${item.task}` })}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}

      <div
        className="rct-item-content"
        style={{ maxHeight: `${itemContext.dimensions.height}` }}
      >
        <div>{itemContext.title}</div>
        <div
          className="close"
          onClick={() => {
            removeItems(item.id);
          }}
        >
          ×
        </div>
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
    </div>
  );
}
