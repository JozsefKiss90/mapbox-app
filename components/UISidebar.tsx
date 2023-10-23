import { Button, Drawer, Typography, TextField, InputLabel, Input, Slider, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import Autocomplete from '@mui/lab/Autocomplete'
import { clearMarkers, handleInputChange, handleSubmit, handleRoute, handleAddMarkerClick, addMarkerBasedOnCoordinates 
} from '../hooks/mapMethods'
import { useCallback, useContext, useEffect } from 'react'
import { RouteContext } from '../context/RouteProvider'
import SearchComponent from './SearchComponent'
import PlanRoute from './PlanRoute'
import ClearMarkers from './ClearMarkers'
import RouteProfile from './RouteProfile'
import RouteDesign from './RouteDesign'

interface Option {
    label: string
    coordinates: [number, number]
  }

const UISidebar = ({props}:any) => {

const {
    options, 
    setSearchValue,
    geocoderRef,
    searchValue, 
    setSelectedCoordinates, 
    selectedCoordinates,
    mapInstance, 
    waypoints,
    access_token,
    setRouteLength,
    routeLength,
    markers,
    setMarkers,
    setRouteDuration,
    routeDuration
    } = props

    const {
        routeColor, 
        setRouteColor, 
        routeThickness, 
        setRouteThickness, 
        routeProfile, 
        setRouteProfile
      } = useContext(RouteContext) as any;
    

    useEffect(() => {
        if (mapInstance.current && mapInstance.current.getLayer('route')) {
            mapInstance.current.setPaintProperty('route', 'line-color', routeColor);
            mapInstance.current.setPaintProperty('route', 'line-width', routeThickness);
        }
    }, [routeColor, routeThickness, mapInstance]);
    
    const handleRouteCallback = useCallback(
        () => {
          handleRoute(
            null,
            mapInstance,
            waypoints,
            setRouteLength,
            access_token,
            routeColor,
            routeThickness,
            routeProfile,
            setRouteDuration
          );
        },
        [mapInstance, waypoints, setRouteLength, access_token, routeColor, routeThickness, routeProfile, setRouteDuration]
      );
      
      useEffect(() => {
        if (mapInstance.current && mapInstance.current.getLayer('route')) {
          handleRouteCallback();
        }
      }, [mapInstance, routeProfile, handleRouteCallback]);
      
    
  
    return(
        <Drawer
            variant="permanent"
            style={{ width: '240px', flexShrink: 0 }}
        >
            <Box
                sx={{ width: 260, padding: 2 }}
                role="presentation"
            >
                <SearchComponent searchProps = {{ 
                    searchValue, 
                    setSearchValue, 
                    options, 
                    geocoderRef, 
                    handleSubmit, 
                    setSelectedCoordinates,
                    selectedCoordinates, 
                    waypoints, 
                    mapInstance,
                    setMarkers
                    }}
                />
                <PlanRoute routeProps = {{  
                    mapInstance,
                    waypoints,
                    setRouteLength,
                    access_token,
                    routeColor,
                    routeThickness,
                    routeProfile,
                    setRouteDuration
                    }}
                />
                <ClearMarkers clearProps={{
                    waypoints,
                    setSelectedCoordinates,
                    setSearchValue,
                    setMarkers,
                    markers,
                    mapInstance,
                    setRouteLength,
                    setRouteDuration
                    }}
                />
                <RouteProfile profileProps={{
                    routeProfile,
                    setRouteProfile
                    }}
                />
                <RouteDesign designProps={{
                    routeColor,
                    setRouteColor,
                    routeThickness,
                    setRouteThickness,
                    routeLength,
                    routeDuration
                    }}
                />
            </Box>
        </Drawer>
    )
}

export default UISidebar