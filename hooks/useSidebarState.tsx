import { useContext, useEffect, useCallback } from 'react'
import { handleRoute, handleSubmit } from '../hooks/mapMethods'
import { RouteContext } from '../context/RouteProvider'
import { SidebarPropsState, RouteContextType } from '../types/types'

export const useSidebarState = ({
  mapInstance,
  waypoints,
  access_token, 
  setRouteLength,
  setRouteDuration,
}: SidebarPropsState) => {
  const {
    routeColor, 
    setRouteColor, 
    routeThickness, 
    setRouteThickness, 
    routeProfile, 
    setRouteProfile
  } = useContext(RouteContext) as RouteContextType

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

  return {
    routeColor,
    setRouteColor,
    routeThickness,
    setRouteThickness,
    routeProfile,
    setRouteProfile,
    handleRouteCallback,
    handleSubmit
  }
}
