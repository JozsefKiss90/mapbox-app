import { Feature, LineString } from "geojson"
import { GetRouteProps } from "../types/types";

const getRoute = async ({
    mapInstance, 
    waypoints, 
    setRouteLength, 
    access_token, 
    routeColor, 
    routeThickness, 
    routeProfile,
    setRouteDuration 
}: GetRouteProps): Promise<void> => {
    if (waypoints!.current!.length < 2) { 
      return
    }
    const waypointStr =  waypoints.current!.map((waypoint : number[])=> `${waypoint[0]},${waypoint[1]}`).join(';')
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${waypointStr}?steps=true&geometries=geojson&access_token=${access_token}`,
      { method: 'GET' }
      )
      
      const json = await query.json()
      const data = json.routes[0]
      console.log(data)
      const geojson: Feature<LineString> = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: data.geometry.coordinates
        }
    }
      const distanceInKm = (data.distance / 1000).toFixed(2)
      const routeDurationInMins = (data.duration / 60).toFixed(2)
      setRouteLength(`Route Length: ${distanceInKm} km.`)
      setRouteDuration(`Route duration: ${routeDurationInMins} min.`)
      if (mapInstance.current!.getSource('route')) {
        const source = mapInstance.current!.getSource('route')
      if ('setData' in source) {
          source.setData(geojson)
          console.log("SOURCE: " + source)
      }

      } else {
        mapInstance.current!.addSource('route', {
          type: 'geojson',
          data: geojson
          });
          mapInstance.current!.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
              },
              paint: {
                  'line-color': routeColor,
                  'line-width': routeThickness
              }
          });
        console.log('layer added')
      } 
    }

export default getRoute