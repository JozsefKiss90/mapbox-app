import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import mapboxgl, { Control, IControl } from "mapbox-gl"

interface InitializeMapProps {
    mapContainerRef: React.RefObject<HTMLDivElement>
    mapInstance: React.MutableRefObject<mapboxgl.Map | null>
    geocoderRef: React.MutableRefObject<MapboxGeocoder | null>
    addMarker: (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => void
    addMarkerBasedOnCoordinates: (lng: number, lat: number) => void
    markersRef: React.RefObject<mapboxgl.Marker[]>
    waypoints: React.RefObject<number[][]>
    access_token: string
  }

const initializeMap = ({
    mapContainerRef,
    mapInstance,
    geocoderRef,
    addMarker,
    addMarkerBasedOnCoordinates,
    markersRef,
    waypoints,
    access_token,
}: InitializeMapProps): (() => void)=> {

    const map = new mapboxgl.Map({
        accessToken: access_token,
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [17.9115, 47.0910], 
      zoom: 12
    }) as any

    const customMarker = new mapboxgl.Marker({
        color: 'orange',
        draggable: true
    })
    
    const geocoder = new MapboxGeocoder({
        accessToken: access_token,
        marker: customMarker,
        mapboxgl: mapboxgl
    }) as any
    

    geocoder.on('result', (e: any) => {
        console.log("Geocoder coordinates:", e.result.geometry.coordinates)
      const [lng, lat] = e.result.geometry.coordinates
      addMarkerBasedOnCoordinates(lng, lat)
     })
    

    map.on('load', () => {
        mapInstance.current = map
        geocoderRef.current = geocoder
      if (geocoderRef.current) {
        mapInstance.current?.addControl(geocoderRef.current)
     }
     
      if (waypoints.current?.length) {
        //getRoute(mapInstance, waypoints, setRouteLength, access_token)
      }
    })

    map.on('click', (event:any) => addMarker(event))

    return () => {
      map.remove()
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.remove())
        }
    }
  }

export default initializeMap