import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/lib/utility/pusher";
import { authOptions } from "@/lib/configs/auth.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized Access" });
  }

  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const presenceData = { user_id: session.user.email };

  const authResponse = pusherServer.authorizeChannel(
    socketId,
    channel,
    presenceData
  );

  return res.send(authResponse);
}
