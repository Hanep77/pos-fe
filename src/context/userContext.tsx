
import { createContext, useContext, useState, type ReactNode } from "react";

type User = Record<string, string> | null;

interface StateContextType {
  user: User;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextType>({
  user: null,
  token: null,
  setUser: () => { },
  setToken: () => { },
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, _setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem("USER");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
  );

  const setUser = (user: User) => {
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }
    _setUser(user);
  };

  const setToken = (token: string | null) => {
    _setToken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useUserContext = () => useContext(StateContext);

