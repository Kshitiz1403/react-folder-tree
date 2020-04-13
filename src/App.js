import React, { useState } from "react";
import _cloneDeep from "lodash.clonedeep";
import "./styles.css";

import Tree from "./Tree/Tree";
import { createFolder, createFile, findNodeById } from "./utils";

export default function App() {
  const [structure, setStructure] = useState([
    {
      type: "folder",
      name: "client",
      files: [
        {
          type: "folder",
          name: "ui",
          files: [
            { type: "file", name: "Button.js" },
            { type: "file", name: "Button.style.js" }
          ]
        },
        {
          type: "folder",
          name: "components",
          files: [
            { type: "file", name: "Tree.js" },
            { type: "file", name: "Tree.style.js" }
          ]
        },
        { type: "file", name: "setup.js" },
        { type: "file", name: "setupTests.js" }
      ]
    },
    {
      type: "folder",
      name: "packages",
      files: [
        {
          type: "file",
          name: "main.js"
        }
      ]
    },
    { type: "file", name: "index.js" }
  ]);

  const handleClick = props => {
    let newpath = _cloneDeep(structure);
    let found = findNodeById(newpath, props.id);

    if (props.type === "file") {
      found.files.push(createFile({ name: props.name }));
    }
    if (props.type === "folder") {
      found.files.push(createFolder({ name: props.name }));
    }
    setStructure(newpath);
  };

  return (
    <div className="App">
      <h2>Imparative API (editable)</h2>

      <Tree onNodeClick={handleClick} data={structure} />

      <h2>Declarative API</h2>
      <Tree>
        <Tree.Folder name="client">
          <Tree.Folder name="Components">
            <Tree.File name="Button.jsx" />
            <Tree.File name="Button.style.js" />
          </Tree.Folder>
          <Tree.File name="setup.js" />
        </Tree.Folder>
        <Tree.File name="index.html" />
        <Tree.File name="style.css" />
      </Tree>
    </div>
  );
}
