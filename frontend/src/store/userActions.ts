import { setUser, clearUser } from "./userSlice";
import type { AppDispatch } from "./store";
import api from "../app/api";

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const { data } = await api.post("/api/users/login", { email, password });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    dispatch(setUser(data.user));
  };

export const registerUser =
  (name: string, email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const { data } = await api.post("/api/users", { name, email, password });
    dispatch(setUser(data.user));
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await api.post("/api/users/logout");
  dispatch(clearUser());
};
