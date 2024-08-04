import { create } from "zustand";

interface ActiveUsersState {
  activeUsers: string[];
  setUsers: (ids: string[]) => void;
  addUser: (id: string) => void;
  removeUser: (id: string) => void;
}

const activeUsersStore = create<ActiveUsersState>((set) => ({
  activeUsers: [],
  setUsers: (ids) => set({ activeUsers: ids }),
  addUser: (id) =>
    set((state) => {
      if (state.activeUsers.includes(id)) {
        return state;
      }

      return {
        activeUsers: [...state.activeUsers, id],
      };
    }),
  removeUser: (id) =>
    set((state) => ({
      activeUsers: state.activeUsers.filter((userId) => userId !== id),
    })),
}));

export default activeUsersStore;
