import { Inter } from "next/font/google";
import { useState } from "react";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
  NodeModel,
  DropOptions,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { convertedData } from "@/mock";
import { FileCard } from "@/components/Files/Files";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [treeData, setTreeData] = useState(convertedData);

  const handleDrop = (
    newTreeData: NodeModel<unknown>[],
    { dragSource, dropTargetId }: DropOptions<unknown>
  ) => {
    let oldPath: string;
    let newPath: string;

    const { text, parent } = dragSource;

    if (dragSource.data) {
      const { fileType }: any = dragSource.data; //resolver tipagem que nem gente de verdade
      oldPath = `${parent}/${text}.${fileType}`;
      newPath = `${dropTargetId}/${text}.${fileType}`;
    }

    oldPath = `${parent}/${text}`;
    newPath = `${dropTargetId}/${text}`;

    setTreeData(newTreeData);
  };

  // const openFile = (node: NodeModel<unknown>) => {
  //   console.log(node.file);
  // };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <FileCard
            key={node.id}
            depth={depth}
            node={node}
            isOpen={isOpen}
            onToggle={onToggle}
          />
        )}
      />
    </DndProvider>
  );
}
