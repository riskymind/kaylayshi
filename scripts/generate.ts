// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });
// // Configure dotenv before other imports
// import { DocumentInterface } from "@langchain/core/documents";
// import { Redis } from "@upstash/redis";
// import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";

// async function generateEmbeddings() {
//   // await Redis.fromEnv().flushdb();

//   const vectorStore = await getVectorStore();

//   (await getEmbeddingsCollection()).deleteMany({});

//   const loader = new DirectoryLoader(
//     "src/app/",
//     {
//       ".tsx": (path) => new TextLoader(path),
//     },
//     true,
//   );

//   const docs = (await loader.load())
//     .filter((doc) => doc.metadata.source.endsWith("page.tsx"))
//     .map((doc): DocumentInterface => {
//       const url =
//         doc.metadata.source
//           .replace(/\\/g, "/")
//           .split("/src/app")[1]
//           .split("/page.")[0] || "/";

//       const pageContentTrimmed = doc.pageContent
//         .replace(/^import.*$/gm, "") // Remove all import statements
//         .replace(/ className=(["']).*?\1| className={.*?}/g, "") // Remove all className props
//         .replace(/^\s*[\r]/gm, "") // remove empty lines
//         .trim();

//       return {
//         pageContent: pageContentTrimmed,
//         metadata: { url },
//       };
//     });
  

//   const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

//   const splitDocs = await splitter.splitDocuments(docs);

//   console.log(splitDocs);
  

//   await vectorStore.addDocuments(splitDocs);
// }

// generateEmbeddings();


import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import fs from "fs";
import path from "path";

import { DocumentInterface } from "@langchain/core/documents";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingsCollection, getVectorStore } from "../lib/astradb";

async function resolveComponentImports(content: string, pagePath: string): Promise<string[]> {
  const importRegex = /import\s+.*?from\s+['"](.+?)['"]/g;
  const imports: string[] = [];

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    let importPath = match[1];

    if (importPath.startsWith("@/")) {
      importPath = importPath.replace("@/", "src/");
    } else if (!importPath.startsWith(".")) {
      continue; // Skip node_modules
    } else {
      importPath = path.resolve(path.dirname(pagePath), importPath);
    }

    const fullPath = importPath.endsWith(".tsx")
      ? importPath
      : importPath + ".tsx";

    if (fs.existsSync(fullPath)) {
      imports.push(fullPath);
    }
  }

  return imports;
}

async function generateEmbeddings() {
  const vectorStore = await getVectorStore();

  // Clear existing embeddings
  await (await getEmbeddingsCollection()).deleteMany({});

  const loader = new DirectoryLoader(
    "app/",
    {
      ".tsx": (path) => new TextLoader(path),
    },
    true
  );

  const docs: DocumentInterface[] = [];

  for (const doc of await loader.load()) {
    if (!doc.metadata.source.endsWith("page.tsx")) continue;

    const pagePath = doc.metadata.source;
    const pageContent = doc.pageContent;

    const url =
      pagePath.replace(/\\/g, "/").split("/app")[1].split("/page.")[0] || "/";

    const componentPaths = await resolveComponentImports(pageContent, pagePath);

    let fullContent = pageContent;

    for (const compPath of componentPaths) {
      const compContent = fs.readFileSync(compPath, "utf-8");
      fullContent += "\n" + compContent;
    }

    const cleanContent = fullContent
      .replace(/^import.*$/gm, "") // Remove imports
      .replace(/ className=(["']).*?\1| className={.*?}/g, "") // Remove className
      .replace(/^\s*[\r]/gm, "") // Remove empty lines
      .trim();

    docs.push({
      pageContent: cleanContent,
      metadata: { url },
    });
  }

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
  const splitDocs = await splitter.splitDocuments(docs);

  // console.log(`📄 Total chunks: ${splitDocs.length}`);
  console.log(splitDocs);
  
  await vectorStore.addDocuments(splitDocs);
  console.log(`✅ Embeddings stored successfully.`);
}

generateEmbeddings();
