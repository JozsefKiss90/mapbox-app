import { useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { Option } from '../types/types'

export const useMapState = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const waypoints = useRef<Array<number[]>>([])
  const geocoderRef = useRef<MapboxGeocoder | null>(null)
  const access_token: string = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
  
  const [markers, setMarkers] = useState<[mapboxgl.Marker] | []>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [options, setOptions] = useState<Option[]>([])
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null)
  const [routeLength, setRouteLength] = useState<string>('')
  const [routeDuration, setRouteDuration] = useState<string>('')
  const mapLoadedRef = useRef(false);

  const mapConfigProps = {
    mapInstance,
    waypoints,
    access_token
  }

  const searchProps = {
    searchValue,
    setSearchValue,
    options,
    geocoderRef
  }

  const markersProps = {
    markers,
    setMarkers
  }

  const routeDetailsProps = {
    setRouteLength,
    routeLength,
    setRouteDuration,
    routeDuration
  }

  const selectedCoordsProps = {
    selectedCoordinates,
    setSelectedCoordinates 
  }

  const sidebarProps = {
    ...mapConfigProps,
    ...searchProps,
    ...markersProps, 
    ...routeDetailsProps,
    ...selectedCoordsProps
  }

  const mapProps = {
    ...mapConfigProps,
    setOptions,
    setMarkers,
    mapContainerRef,
    geocoderRef,
    mapLoadedRef
  }

  return {
    mapProps,
    sidebarProps,
  }
}
