"use server";
import { auth } from "@/lib/auth";
import prisma from "../../prisma/prisma";

export async function save(response: any, prompt: string) {
  let session = await auth();
  let userId = session?.user?.email;

  let user = await prisma.user.findFirst({
    where: {
      email: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  let title = response.title;

  if (response && response.data) {
    await Promise.all(
      response.data.map(async (responseItem: any) => {
        await prisma.questions.create({
          data: {
            question: responseItem.question,
            input: prompt,
            title: title,
            user: {
              connect: {
                id: user.id,
              },
            },
            statement: {
              create: {
                answer: responseItem.solution,
                youtubelink: responseItem.video_link,
              },
            },
          },
        });
      })
    );
  }
}
