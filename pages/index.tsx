import type { NextPage } from 'next'
import {
  useEffect, 
  useRef, 
  useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import initializeMap from '../hooks/initailizeMap'
import UISidebar from '../components/UISidebar'
import {addMarkerBasedOnCoordinates} from '../hooks/mapMethods';
import { UISidebarProps } from '../types/types'
import styles from '../styles/Mapbox.module.css'

interface Option {
  label: string;
  coordinates: [number, number];
}

const Home: NextPage = () => {

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<mapboxgl.Map | null>(null);
    const waypoints = useRef<Array<number[]>>([]);
    const geocoderRef = useRef<MapboxGeocoder | null>(null);
    const access_token: string = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    
    const [markers, setMarkers] = useState<[mapboxgl.Marker] | []>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);
    const [routeLength, setRouteLength] = useState<string>('');
    const [routeDuration, setRouteDuration] = useState<string>('');

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

  
    const sidebarProps = {
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
      routeDuration
    } as UISidebarProps

  return (
    <div style={{ display: 'flex' }}>
      <UISidebar {...sidebarProps} />
      <div 
          ref={mapContainerRef} 
          className={styles.container}
      />
    </div>
  );
}

export default Home;