import {useEffect} from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import initializeMap from '../hooks/initializeMap'
import { addMarkerBasedOnCoordinates } from '../hooks/mapMethods'
import styles from '../styles/Mapbox.module.css'
import { MapComponentProps } from '../types/types'
import { cleanupMap } from '../hooks/initializeMap'
const MapComponent: React.FC<MapComponentProps> = ({ 
    access_token, 
    setOptions, 
    setMarkers, 
    mapContainerRef, 
    mapInstance, 
    geocoderRef,
    waypoints,
    mapLoadedRef
  }) => {  
    const addMarker = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        if(!mapLoadedRef.current) return
        addMarkerBasedOnCoordinates(event.lngLat.lng, event.lngLat.lat, mapInstance, waypoints, setMarkers)
    }

    const onMapLoaded = () => {
        console.log("Map has loaded")
    }

    useEffect(() => {
        let map: mapboxgl.Map | undefined

        if (mapContainerRef.current) {
        initializeMap({
            mapContainerRef,
            mapInstance,
            geocoderRef,
            addMarker,
            setOptions,
            setMarkers,
            waypoints,
            access_token,
            mapLoadedRef,
            onMapLoaded
        }) .then(map => {
            map.on('click', (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => addMarker(event))
          })
          .catch(error => {
            console.error('Error initializing the map:', error)
          })
        }
        return () => {
            if (map) {
                cleanupMap(map, geocoderRef, waypoints)
            }
        }
    }, [access_token])

    return <div ref={mapContainerRef} className={styles.container} />
  }
  
  export default MapComponent
