import { Prisma } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findMany();
  }),
  postOne: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1).max(255),
        lastName: z.string().max(255),
        username: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const profile = await ctx.prisma.profile.create({
          data: {
            firstName: "Hi",
            username: input.username,
          },
        });
        return profile;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Username already exists",
            });
          }
        }
        throw e;
      }
    }),
});
