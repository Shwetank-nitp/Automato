import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "@/lib/db/prisma";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return prisma.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
    });
  }),

  getWorkflows: protectedProcedure.query(async () => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    // //simulate work1
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("Work-1 done");
    //     resolve(undefined);
    //   }, 5000);
    // });

    // // simulate work2
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("Work-2 done");
    //     resolve(undefined);
    //   }, 5000);
    // });

    // console.log("debug");
    // return prisma.workflow.create({
    //   data: { text: "new_work-flow added" },
    // });

    // Now don't do any of this thing just submit it to background job service

    await inngest.send({ name: "app/workflow.create" });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
