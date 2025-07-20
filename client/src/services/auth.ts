import API from "../lib/axios";

interface User {
  id: string;
  name?: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export class AuthService {
  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name?: string;
  }): Promise<User> {
    try {
      const res = await API.post<AuthResponse>("/auth/register", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    } catch (error) {
      console.error("AuthService :: createAccount", error);
      throw error;
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const res = await API.post<AuthResponse>("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    } catch (error) {
      console.error("AuthService :: login", error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const res = await API.get<User>("/auth/me");
      return res.data;
    } catch (error) {
      console.error("AuthService :: getCurrentUser", error);
      return null;
    }
  }

  async logout() {
    localStorage.removeItem("token");
  }
}

const authService = new AuthService();
export default authService;
