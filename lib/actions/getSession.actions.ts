import { getServerSession } from "next-auth";
import { authOptions } from "../configs/auth.config";

export default async function getSession() {
  return await getServerSession(authOptions);
}
