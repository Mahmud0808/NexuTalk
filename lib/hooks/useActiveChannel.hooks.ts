import { useEffect, useState } from "react";
import activeUsersStore from "../store/activeUsersStore";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../utility/pusher";

const useActiveChannel = () => {
  const { setUsers, addUser, removeUser } = activeUsersStore();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      // channel name must have the prefix "presence-"
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialUsers: string[] = [];

      members.each((member: Record<string, any>) => {
        initialUsers.push(member.id);
      });

      setUsers(initialUsers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      addUser(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      removeUser(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, setUsers, addUser, removeUser]);
};

export default useActiveChannel;
