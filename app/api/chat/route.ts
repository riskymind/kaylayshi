import { getVectorStore } from "@/lib/astradb";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter, Message as VercelChatMessage } from "ai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const chatHistory = messages
      .slice(0, -1)
      .map((m: VercelChatMessage) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      );

    const currentMessageContent = messages[messages.length - 1]?.content ?? "";

    const chatModel = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      streaming: true,
      verbose: true,
      cache: true,
      timeout: 120_000,
      maxRetries: 2
    });

    const rephrasingModel = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      verbose: true,
      cache: true,
    });

    const retriever = (await getVectorStore()).asRetriever();

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
          "Don't leave out any relevant keywords. Only return the query and no other text.",
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a chatbot for a personal portfolio website. You impersonate the website's owner." +
          "Answer the user's questions based on the below context. " +
          "Whenever it makes sense, provide links to pages that contain more information about the topic from the given context. " +
          "Format your messages in markdown format.\n\n" +
          "Context:\n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);


    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page URL: {url}\n\nPage content:\n{page_content}"
      ),
      documentSeparator: "\n---------\n",
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });

      
    
    const response = await retrievalChain.stream({
      input: currentMessageContent,
      chat_history: chatHistory,
    });


      // Build a native ReadableStream<string> from LangChain's iterable chunks
      const webStream = new ReadableStream<string>({
        async start(controller) {
          try {
            for await (const chunk of response) {
              if (chunk && typeof chunk.answer === "string") {
                controller.enqueue(chunk.answer);
              }
            }
          } catch (e) {
            controller.error(e);
          } finally {
            controller.close();
          }
        }
      });
  
      return LangChainAdapter.toDataStreamResponse(webStream);

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}


// import { getVectorStore } from "@/lib/astradb";
// import { AIMessage, HumanMessage } from "@langchain/core/messages";
// import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from "@langchain/core/prompts";
// import { ChatOpenAI } from "@langchain/openai";
// import { LangChainAdapter } from "ai";
// import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
// import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
// import { createRetrievalChain } from "langchain/chains/retrieval";


// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const chatHistory = messages.slice(0, -1).map((m: any) =>
//       m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
//     );
//     const input = messages.at(-1)?.content ?? "";

//     const model = new ChatOpenAI({
//       model: "gpt-3.5-turbo",
//       streaming: true,
//       timeout: 120_000,
//       maxRetries: 2
//     });

//     const retriever = (await getVectorStore()).asRetriever();

//     const historyAwareRetriever = await createHistoryAwareRetriever({
//       llm: model,
//       retriever,
//       rephrasePrompt: ChatPromptTemplate.fromMessages([
//         new MessagesPlaceholder("chat_history"),
//         ["user", "{input}"],
//         ["user", "Generate a search query from the conversation above."],
//       ]),
//     });

//     const prompt = ChatPromptTemplate.fromMessages([
//       [
//         "system",
//         "You are a portfolio chatbot. Use the following context to answer in markdown:\n\nContext:\n{context}",
//       ],
//       new MessagesPlaceholder("chat_history"),
//       ["user", "{input}"],
//     ]);

//     const combineDocs = await createStuffDocumentsChain({
//       llm: model,
//       prompt,
//       documentPrompt: PromptTemplate.fromTemplate("Page URL: {url}\n\nPage content:\n{page_content}"),
//       documentSeparator: "\n---------\n",
//     });

//     const retrievalChain = await createRetrievalChain({
//       retriever: historyAwareRetriever,
//       combineDocsChain: combineDocs,
//     });

//     // Execute and get LangChain's IterableReadableStream<ResultType>
//     const iterable = await retrievalChain.stream({
//         input,
//         chat_history: chatHistory,
//       });
  
//       // Build a native ReadableStream<string> from LangChain's iterable chunks
//     const webStream = new ReadableStream<string>({
//         async start(controller) {
//           try {
//             for await (const chunk of iterable) {
//               if (chunk && typeof chunk.answer === "string") {
//                 controller.enqueue(chunk.answer);
//               }
//             }
//           } catch (e) {
//             controller.error(e);
//           } finally {
//             controller.close();
//           }
//         }
//       });
  
//       return LangChainAdapter.toDataStreamResponse(webStream);
//   } catch (err) {
//     console.error(err);
//     return new Response("Internal server error", { status: 500 });
//   }
// }
