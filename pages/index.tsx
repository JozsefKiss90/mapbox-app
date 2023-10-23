import type { NextPage } from 'next'
import {useContext, useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import initializeMap from '../hooks/initailizeMap'
import UISidebar from '../components/UISidebar'
import {addMarkerBasedOnCoordinates} from '../hooks/mapMethods';
import { RouteContext } from '../context/RouteProvider'

interface Option {
  label: string;
  coordinates: [number, number];
}

const Home: NextPage = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const [markers, setMarkers] = useState<[mapboxgl.Marker] | []>([])
  const [routeLength, setRouteLength] = useState<string>('')
  const [routeduration, setRouteDuration] = useState<string>('')
  const waypoints = useRef<Array<number[]>>([])
  const geocoderRef = useRef<MapboxGeocoder | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null)
  const access_token : string  = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

  const addMarker = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    addMarkerBasedOnCoordinates(event.lngLat.lng, event.lngLat.lat, mapInstance, waypoints, setMarkers);
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      initializeMap(
       { mapContainerRef,
        mapInstance, 
        geocoderRef,  
        addMarker,
        setOptions,
        setMarkers,
        waypoints,
        access_token
      }
        )
    }
  },[access_token])


const sidebarPorps = {
  options, 
  setSearchValue,
  geocoderRef,
  searchValue, 
  setSelectedCoordinates, 
  selectedCoordinates,
  mapInstance, 
  waypoints,
  access_token,
  setRouteLength,
  routeLength,
  markers,
  setMarkers,
  setRouteDuration,
  routeduration
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

