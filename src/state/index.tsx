import React, { createContext, useContext, useState } from "react";
import { TwilioError } from "twilio-video";

export interface StateContextType {
  user?: null | { displayName: undefined; photoURL: undefined; passcode?: string };
  error: TwilioError | null;
  setError: (error: TwilioError | null) => void;
  getToken: (name: string, room: string, passcode?: string) => Promise<string>;
  isFetching: boolean;
}

export const StateContext = createContext<StateContextType>(null!);

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppStateProvider");
  }
  return context;
};

const AppStateProvider = (props: React.PropsWithChildren<{}>) => {
  const [error, setError] = useState<TwilioError | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  let contextValue = {
    error,
    setError,
    isFetching
  } as StateContextType;

  contextValue = {
    ...contextValue,
    getToken: async (identity, roomName) => {
      const headers = new window.Headers();
      const endpoint = "/token";
      const params = new window.URLSearchParams({ identity, roomName });

      console.log(`${endpoint}?${params}`);

      return fetch(`${endpoint}?${params}`, { headers }).then(res =>
        res.text()
      );
    }
  };

  const getToken: StateContextType["getToken"] = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then(res => {
        console.log(res);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  return (
    <StateContext.Provider value={{ ...contextValue, getToken }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default AppStateProvider;
