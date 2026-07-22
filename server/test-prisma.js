import { prisma } from './src/lib/prisma.js';
async function run() {
  try {
    const u = await prisma.user.findUnique({ where: { email: "test@test.com" } });
    console.log("Success", u);
  } catch (e) {
    console.error(e);
  }
}
run();
