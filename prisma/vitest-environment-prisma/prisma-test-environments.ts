import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { execSync } from "child_process";

const prisma = new PrismaClient()

const schemaId = randomUUID()

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
      throw new Error("Please provider a DATABASE_URL environment variable.")
  }

  const databaseUrl = new URL(process.env.DATABASE_URL)

  databaseUrl.searchParams.set("schema", schemaId)

  return databaseUrl.toString()
}

beforeAll(() => {
  process.env.DATABASE_URL = generateUniqueDatabaseUrl(schemaId)
  execSync("npx prisma migrate deploy")
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`)
  await prisma.$disconnect()
})