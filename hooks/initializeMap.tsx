import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import mapboxgl from "mapbox-gl"
import { InitializeMapProps } from '../types/types'

interface Option {
  label: string
  coordinates: [number, number]
}

  const initializeMap = ({
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
}: InitializeMapProps): (() => void) => {

  let map: mapboxgl.Map | null = null

  if (mapContainerRef?.current) {
    map = new mapboxgl.Map({
      accessToken: access_token,
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [17.9115, 47.0910],
      zoom: 12,
    })
  }

  const customMarker = new mapboxgl.Marker({
    color: 'orange',
    draggable: true,
  })

  const geocoder = new MapboxGeocoder({
    accessToken: access_token,
    marker: customMarker,
    mapboxgl: mapboxgl,
  })

  geocoder.on('results', (results: any) => {
    const options = results.features.map((feature: any) => ({
      label: feature.place_name,
      coordinates: feature.geometry.coordinates,
    }))
    setOptions(options)
   
    if (mapInstance?.current) {
      const currentZoom = mapInstance.current.getZoom()
      mapInstance.current.flyTo({
        zoom: currentZoom,
        essential: true,
      })
    }
  })

  map?.on('load', () => {
    if (map) {
        mapInstance.current = map;
    }
    if (geocoder) {
        geocoderRef.current = geocoder;
        mapInstance.current?.addControl(geocoderRef.current);
    }
    mapLoadedRef.current = true
    map?.on('click', (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => addMarker(event));
    onMapLoaded()
});


return () => {
  map?.remove()
  geocoder.onRemove() 
  waypoints.current?.forEach((marker: any) => marker.pop())
}
  
}

export default initializeMap
