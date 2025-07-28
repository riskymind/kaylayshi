import {DataAPIClient} from "@datastax/astra-db-ts"
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb"
import {OpenAIEmbeddings} from "@langchain/openai"

const endpoint = process.env.ASTRA_DB_ENDPOINT || ""
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || ""
const collection = process.env.ASTRA_DB_COLLECTION || ""

if(!endpoint || !token || !collection) {
    throw new Error(
        "Please set ASTRA_DB_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, and ASTRA_DB_COLLECTION environment variables."
    )
}

export async function getVectorStore() {
    return AstraDBVectorStore.fromExistingIndex(
        new OpenAIEmbeddings({model: "text-embedding-3-small"}),
        {
            token,
            endpoint,
            collection,
            collectionOptions: {
                vector: {
                    dimension: 1536,
                    metric: "cosine"
                }
            }
        }
    )
}

export async function getEmbeddingsCollection() {
    return new DataAPIClient(token).db(endpoint).collection(collection)
}