import { setUser, clearUser } from "./userSlice";
import type { AppDispatch } from "./store";
import api from "../app/api";

// Login user and store token in localStorage
export const loginUser =
  (email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const { data } = await api.post("/api/users/login", { email, password });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    dispatch(setUser(data.user));
  };

// Register user and set user state (token not returned on registration)
export const registerUser =
  (name: string, email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const { data } = await api.post("/api/users", { name, email, password });

    dispatch(setUser(data.user));
  };

// Logout user by clearing localStorage and Redux state
export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  dispatch(clearUser());
};
