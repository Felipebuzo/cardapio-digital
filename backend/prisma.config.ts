import { defineConfig } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  earlyAccess: true,
  schema: {
    kind: 'single',
    filePath: './prisma/schema.prisma',
  },
  migrate: {
    adapter: async () => {
      const { PrismaMysql } = await import('@prisma/adapter-mysql')
      const { createPool } = await import('mysql2/promise')
      const pool = createPool(process.env.DATABASE_URL!)
      return new PrismaMysql(pool)
    },
  },
})