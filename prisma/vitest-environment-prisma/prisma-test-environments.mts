import 'dotenv/config'
import { Environment } from "vitest/environments"
import { randomUUID } from "node:crypto"
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function getDatabaseURL(schema: string){
  if(!process.env.DATABASE_URL){
    throw new Error()
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default{
  name: 'prisma',
  transformMode: 'ssr',
  async setup(){
    const schema = randomUUID()
    
    try {
      const databaseURL = getDatabaseURL(schema)

      process.env.DATABASE_URL = databaseURL

      await execSync('npx prisma migrate deploy')
    } catch (error) {
      console.log(error)
    }

    return{
      async teardown(){
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`)
        await prisma.$disconnect()
      }
    }
  }
} as Environment
