import {
    Drawer,
    Box
  } from '@mui/material'
  import {
    handleSubmit,
    handleRoute
  } from '../hooks/mapMethods'
  import {
    useCallback,
    useContext,
    useEffect
  } from 'react'
  import { RouteContext } from '../context/RouteProvider'
  import SearchComponent from './SearchComponent'
  import PlanRoute from './PlanRoute'
  import ClearMarkers from './ClearMarkers'
  import RouteProfile from './RouteProfile'
  import RouteInfo from './RouteInfo'
  import { UISidebarProps } from '../types/types'

  const UISidebar = ({
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
  }: UISidebarProps) => {
  
    const {
        routeColor, 
        setRouteColor, 
        routeThickness, 
        setRouteThickness, 
        routeProfile, 
        setRouteProfile
      } = useContext(RouteContext) as any
  
    useEffect(() => {
      if (mapInstance.current && mapInstance.current.getLayer('route')) {
        mapInstance.current.setPaintProperty('route', 'line-color', routeColor)
        mapInstance.current.setPaintProperty('route', 'line-width', routeThickness)
      }
    }, [routeColor, routeThickness, mapInstance])
  
    const handleRouteCallback = useCallback(() => {
      handleRoute(null, mapInstance, waypoints, setRouteLength, access_token, routeColor, routeThickness, routeProfile, setRouteDuration)
    }, [mapInstance, waypoints, setRouteLength, access_token, routeColor, routeThickness, routeProfile, setRouteDuration])
  
    useEffect(() => {
      if (mapInstance.current && mapInstance.current.getLayer('route')) {
        handleRouteCallback()
      }
    }, [mapInstance, routeProfile, handleRouteCallback])
  
    const commonProps = {
      mapInstance,
      waypoints,
      access_token
    }
  
    return ( 
      <Drawer variant = "permanent"
      style = {
        {
          width: '300px',
          flexShrink: 0
        }
      } >
      <Box sx = {
        {
          width: 300,
          padding: '16px 0 16px 16px'
        }
      }
      role = "presentation" >
      <SearchComponent searchProps = {
        {
          ...commonProps,
          searchValue,
          setSearchValue,
          options,
          geocoderRef,
          handleSubmit,
          setSelectedCoordinates,
          selectedCoordinates,
          setMarkers
        }
      }
      />
      <div style={{display:'flex', flexDirection:'column',}}>
      <PlanRoute routeProps = {
        {
          ...commonProps,
          setRouteLength,
          routeColor: routeColor,
          routeThickness: routeThickness,
          routeProfile: routeProfile,
          setRouteDuration
        }
      }
      />
      <ClearMarkers clearProps = {
        {
          ...commonProps,
          waypoints,
          setSelectedCoordinates,
          setSearchValue,
          setMarkers,
          markers,
          setRouteLength,
          setRouteDuration
        }
      }
      />
      </div>
      <RouteProfile profileProps={{
                  routeProfile,
                  setRouteProfile
          }}
      />
      <RouteInfo designProps = {
        {
            routeColor,
            setRouteColor,
            routeThickness,
            setRouteThickness,
            routeLength,
            routeDuration
        }
      }
      />
      </Box> 
      </Drawer>
    )
  }
  
  export default UISidebar
  