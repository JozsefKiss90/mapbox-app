import { Dispatch, SetStateAction, MutableRefObject, ReactNode } from "react"

interface MapConfig {
    mapInstance: MutableRefObject<mapboxgl.Map | null>;
    waypoints: MutableRefObject<number[][]>;
    access_token: string;
}

interface SearchConfig {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

interface GeocoderConfig {
    geocoderRef: MutableRefObject<MapboxGeocoder | null>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, searchValue: string, geocoderRef: React.MutableRefObject<MapboxGeocoder | null>) => void;
}

interface RouteDetailConfig {
    routeLength: string;
    routeDuration: string;
}

interface MarkersConfig {
    markers: [mapboxgl.Marker] | [];
    setMarkers: Dispatch<SetStateAction<[mapboxgl.Marker] | []>>;
}

interface SelectedCoordsConfig {
    selectedCoordinates: [number, number] | null;
    setSelectedCoordinates: Dispatch<SetStateAction<[number, number] | null>>;
}

interface DesignConfig {
    routeColor: string;
    setRouteColor: Dispatch<SetStateAction<string>>;
    routeThickness: number;
    setRouteThickness: Dispatch<SetStateAction<number>>;
}

interface WayPointsConfig {
    mapInstance: MutableRefObject<mapboxgl.Map | null>;
    waypoints: MutableRefObject<number[][]>;
}

interface RouteSetterConfig {
    setRouteLength: Dispatch<SetStateAction<string>>;
    setRouteDuration: Dispatch<SetStateAction<string>>;
}

export interface Option {
    label: string
    coordinates: [number, number]
  }  

export interface MapComponentProps extends MapConfig {
    setOptions: Dispatch<React.SetStateAction<Option[]>>
    setMarkers: Dispatch<SetStateAction<[mapboxgl.Marker] | []>>
    mapContainerRef:  MutableRefObject<HTMLDivElement | null>
    geocoderRef: MutableRefObject<MapboxGeocoder | null>
}

export interface SidebarPropsState extends RouteSetterConfig, MapConfig {

}

export interface RouteProviderProps {
    children: ReactNode
}

export interface UISidebarProps extends 
    MapConfig, 
    SelectedCoordsConfig, 
    MarkersConfig, 
    SearchConfig, 
    RouteDetailConfig,
    RouteSetterConfig {
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
    routeProps: MapConfig & RouteSetterConfig & {
        routeColor: string,
        routeThickness: number,
        routeProfile: string,
    }
}

export interface ClearProps {
    clearProps: WayPointsConfig & MarkersConfig & RouteSetterConfig &{
        setSelectedCoordinates: Dispatch<SetStateAction<[number, number] | null>>
        setSearchValue:  Dispatch<SetStateAction<string>>
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

export interface RouteContextType {
    routeColor: string;
    setRouteColor: React.Dispatch<React.SetStateAction<string>>;
    routeThickness: number;
    setRouteThickness: React.Dispatch<React.SetStateAction<number>>;
    routeProfile: string;
    setRouteProfile: React.Dispatch<React.SetStateAction<string>>;
}

export interface GetRouteProps {
    mapInstance: MutableRefObject<mapboxgl.Map | null>
    waypoints: MutableRefObject<number[][]>
    setRouteLength: Dispatch<SetStateAction<string>>
    access_token: string | undefined
    routeColor: string
    routeThickness: number
    routeProfile: string
    setRouteDuration: Dispatch<SetStateAction<string>>
  }