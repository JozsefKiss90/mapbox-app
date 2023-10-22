import mapboxgl from 'mapbox-gl';
import getRoute from './getRoute';
import { Dispatch, SetStateAction } from 'react';

export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    setSearchValue: React.Dispatch<React.SetStateAction<string>>, 
    geocoderRef: React.MutableRefObject<MapboxGeocoder | null>
    ) => {
        e.preventDefault();
        const inputValue = e.target.value;
        setSearchValue(inputValue);
        if (geocoderRef.current) {
            geocoderRef.current.setInput(inputValue);
        }
    }   
export const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>, 
    searchValue: string, 
    geocoderRef: React.MutableRefObject<MapboxGeocoder | null>
    ) => {
        e.preventDefault();
            if (geocoderRef.current) {
                geocoderRef.current.query(searchValue);
            }
    }

export const handleRoute = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    mapInstance: React.MutableRefObject<mapboxgl.Map | null>,
    waypoints: React.MutableRefObject<Array<number[]>>, 
    setRouteLength: React.Dispatch<React.SetStateAction<string>>, 
    access_token: string,
    routeColor: string, 
    routeThickness: number
    ) => {
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
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedCoordinates: [number, number] | null,
    mapInstance: React.MutableRefObject<mapboxgl.Map | null>, 
    waypoints: React.MutableRefObject<Array<number[]>>,
    addMarkerBasedOnCoordinates: (
        lng: number, 
        lat: number, 
        mapInstance: React.MutableRefObject<mapboxgl.Map | null>, 
        waypoints: React.MutableRefObject<Array<number[]>>,
        setMarkers: any,) => void,
        setMarkers: any,
    ) => {
        e.preventDefault();
        console.log(e)
        if (selectedCoordinates) {
            addMarkerBasedOnCoordinates(selectedCoordinates[0], selectedCoordinates[1], mapInstance, waypoints, setMarkers);
        }
    }
    
export const addMarkerBasedOnCoordinates = (
    lng: number, 
    lat: number, 
    mapInstance: React.MutableRefObject<mapboxgl.Map | null>, 
    waypoints: React.MutableRefObject<Array<number[]>>,
    setMarkers:any
    ) => {
        if (mapInstance.current && waypoints.current.length < 3) {
            const marker = new mapboxgl.Marker({ color: 'blue' }).setLngLat([lng, lat]).addTo(mapInstance.current);
            setMarkers((prevMarkers : any)=>[...prevMarkers, marker])
            marker.getElement().style.zIndex = "10";
            waypoints.current.push([lng, lat]);
            console.log(marker)

        } else {
            alert(`Maximum ${waypoints.current.length} markers can be added!`);
        }
    }

export const clearMarkers = (
    e: React.MouseEvent<HTMLButtonElement>,
    waypoints: React.MutableRefObject<Array<number[]>>,
    setSelectedCoordinates: Dispatch<SetStateAction<[number, number] | null>>,
    setSearchValue:any,
    setMarkers: Dispatch<SetStateAction<[] | [mapboxgl.Marker]>>,
    markers:[mapboxgl.Marker]
    ) => {
        e.preventDefault()
        waypoints.current?.forEach((waypoint:number[]) => waypoint.pop())
        markers.forEach((marker: mapboxgl.Marker) => marker.remove())
        setMarkers([])
        waypoints.current = []
        setSelectedCoordinates(null)
        setSearchValue('')
        
        //console.log(markersRef)
    }
