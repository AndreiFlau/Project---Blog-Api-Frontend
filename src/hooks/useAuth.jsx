import { useContext } from "react";
import { UserContext } from "./UserContext";

export function useAuth() {
  return useContext(UserContext);
}

export default useAuth;
