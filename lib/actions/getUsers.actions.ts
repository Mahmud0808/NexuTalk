import prismadb from "../database/prismadb";
import getSession from "./getSession.actions";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const user = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return user;
  } catch (error) {
    return [];
  }
};

export default getUsers;
