import React from "react";
import { Handle, Position } from "@xyflow/react";

export function FlowNode({ data, type }) {
  return (
    <div className={"flow-node " + type}>
      <Handle type="target" position={Position.Left} />
      <span className="node-kind">{type}</span>
      <strong>{data.label}</strong>
      <p>{data.description}</p>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
