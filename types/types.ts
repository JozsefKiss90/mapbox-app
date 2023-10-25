
import { Dispatch, SetStateAction, MutableRefObject, ReactNode } from "react";

export interface Option {
    label: string;
    coordinates: [number, number];
  }  

export interface RouteProviderProps {
    children: ReactNode;
}

export interface MapConfig {
    mapInstance: MutableRefObject<mapboxgl.Map | null>;
    waypoints: MutableRefObject<number[][]>;
    access_token: string;
}


export interface UISidebarProps extends MapConfig {
    options: Option[];
    setSearchValue:  Dispatch<SetStateAction<string>>;
    geocoderRef: MutableRefObject<MapboxGeocoder | null>;
    searchValue: string;
    setSelectedCoordinates: Dispatch<SetStateAction<[number, number] | null>>
    selectedCoordinates: [number, number] | null;
    setRouteLength: Dispatch<SetStateAction<string>>
    routeLength: string;
    markers:  [mapboxgl.Marker] | []
    setMarkers: Dispatch<SetStateAction<[mapboxgl.Marker] | []>>
    setRouteDuration: Dispatch<SetStateAction<string>>
    routeDuration: string;
}  

export interface SearchProps {
    searchProps: {
        searchValue: string;
        setSearchValue:  Dispatch<SetStateAction<string>>;
        options: Option[];
        geocoderRef: MutableRefObject<MapboxGeocoder | null>;
        handleSubmit: (e: React.FormEvent<HTMLFormElement>, searchValue: string, geocoderRef: React.MutableRefObject<MapboxGeocoder | null>) => void, 
        setSelectedCoordinates:  Dispatch<SetStateAction<[number, number] | null>>,
        selectedCoordinates: [number, number] | null;
        waypoints: MutableRefObject<number[][]>
        mapInstance: MutableRefObject<mapboxgl.Map | null>
        setMarkers: Dispatch<SetStateAction<[mapboxgl.Marker] | []>>
    }
}

export interface RouteProps {
    routeProps: MapConfig & {
        setRouteLength: Dispatch<SetStateAction<string>>,
        routeColor: string,
        routeThickness: number,
        routeProfile: string,
        setRouteDuration: Dispatch<SetStateAction<string>>
    }
}

export interface ClearProps {
    clearProps: {
        waypoints: MutableRefObject<number[][]>
        setSelectedCoordinates: Dispatch<SetStateAction<[number, number] | null>>
        setSearchValue:  Dispatch<SetStateAction<string>>;
        setMarkers: Dispatch<SetStateAction<[mapboxgl.Marker] | []>>
        markers:  [mapboxgl.Marker] | []
        mapInstance: MutableRefObject<mapboxgl.Map | null>
        setRouteLength: Dispatch<SetStateAction<string>>
        setRouteDuration: Dispatch<SetStateAction<string>>
    }
}

export interface ProfileProps {
    profileProps: {
        routeProfile : string,
        setRouteProfile : React.Dispatch<React.SetStateAction<string>>,
    }
}

export interface DesignProps {
    designProps: {
        routeColor: string,
        setRouteColor: Dispatch<SetStateAction<string>>,
        routeThickness: number,
        setRouteThickness : Dispatch<SetStateAction<number>>,
        routeLength: string,
        routeDuration: string
    }
}