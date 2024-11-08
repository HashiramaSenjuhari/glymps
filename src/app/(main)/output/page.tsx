import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/side";
import Output from "@/components/ui/input/output";
import Input from "@/components/ui/input/input";
import MainHeader from "@/components/ui/main_header";
import { run } from "@/service/gemini.service";
import prisma from "../../../../prisma/prisma";
import { auth } from "@/lib/auth";

async function page() {

  const auths = await auth();
  if (!auths?.user?.email) {
    console.log("User not authenticated.");
    return <p>User not authenticated</p>;
  }

  const email = await prisma.user.findFirst({
    where: { email: auths.user.email },
  });
  if (!email) {
    console.log("User not found in database.");
    return <p>User not found in database</p>;
  }

  const cookieStore = cookies();
  const defaultOpen = (await cookieStore).get("sidebar:state")?.value === "true";

  const responseData = await run({ prompt: "10th physics optics" });
  console.log(responseData);

  const responses = await prisma.questions.findMany({
    where: { userId: email.id },
    include: {
      statement: {
        select: {
          answer: true,
          youtubelink: true,
        },
      },
    },
  });

  console.log(responses);

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="w-full h-full">
      <AppSidebar />
      <main className="w-full h-full">
        <div className="flex justify-between p-2 px-4">
          <MainHeader />
        </div>
        <div className="p-4 w-full h-full flex justify-center">
          <div className="w-[70%] h-full p-4 flex flex-col gap-y-6">
            <Input input={""} />
            <div className="w-full h-fit py-6">
              {responses.length > 0 ? (
                responses.map((resp) => (
                  <div key={resp.id}>
                    {resp.statement.map((statement, idx) => (
                      <Output
                        key={`${resp.id}-${idx}`}
                        question={resp.question}
                        answer={statement.answer}
                        youtubelink={statement.youtubelink}
                      />
                    ))}
                  </div>
                ))
              ) : (
                <p>No responses available.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default page;
