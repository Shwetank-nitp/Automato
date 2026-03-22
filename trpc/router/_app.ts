import { baseProcedure, createTRPCRouter } from "../trpc";
import { prisma } from "@/lib/db/prisma";

export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(() => {
    return prisma.Prisma.user.findMany();
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
