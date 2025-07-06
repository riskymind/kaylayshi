import { neonConfig } from "@neondatabase/serverless"
import {PrismaNeon} from "@prisma/adapter-neon"
import {PrismaClient} from "@/app/generated/prisma"
import ws from "ws"
import dotenv from "dotenv"

dotenv.config()

neonConfig.webSocketConstructor = ws

const connectionString = `${process.env.DATABASE_URL}`

if(!connectionString) {
    throw new Error("DATABASE_URL is not defined in the environment")
}

const adapter  = new PrismaNeon({connectionString})


export const prisma = new PrismaClient({adapter})