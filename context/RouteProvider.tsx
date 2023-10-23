import React, { createContext, useState } from "react"
export const RouteContext = createContext({})

export const RouteProvider = ({ children } : any) => {
    const [routeColor, setRouteColor] = useState<string>('#FF0000')
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
