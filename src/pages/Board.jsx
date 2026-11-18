import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  Maximize2,
  MessageCircle,
  MousePointer2,
  Plus,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { PageHead, Empty, Notice } from "../components/common";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { FlowNode } from "../components/whiteboard/FlowNode";
const nodeTypes = {
  concept: FlowNode,
  process: FlowNode,
  example: FlowNode,
  question: FlowNode,
};

export function Board({ lesson, board, highlight, askNode }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]),
    [edges, setEdges, onEdgesChange] = useEdgesState([]),
    [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!board?.nodes?.length) {
      setNodes([]);
      setEdges([]);
      return;
    }
    setNodes(board.nodes.map((n) => ({ ...n, selected: n.id === highlight })));
    setEdges(board.edges || []);
  }, [board, highlight, setNodes, setEdges]);
  if (!lesson)
    return (
      <div className="page">
        <Empty
          icon={LayoutGrid}
          title="A blank canvas, full of possibility"
          text="Select a lesson to explore its ideas on the whiteboard."
          action="Go to my lessons"
          to="/lessons"
        />
      </div>
    );
  return (
    <div className="page board-page">
      <PageHead
        eyebrow="INTERACTIVE WHITEBOARD"
        title={
          <>
            Explore the <em>whiteboard.</em>
          </>
        }
        desc={`Explore the connections in ${lesson.title}.`}
        action={
          <button
            className="button outline"
            onClick={() =>
              document.querySelector(".board-wrap")?.requestFullscreen?.()
            }
          >
            <Maximize2 size={16} /> Full screen
          </button>
        }
      />
      {!nodes.length ? (
        <Empty
          icon={LayoutGrid}
          title="No diagram available"
          text="This lesson doesn’t contain a valid whiteboard yet."
        />
      ) : (
        <div className="board-wrap">
          <div className="board-top">
            <div>
              <span className="board-dot" /> INTERACTIVE WHITEBOARD{" "}
              <span className="board-divider">/</span> {lesson.title}
            </div>
            <span>DRAG TO EXPLORE · SCROLL TO ZOOM</span>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onNodeClick={(_, n) => setSelected(n)}
            fitView
            minZoom={0.15}
          >
            <Background gap={22} size={1} color="#d8dce3" />
            <Controls />
            <MiniMap pannable zoomable nodeColor="#9caedc" />
          </ReactFlow>
          {selected && (
            <div className="node-detail">
              <button
                className="icon-button detail-close"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                <X size={17} />
              </button>
              <span className="section-index">SELECTED CONCEPT</span>
              <h3>{selected.data.label}</h3>
              <p>{selected.data.description}</p>
              <button className="text-link" onClick={() => askNode(selected)}>
                Ask tutor about this <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
