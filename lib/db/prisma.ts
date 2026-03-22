import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaFromGlobal = global as unknown as {
  Prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prismaInstance =
  prismaFromGlobal ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  prismaFromGlobal.Prisma = new PrismaClient({ adapter });
}

export { prismaInstance as prisma };
