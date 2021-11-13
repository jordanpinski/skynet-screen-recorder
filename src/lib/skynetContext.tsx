import { FC, createContext} from "react";
import { SkynetClient } from "skynet-js";

export const SkynetContext = createContext<null | SkynetClient>(null);

export const SkynetProvider: FC = ({ children }) => {

  const skynetClient = new SkynetClient("https://siasky.net");

  return (
    <SkynetContext.Provider value={skynetClient}>
      {children}
    </SkynetContext.Provider>
  )
}