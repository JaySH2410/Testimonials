import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: sessionStorage.getItem("id") === null ? undefined : sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name") === null ? undefined : sessionStorage.getItem("name"),
    email: sessionStorage.getItem("email") === null ? undefined : sessionStorage.getItem("email"),
    picture: sessionStorage.getItem("picture") === null ? undefined : sessionStorage.getItem("picture")
    // id: 1,
    // name: 'test',
    // email: 'test@xyz.com',
    // picture: ''
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const SpaceNameContext = createContext();

const SpaceNameProvider = ({ children }) => {
  const [spaceName, setSpaceName] = useState(undefined);

  return (
    <SpaceNameContext.Provider value={{ spaceName, setSpaceName }}>
      {children}
    </SpaceNameContext.Provider>
  );
};

export default SpaceNameProvider;


export const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);

  return (
    <SpaceContext.Provider value={{ spaces, setSpaces }}>
      {children}
    </SpaceContext.Provider>
  );
};

