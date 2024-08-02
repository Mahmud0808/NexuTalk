import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import prismadb from "@/lib/database/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const newMessage = await prismadb.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId?.id,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    const updatedConversation = await prismadb.conversation.update({
      where: {
        id: conversationId?.id,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // await pusherServer.trigger(conversationId, "messages:new", newMessage);

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log("SEND_MESSAGE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
