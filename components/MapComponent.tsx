import { useCallback, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import initializeMap from '../hooks/initializeMap';
import { addMarkerBasedOnCoordinates } from '../hooks/mapMethods';
import styles from '../styles/Mapbox.module.css';
import { MapComponentProps } from '../types/types';

const MapComponent: React.FC<MapComponentProps> = ({
  access_token,
  setOptions,
  setMarkers,
  mapContainerRef,
  mapInstance,
  geocoderRef,
  waypoints,
  mapLoadedRef,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const addMarker = useCallback((event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    addMarkerBasedOnCoordinates(event.lngLat.lng, event.lngLat.lat, mapInstance.current, waypoints, setMarkers);
  }, [mapInstance, waypoints, setMarkers]);
  

  const onMapLoaded = () => {
    setIsLoading(false);
  };

  useEffect(() => {
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
      onMapLoaded,
    });
  }, []);

  useEffect(() => {
    if (mapLoadedRef.current && mapInstance.current) {
      const currentMap = mapInstance.current;
      currentMap.on('click', addMarker);
      return () => {
        currentMap.off('click', addMarker);
      };
    }
  }, [isLoading, addMarker]);
  
  
  return <div ref={mapContainerRef} className={styles.container} />;
};

export default MapComponent;
