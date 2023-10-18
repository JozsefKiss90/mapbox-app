mapboxgl.accessToken = 'pk.eyJ1Ijoiam96c2Vma2lzcyIsImEiOiJjbG51dzR6ZXgwZHoyMmlxYzNoZW1mNDN3In0.XtchImmMmYc0zEcyiKFrgA'
import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const Home: NextPage = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<any>(null)
  const markersRef = useRef<Array<mapboxgl.Marker>>([])
  const start = useRef<number[] | null>([])
  const end = useRef<number[] | null>([])

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [17.9115, 47.0910], 
        zoom: 12
      }) as any


      map.on('load', () => {
        mapInstance.current = map
        if (start.current?.length && end.current?.length) {
          getRoute()
        }
      })

      map.on('click', (event) => addMarker(event))

      return () => {
        map.remove()
        markersRef.current.forEach(marker => marker.remove())
      }
    }

    if (mapContainerRef.current) {
      initializeMap()
    }
  }, [])

  const getMarkerCoordinates = () => {
    return markersRef.current.map(marker => marker.getLngLat())
  }
  

  const handleShowCoordinates = () => {
    const coordinates = getMarkerCoordinates()
    console.log(coordinates[0].lng)
  }

  const handleRoute = () =>{
    if (start.current?.length && end.current?.length) {
      getRoute()
    }
  }

  const addMarker = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (!mapInstance.current) return
    if (!start.current?.length) {
      start.current = [event.lngLat.lng, event.lngLat.lat]
      new mapboxgl.Marker().setLngLat(event.lngLat).addTo(mapInstance.current)
    } else if (!end.current?.length) {
      end.current = [event.lngLat.lng, event.lngLat.lat]
      new mapboxgl.Marker().setLngLat(event.lngLat).addTo(mapInstance.current)
    }
  } 

  async function getRoute() {
    if (!start.current?.length || !end.current?.length) {
      return
    }

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start.current[0]},${start.current[1]};${end.current[0]},${end.current[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json()
    const data = json.routes[0]
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: data.geometry.coordinates
      }
    }

    if (mapInstance.current.getSource('route')) {
      mapInstance.current.getSource('route').setData(geojson)
    } else {
      mapInstance.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      })
    } 
  }
  

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />
      <button onClick={handleShowCoordinates}>Show Marker Coordinates</button>
      <button onClick={handleRoute}>Plan route</button>
    </div>
  )
}

export default Home

