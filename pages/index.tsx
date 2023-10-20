import type { NextPage } from 'next'
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import mapboxgl, { Control, Expression, IControl, StyleFunction } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import getRoute from './hooks/getRoute'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import styles from '../styles/Mapbox.module.css'
import initializeMap from './hooks/initailizeMap'
import { Button, Drawer, Typography, TextField, InputLabel, Input, Slider, Box } from '@mui/material'
import Autocomplete from '@mui/lab/Autocomplete'

const Home: NextPage = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<Array<mapboxgl.Marker >>([])
  const [routeLength, setRouteLength] = useState<string>('')
  const waypoints = useRef<Array<number[]>>([])
  const geocoderRef = useRef<MapboxGeocoder | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const [routeColor, setRouteColor] = useState<string>('#FF0000') 
  const [routeThickness, setRouteThickness] = useState<number>(5)
  const [options, setOptions] = useState<Array<string>>([])
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null)
  console.log(mapInstance, geocoderRef)
  const access_token : string  = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
  useEffect(() => {
    if (mapContainerRef.current) {
      initializeMap(
       { mapContainerRef,
        mapInstance, 
        geocoderRef,  
        addMarker,
        setOptions,
        markersRef,
        waypoints,
        access_token
      }
        )
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = e.target.value
    setSearchValue(inputValue)
    if (geocoderRef.current) {
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
    //console.log(event.lngLat.lng, event.lngLat.lat)
    addMarkerBasedOnCoordinates(event.lngLat.lng, event.lngLat.lat)
  }

  const handleAddMarkerClick = () => {
    if (selectedCoordinates) {
        addMarkerBasedOnCoordinates(selectedCoordinates[0], selectedCoordinates[1])
        setSelectedCoordinates(null)
    }
  }


const addMarkerBasedOnCoordinates = (lng: number, lat: number) => {
  if (mapInstance.current && waypoints.current.length < 3) { 
    const marker = new mapboxgl.Marker({ color: 'blue' }).setLngLat([lng, lat]).addTo(mapInstance.current);
    console.log(marker)
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
            <Autocomplete
                freeSolo
                fullWidth
                options={options}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        fullWidth 
                        label="Search" 
                        variant="outlined" 
                        value={searchValue}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                )}

                onChange={(event, newValue) => {
                  if (newValue && newValue.coordinates){
                      setSelectedCoordinates(newValue.coordinates)
                  } else {
                      setSelectedCoordinates(null)
                  }
              }}
              
              />
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    onClick={handleAddMarkerClick}
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
                onChange={(e, newValue) => {
                  if (typeof newValue === 'number') {
                      setRouteThickness(newValue)
                  }
              }}
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

