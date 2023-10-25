import React, 
{
    createContext, 
    useState
} from "react"
import { RouteProviderProps } from "../types/types";
export const RouteContext = createContext({})

export const RouteProvider = ({ children } : RouteProviderProps) => {
    const [routeColor, setRouteColor] = useState<string>('#fa0546')
    const [routeThickness, setRouteThickness] = useState<number>(5)
    const [routeProfile, setRouteProfile] = useState<string>("walking")

    return (
        <RouteContext.Provider value={{  
            routeColor, 
            setRouteColor,  
            routeThickness, 
            setRouteThickness, 
            routeProfile, 
            setRouteProfile
        }}>
            {children}
        </RouteContext.Provider>
    );
};
