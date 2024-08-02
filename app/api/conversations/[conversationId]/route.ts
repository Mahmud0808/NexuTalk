import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import prismadb from "@/lib/database/prismadb";
import { NextResponse } from "next/server";

interface ParamProps {
  conversationId?: string;
}

export async function DELETE(req: Request, { params }: { params: ParamProps }) {
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
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prismadb.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    // existingConversation.users.forEach((user) => {
    //   if (user.email) {
    //     pusherServer.trigger(user.email, "conversation:remove", existingConversation);
    //   }
    // });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
