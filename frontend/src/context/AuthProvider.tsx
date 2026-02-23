import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import React from "react";

interface Auth {
  // The properties you expect on the `auth` variable
}
interface AuthContextInterface {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}

const AuthContext = createContext<AuthContextInterface>({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
