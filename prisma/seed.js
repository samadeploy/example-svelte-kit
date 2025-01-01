import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const samplePosts = [
  {
    title: "Getting Started with Prisma",
  },
  {
    title: "Building Modern Apps with Node.js",
  },
  {
    title: "Web Development Best Practices",
  },
  {
    title: "Understanding Database Design",
  }
]

async function main() {
  console.log('Start seeding...')
  
  await prisma.post.deleteMany() // Clear existing posts
  
  const posts = await prisma.post.createMany({
    data: samplePosts
  })

  console.log(`Seeded ${posts.count} posts`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })