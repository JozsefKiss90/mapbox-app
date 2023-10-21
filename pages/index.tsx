import type { NextPage } from 'next'
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import getRoute from '../hooks/getRoute'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import initializeMap from '../hooks/initailizeMap'
import UISidebar from '../components/UISidebar'
import { handleInputChange, handleSubmit, handleRoute, handleAddMarkerClick, addMarkerBasedOnCoordinates } from '../hooks/mapMethods';

interface Option {
  label: string;
  coordinates: [number, number];
}

const Home: NextPage = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<Array<mapboxgl.Marker >>([])
  const [routeLength, setRouteLength] = useState<string>('')
  const waypoints = useRef<Array<number[]>>([])
  const geocoderRef = useRef<MapboxGeocoder | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const [routeColor, setRouteColor] = useState<string>('#FF0000') 
  const [routeThickness, setRouteThickness] = useState<number>(5)
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null)
  const access_token : string  = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

  const addMarker = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    addMarkerBasedOnCoordinates(event.lngLat.lng, event.lngLat.lat, mapInstance, waypoints);
  };
  useEffect(() => {

    if (mapContainerRef.current) {
      initializeMap(
       { mapContainerRef,
        mapInstance, 
        geocoderRef,  
        addMarker,
        setOptions,
        markersRef,
        waypoints,
        access_token
      }
        )
    }
  },[access_token])


const sidebarPorps = {
  handleSubmit, 
  options, 
  setSearchValue,
  geocoderRef,
  searchValue, 
  handleInputChange, 
  setSelectedCoordinates, 
  selectedCoordinates,
  addMarkerBasedOnCoordinates,
  handleAddMarkerClick,
  handleRoute, 
  mapInstance, 
  waypoints,
  access_token,
  routeColor,
  setRouteColor,
  setRouteLength,
  routeThickness,
  setRouteThickness,
  routeLength
}

return (
  <div style={{ display: 'flex' }}>
      <UISidebar props={sidebarPorps}/>
      <div 
          ref={mapContainerRef} 
          style={{
              flexGrow: 1,
              position: 'relative',
              height: '100vh'
          }}
      />
  </div>
)
}

export default Home

