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
    const databaseURL = getDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return{
      async teardown(){
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "5fb32807-1001-4ab6-9d21-4b1bf8bd9ed4" CASCADE;`)
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`)
        await prisma.$disconnect()
      }
    }
  }
} as Environment





// import { Environment } from "vitest/environments";

// console.log('Custom environment loaded');

// export default {
//     name: 'prisma',
//     transformMode: 'ssr',
//     async setup() {
//       console.error('Hello from setup');
      
//       return {
//         async teardown() {
//           console.error('Teardown from prisma environment');
//         }
//       };
//     }
//   } as Environment;