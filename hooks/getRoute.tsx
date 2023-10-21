import { Feature, LineString } from "geojson"
import { Expression, StyleFunction } from "mapbox-gl"

interface GetRouteProps {
    mapInstance: React.RefObject<mapboxgl.Map>
    waypoints: React.RefObject<number[][]>
    setRouteLength: (length: string) => void
    access_token: string | undefined
    routeColor: string
    routeThickness: number
}

const getRoute = async ({
    mapInstance,
    waypoints,
    setRouteLength,
    access_token,
    routeColor,
    routeThickness,
}: GetRouteProps): Promise<void> => {
    if (waypoints!.current!.length < 2) { 
      return
    }
    const waypointStr =  waypoints.current!.map((waypoint : number[])=> `${waypoint[0]},${waypoint[1]}`).join(';')

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${waypointStr}?steps=true&geometries=geojson&access_token=${access_token}`,
      { method: 'GET' }
    )
    
      const json = await query.json()
      const data = json.routes[0]
      const geojson: Feature<LineString> = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: data.geometry.coordinates
        }
    }
      const distanceInKm = (data.distance / 1000).toFixed(2)
      setRouteLength(`Route Length: ${distanceInKm} km`)
 
      if (mapInstance.current!.getSource('route')) {
        const source = mapInstance.current!.getSource('route')
      if ('setData' in source) {
          source.setData(geojson)
      }

      } else {
        mapInstance.current!.addLayer({
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
            'line-color': routeColor,
            'line-width': routeThickness
          }
        })
      } 
    }

export default getRoute