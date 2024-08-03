import prismadb from "@/lib/database/prismadb";
import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();
    const { userId, name, isGroup, members } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      if (!members || members.length < 2) {
        return new NextResponse("Select at least 2 members.", { status: 400 });
      } else if (!name) {
        return new NextResponse("Name is required.", { status: 400 });
      } else {
        return new NextResponse("Invalid Data.", { status: 400 });
      }
    }

    if (isGroup) {
      const newConversation = await prismadb.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    } else {
      const existingConversations = await prismadb.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [currentUser.id, userId],
              },
            },
            {
              userIds: {
                equals: [userId, currentUser.id],
              },
            },
          ],
        },
      });

      const singleConversation = existingConversations[0];

      if (singleConversation) {
        return NextResponse.json(singleConversation);
      }

      const newConversation = await prismadb.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: currentUser.id,
              },
              {
                id: userId,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
