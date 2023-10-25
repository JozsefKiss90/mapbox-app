import { Dispatch, SetStateAction, MutableRefObject, ReactNode } from "react"

export interface Option {
    label: string
    coordinates: [number, number]
  }  

export interface MapComponentProps {
    access_token: string
    setOptions: Dispatch<React.SetStateAction<Option[]>>
    setMarkers: Dispatch<SetStateAction<[mapboxgl.Marker] | []>>
    mapContainerRef:  MutableRefObject<HTMLDivElement | null>
    mapInstance: MutableRefObject<mapboxgl.Map | null>
    geocoderRef: MutableRefObject<MapboxGeocoder | null>
    waypoints: MutableRefObject<number[][]>
}

export interface SidebarPropsState {
    mapInstance: MutableRefObject<mapboxgl.Map | null>
    waypoints: MutableRefObject<number[][]>
    access_token: string
    setRouteLength: Dispatch<SetStateAction<string>>;
    setRouteDuration: Dispatch<SetStateAction<string>>;
}

export interface RouteProviderProps {
    children: ReactNode
}

export interface MapConfig {
    mapInstance: MutableRefObject<mapboxgl.Map | null>;
    waypoints: MutableRefObject<number[][]>;
    access_token: string;
}

export interface SearchConfig {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export interface GeocoderConfig {
    geocoderRef: MutableRefObject<MapboxGeocoder | null>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, searchValue: string, geocoderRef: React.MutableRefObject<MapboxGeocoder | null>) => void;
}

export interface RouteDetailConfig {
    setRouteLength: Dispatch<SetStateAction<string>>;
    routeLength: string;
    setRouteDuration: Dispatch<SetStateAction<string>>;
    routeDuration: string;
}

export interface MarkersConfig {
    markers: [mapboxgl.Marker] | [];
    setMarkers: Dispatch<SetStateAction<[mapboxgl.Marker] | []>>;
}

export interface SelectedCoordsConfig {
    selectedCoordinates: [number, number] | null;
    setSelectedCoordinates: Dispatch<SetStateAction<[number, number] | null>>;
}

export interface DesignConfig {
    routeColor: string;
    setRouteColor: Dispatch<SetStateAction<string>>;
    routeThickness: number;
    setRouteThickness: Dispatch<SetStateAction<number>>;
}

export interface WayPointsConfig {
    mapInstance: MutableRefObject<mapboxgl.Map | null>;
    waypoints: MutableRefObject<number[][]>;
}

export interface UISidebarProps extends 
    MapConfig, 
    SelectedCoordsConfig, 
    MarkersConfig, 
    SearchConfig, 
    RouteDetailConfig {
        options: Option[]
        geocoderRef: MutableRefObject<MapboxGeocoder | null>
    }  

export interface SearchProps {
    searchProps: SearchConfig & GeocoderConfig & WayPointsConfig & {
        options: Option[];
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
    clearProps: WayPointsConfig & MarkersConfig &{
        setSelectedCoordinates: Dispatch<SetStateAction<[number, number] | null>>
        setSearchValue:  Dispatch<SetStateAction<string>>
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
    designProps: DesignConfig & {
        routeLength: string,
        routeDuration: string
    }
}