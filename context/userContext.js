import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children, ...props }) {
  let userData = {};
  if (!!Cookies.get('user_token')) {
    const { data } = useQueries({
      prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
      headers: {
        "Authorization": `Bearer ${Cookies.get('user_token')}`
      },
    })
    userData = data;
  }

  return (
    <UserContext.Provider value={userData?.data || null} {...props}>
      {children}
    </UserContext.Provider>
  )
}