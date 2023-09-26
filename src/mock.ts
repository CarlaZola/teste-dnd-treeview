import { NodeModel } from "@minoru/react-dnd-treeview";

export const fileTreeData = {
  fileTree: {
    root: {
      name: "quickstartblobs",
      folders: [
        {
          name: "folderA",
          folders: [
            {
              name: "folderA/folderAB",
              folders: [],
              files: ["folderA/folderAB/fileB.txt"],
            },
          ],
          files: ["folderA/testeExtensao.txt", "folderA/testeFront.md"],
        },
        {
          name: "folderB",
          folders: [
            {
              name: "folderB/folderC",
              folders: [],
              files: ["folderB/folderC/fileB.txt"],
            },
          ],
          files: ["folderB/fileB.txt"],
        },
        {
          name: "pastateste",
          folders: [],
          files: ["pastateste/.keep"],
        },
        {
          name: "testestringfile",
          folders: [],
          files: ["testestringfile/.keep"],
        },
      ],
      files: [],
    },
  },
};

function convertFileTreeStructure(tree, parentId = 0, rootTree) {
  let result = [];
  let folderName: string;

  if (tree.name) {
    folderName = tree.name;

    if (tree.name.includes("/")) {
      const namedFolders = tree.name.split("/");
      folderName = namedFolders[namedFolders.length - 1];
    }

    result.push({
      id: tree.name,
      rootTree: rootTree,
      parent: parentId,
      droppable: !!tree.folders,
      text: folderName,
    });
  }

  tree.folders.forEach((folder) => {
    result = result.concat(
      convertFileTreeStructure(folder, tree.name, tree.name)
    );
  });

  tree.files.forEach((file) => {
    const [fileName, fileType] = file.split(".");
    const named = fileName.split("/");
    const oficialFileName = named[named.length - 1];

    result.push({
      id: file, // mudar o id no backend
      file: file,
      parent: tree.name,
      rootTree: rootTree,
      text: oficialFileName,
      data: {
        fileType: fileType,
        fileSize: "PlaceholderSize", // Adicione aqui a lógica para obter o tamanho do arquivo
      },
    });
  });

  return result;
}

const rootFolder = fileTreeData.fileTree.root;

export const convertedData = convertFileTreeStructure(
  rootFolder,
  0,
  rootFolder.name
);
