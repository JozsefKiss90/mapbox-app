// homeMethods.ts

import mapboxgl from 'mapbox-gl';
import getRoute from './getRoute';

export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setSearchValue: React.Dispatch<React.SetStateAction<string>>, geocoderRef: React.MutableRefObject<MapboxGeocoder | null>) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    if (geocoderRef.current) {
        geocoderRef.current.setInput(inputValue);
    }
}

export const handleSubmit = (e: React.FormEvent<HTMLFormElement>, searchValue: string, geocoderRef: React.MutableRefObject<MapboxGeocoder | null>) => {
    e.preventDefault();
    if (geocoderRef.current) {
        geocoderRef.current.query(searchValue);
    }
}

export const handleRoute = async (
    e: React.FormEvent<HTMLFormElement>,
    mapInstance: React.MutableRefObject<mapboxgl.Map | null>,
    waypoints: React.MutableRefObject<Array<number[]>>, 
    setRouteLength: React.Dispatch<React.SetStateAction<string>>, 
    access_token: string,
    routeColor: string, 
    routeThickness: number) => {
        e.preventDefault()    
    try {
        if (waypoints.current.length >= 2) {
            await getRoute({ mapInstance, waypoints, setRouteLength, access_token, routeColor, routeThickness });
        }
    } catch (error) {
        console.error("Error in handleRoute:", error);
    }
}

export const handleAddMarkerClick = (    
    e: React.FormEvent<HTMLFormElement>,
    selectedCoordinates: [number, number] | null,
    mapInstance: React.MutableRefObject<mapboxgl.Map | null>, 
    waypoints: React.MutableRefObject<Array<number[]>>,
    addMarkerBasedOnCoordinates: (lng: number, lat: number, mapInstance: React.MutableRefObject<mapboxgl.Map | null>, waypoints: React.MutableRefObject<Array<number[]>>) => void
  ) => {
    e.preventDefault();
    if (selectedCoordinates) {
        addMarkerBasedOnCoordinates(selectedCoordinates[0], selectedCoordinates[1], mapInstance, waypoints);
    }
  }
  
export const addMarkerBasedOnCoordinates = (lng: number, lat: number, mapInstance: React.MutableRefObject<mapboxgl.Map | null>, waypoints: React.MutableRefObject<Array<number[]>>) => {
    console.log("WTF")
    if (mapInstance.current && waypoints.current.length < 3) {
        const marker = new mapboxgl.Marker({ color: 'blue' }).setLngLat([lng, lat]).addTo(mapInstance.current);
        waypoints.current.push([lng, lat]);
        console.log(waypoints)  

    } else {
        alert(`Maximum ${waypoints.current.length} markers can be added!`);
    }
}
