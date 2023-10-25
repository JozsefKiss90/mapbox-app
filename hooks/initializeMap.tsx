import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import mapboxgl from "mapbox-gl"
import { InitializeMapProps } from '../types/types'

const initializeMap = ({
  mapContainerRef,
  mapInstance,
  geocoderRef,
  setOptions,
  access_token,
}: InitializeMapProps): Promise<mapboxgl.Map> => {
  return new Promise((resolve, reject) => {

    let map : mapboxgl.Map

   if(mapContainerRef.current){
     map = new mapboxgl.Map({
      accessToken: access_token,
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [17.9115, 47.0910],
      zoom: 12,
    })
   }

    const geocoder = new MapboxGeocoder({
      accessToken: access_token,
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

    map!.on('load', () => {
      if (map) {
        mapInstance.current = map
      }
      if (geocoder) {
        geocoderRef.current = geocoder
        map.addControl(geocoderRef.current)
      }
      resolve(map)
    })

    map!.on('error', reject)
  })
}

export const cleanupMap = (
  map: mapboxgl.Map,
  geocoder: React.RefObject<MapboxGeocoder | null>,
  waypoints: React.RefObject<Array<number[]>>
) => {
  map?.remove()
  geocoder.current?.onRemove()
  waypoints.current?.forEach((marker: number[]) => marker.pop())
}

export default initializeMap
