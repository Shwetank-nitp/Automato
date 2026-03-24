import z from "zod";
import { baseProcedure, createTRPCRouter } from "../trpc";
import { prisma } from "@/lib/db/prisma";

export const appRouter = createTRPCRouter({
  getUser: baseProcedure.query(async ({ ctx }) => {
    return prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
