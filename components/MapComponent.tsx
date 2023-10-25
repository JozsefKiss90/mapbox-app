import {useEffect} from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import initializeMap from '../hooks/initializeMap'
import { addMarkerBasedOnCoordinates } from '../hooks/mapMethods'
import styles from '../styles/Mapbox.module.css'
import { MapComponentProps } from '../types/types'

const MapComponent: React.FC<MapComponentProps> = ({ 
    access_token, 
    setOptions, 
    setMarkers, 
    mapContainerRef, 
    mapInstance, 
    geocoderRef,
    waypoints 
  }) => {
    
    const addMarker = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        addMarkerBasedOnCoordinates(event.lngLat.lng, event.lngLat.lat, mapInstance, waypoints, setMarkers)
    }

    useEffect(() => {
        if (mapContainerRef.current) {
        initializeMap({
            mapContainerRef,
            mapInstance,
            geocoderRef,
            addMarker,
            setOptions,
            setMarkers,
            waypoints,
            access_token
        })
        }
    }, [access_token])

    return <div ref={mapContainerRef} className={styles.container} />
  }
  
  export default MapComponent