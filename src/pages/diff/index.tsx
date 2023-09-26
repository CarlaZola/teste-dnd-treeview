/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { text } from "stream/consumers";
const Diff = require("diff");

const DiffPage = () => {
  let oldText = `# Exemplo de Texto em Markdown 
  Este é um exemplo de texto formatado usando Markdown. Aqui estão alguns elementos comuns: 
  - **Negrito**: **Texto em negrito**
  - *Itálico*: *Texto em itálico*
  - Listas:
    - Item 1
    - Item 2
    - Item 3
  - Links: [Texto do Link](https://www.exemplo.com)
  - Imagens: ![Texto Alternativo](https://www.exemplo.com/imagem.jpg)
  > Blocos de citação podem ser criados usando o sinal de maior que.`;

  let newText = `
  ## Exemplo de Texto em Markdown
  ### Essa é uma linha que foi acrescentada também xalalala
  - **Negrito**: **Texto em negrito**
  - *Itálico*: *Texto em itálico*
  - Listas:
    - Item 1
    - Item 2
    - Item 3
    - Item 4
    - Item 5
  - Links: [Texto do Link](https://www.exemplo.com)
  - Imagens: ![Texto Alternativo](https://www.exemplo.com/imagem.jpg)
  > Blocos de citação podem ser criados usando o sinal de maior que.`;

  const diff = Diff.diffLines(oldText, newText, { newlineIsToken: true });

  const diffOldFile = (diff) => {
    const newDiff = diff.filter((part) => {
      return part.added == undefined || !part.added;
    });
    return newDiff;
  };

  const diffNewFile = (diff) => {
    const newDiff = diff.filter((part) => {
      return part.added !== undefined || !part.removed;
    });
    return newDiff;
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
      <div style={{ maxWidth: "50%" }}>
        {diffOldFile(diff).map((part) => {
          return (
            <p
              key={part.value}
              style={{ color: part.removed ? "red" : "gray" }}
            >
              {part.value}
            </p>
          );
        })}
      </div>
      <div style={{ maxWidth: "50%" }}>
        {diffNewFile(diff).map((part) => {
          return (
            <p
              key={part.value}
              style={{ color: part.added ? "#0ee70e" : "gray" }}
            >
              {part.value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default DiffPage;
