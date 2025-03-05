import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import { Environment } from "vitest/environments";

const prisma = new PrismaClient()

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provider a DATABASE_URL environment variable.")
  }

  const databaseUrl = new URL(process.env.DATABASE_URL)

  databaseUrl.searchParams.set("schema", schemaId)

  return databaseUrl.toString()
}

export default <Environment> {
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schemaId = randomUUID()
    const databaseUrl = generateUniqueDatabaseUrl(schemaId)
    
    process.env.DATABASE_URL = databaseUrl

    execSync("npx prisma migrate deploy")

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`)

        await prisma.$disconnect()
      }
    }
  }
}