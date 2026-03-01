import { User } from "@/types/user";
import { create } from "zustand";

interface IsLogin {
  isAuthenticated: boolean;
  user: User;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

const initUser: User = {
  username: "",
  email: "",
  avatar: "",
};

export const useLogin = create<IsLogin>((set) => ({
  isAuthenticated: false,
  user: initUser,
  setUser: (user: User) => set(() => ({ user, isAuthenticated: true })),
  clearIsAuthenticated: () =>
    set(() => ({ user: initUser, isAuthenticated: false })),
}));
