import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import prismadb from "@/lib/database/prismadb";
import { NextResponse } from "next/server";

interface ParamProps {
  conversationId?: string;
}

export async function POST(req: Request, { params }: { params: ParamProps }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const existingConversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const lastMessage =
      existingConversation.messages[existingConversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(existingConversation);
    }

    const updatedMessage = await prismadb.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
