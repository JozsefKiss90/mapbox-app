import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import mapboxgl from "mapbox-gl"
import { Dispatch, SetStateAction } from "react"

interface Option {
  label: string;
  coordinates: [number, number];
}

interface InitializeMapProps {
    mapContainerRef: React.RefObject<HTMLDivElement>
    mapInstance: React.MutableRefObject<mapboxgl.Map | null>
    geocoderRef: React.MutableRefObject<MapboxGeocoder | null>
    addMarker: (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => void
    setOptions: Dispatch<SetStateAction<Option[]>>
    markersRef: React.RefObject<mapboxgl.Marker[]>
    waypoints: React.RefObject<number[][]>
    access_token: string
  }

  const initializeMap = ({
    mapContainerRef,
    mapInstance,
    geocoderRef,
    addMarker,
    setOptions,
    markersRef,
    waypoints,
    access_token,
}: InitializeMapProps): (() => void) => {
  console.log(mapInstance, geocoderRef)

  let map: mapboxgl.Map | null = null;

  if (mapContainerRef?.current) {
    map = new mapboxgl.Map({
      accessToken: access_token,
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [17.9115, 47.0910],
      zoom: 12,
    });
  }

  const customMarker = new mapboxgl.Marker({
    color: 'orange',
    draggable: true,
  });

  const geocoder = new MapboxGeocoder({
    accessToken: access_token,
    marker: customMarker,
    mapboxgl: mapboxgl,
  });

  geocoder.on('results', (results: any) => {
    const options = results.features.map((feature: any) => ({
      label: feature.place_name,
      coordinates: feature.geometry.coordinates,
    }));
    setOptions(options);

    if (mapInstance?.current) {
      const currentZoom = mapInstance.current.getZoom();
      mapInstance.current.flyTo({
        zoom: currentZoom,
        essential: true,
      });
    }
  });

  map?.on('load', () => {
    if (map) {
      mapInstance.current = map;
    }
    if (geocoder) {
      geocoderRef.current = geocoder;
      mapInstance.current?.addControl(geocoderRef.current);
    }

    if (waypoints.current?.length) {
      //getRoute(mapInstance, waypoints, setRouteLength, access_token)
    }
  });

  map?.on('click', (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => addMarker(event));

  return () => {
    map?.remove();
    geocoder.onRemove(); 
    waypoints.current?.forEach((marker: any) => marker.pop());
  }
  
}

export default initializeMap;
