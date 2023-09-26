import { NodeModel } from "@minoru/react-dnd-treeview";
import React from "react";
import { AiFillFolderOpen, AiFillFolder } from "react-icons/ai";

export interface IFileCardProps {
  onToggle: () => void;
  node: NodeModel<unknown>;
  isOpen: boolean;
  depth: number;
}

export const FileCard = ({ node, depth, isOpen, onToggle }: IFileCardProps) => {
  return (
    <div style={{ marginLeft: depth }}>
      {node.droppable && (
        <span onClick={onToggle}>
          {isOpen ? <AiFillFolderOpen /> : <AiFillFolder />}
        </span>
      )}
      <span onClick={() => console.log(node)}>{node.text}</span>
    </div>
  );
};
