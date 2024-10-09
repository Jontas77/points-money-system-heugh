import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { LoginInput, LoginPayload, User } from "../types";
import { login as apiLogin, getUserById } from "../services/api"; // Import getUserById
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (data: LoginInput) => Promise<LoginPayload | undefined>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const validateTokenAndFetchUser = useCallback(
    async (storedToken: string) => {
      try {
        // Decode the token to get the user ID (assuming the token ontains the user ID)
        const decodedToken = jwtDecode(storedToken);
        const userId = decodedToken?.sub;

        // Fetch the user data using the user ID
        const response = await getUserById(userId ?? "");
        const userData = response.data;

        // Set the token and user data in state
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error("Failed to validate token and fetch user", error);
        logout();
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      validateTokenAndFetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, [validateTokenAndFetchUser]);

  const login = useCallback(
    async (data: LoginInput): Promise<LoginPayload | undefined> => {
      try {
        const response = await apiLogin(data);

        const { token, user } = response.data;

        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return response.data;
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    []
  );
console.log({ user });
  const contextValue = useMemo(
    () => ({ token, user, login, logout, loading }),
    [token, user, login, logout, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
