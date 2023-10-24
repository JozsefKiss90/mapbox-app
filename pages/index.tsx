import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import mapboxgl, { Control, IControl } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import getRoute from './hooks/getRoute'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import styles from '../styles/Mabox.module.css'
import initializeMap from './hooks/initailizeMap'
import { Button, Drawer, Typography, TextField, InputLabel, Input, Slider, Box } from '@mui/material'


const Home: NextPage = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstance: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
  const markersRef = useRef<Array<mapboxgl.Marker>>([])
  const [routeLength, setRouteLength] = useState<string>('')
  const waypoints = useRef<Array<number[]>>([])
  const geocoderRef= useRef<MapboxGeocoder> (null)
  const [searchValue, setSearchValue] = useState<string>('')
  const [routeColor, setRouteColor] = useState<string>('#FF0000') 
  const [routeThickness, setRouteThickness] = useState<number>(5)

  const access_token : string   = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
 
  useEffect(() => {
    if (mapContainerRef.current) {
      initializeMap(
       { mapContainerRef,
        mapInstance, 
        geocoderRef,  
        addMarker,
        addMarkerBasedOnCoordinates,
        markersRef,
        waypoints,
        access_token
      }
        )
    }
  }, [])

  const handleInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault() 
    const inputValue = e.target.value
    setSearchValue(inputValue)
    console.log(inputValue)
    if(geocoderRef.current){
      geocoderRef.current.setInput(inputValue)
    }
}


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    if(geocoderRef.current){
      geocoderRef.current.query(searchValue)
    }
    setSearchValue('')
  }

  const handleRoute = () =>{
    if (waypoints.current.length >= 2) {
      getRoute({mapInstance, waypoints, setRouteLength, access_token, routeColor, routeThickness})
    }
  }

  const addMarker = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    addMarkerBasedOnCoordinates(event.lngLat.lng, event.lngLat.lat)
  }


const addMarkerBasedOnCoordinates = (lng: number, lat: number) => {
  if (mapInstance.current && waypoints.current.length < 3) { 
    console.log("Lng:", lng, "Lat:", lat)
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapInstance.current)
      waypoints.current.push([lng, lat])
  } else {
      alert(`Maximum ${waypoints.current.length} markers can be added!`)
  }
}
return (
  <div style={{ display: 'flex' }}>
      <Drawer
          variant="permanent"
          style={{ width: '240px', flexShrink: 0 }}
      >
          <Box
              sx={{ width: 240, padding: 2 }}
              role="presentation"
          >
              <Typography variant="h6" gutterBottom>
                  Map Settings
              </Typography>

              <form onSubmit={handleSubmit}>
                  <TextField
                      fullWidth
                      label="Search"
                      variant="outlined"
                      value={searchValue}
                      onChange={handleInputChage}
                      style={{ marginBottom: '16px' }}
                  />
                  <Button 
                      variant="contained" 
                      color="primary" 
                      type="submit"
                      style={{ marginBottom: '16px' }}
                  >
                      Add Marker
                  </Button>
              </form>

              <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleRoute}
                  style={{ marginBottom: '16px' }}
              >
                  Plan Route
              </Button>

              <InputLabel>Route Color</InputLabel>
              <Input 
                  type="color" 
                  value={routeColor} 
                  fullWidth
                  onChange={(e) => setRouteColor(e.target.value)}
                  style={{ marginBottom: '16px', cursor: 'pointer' }}
              />

              <Typography gutterBottom>
                  Route Thickness: {routeThickness}
              </Typography>
              <Slider
                  value={routeThickness}
                  onChange={(e, newValue) => setRouteThickness(newValue)}
                  min={1}
                  max={10}
                  style={{ marginBottom: '16px' }}
              />

              <Typography color="textSecondary">
                  {routeLength}
              </Typography>
          </Box>
      </Drawer>

      <div 
          ref={mapContainerRef} 
          style={{
              flexGrow: 1,
              position: 'relative',
              height: '100vh'
          }}
      />
  </div>
)
}

export default Home

