import { prisma } from "@/lib/db/prisma";
import { inngest } from "./client";

export const workflow = inngest.createFunction(
  {
    id: "workflow",
    triggers: { event: "app/workflow.create" },
  },
  async ({ event, step }) => {
    // thinking
    await step.sleep("thinking about it", "2s");

    // preparing stuff
    await step.sleep("preparing things to do", "3s");

    // doing the thing
    await step.sleep("doing the thing", "1s");

    // saving the report
    await step.run("saving the workflow", () => {
      return prisma.workflow.create({
        data: { text: "new workflow created" },
      });
    });
  }
);
