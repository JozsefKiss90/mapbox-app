// MapInitializer.tsx
import mapboxgl from 'mapbox-gl'

const initializeMap = (
    mapContainer: HTMLDivElement | null,
    addMarkerCallback: (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => void,
    setMapInstanceCallback: (map: mapboxgl.Map) => void
) => {
    const map = new mapboxgl.Map({
        container: mapContainer!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [17.9115, 47.0910], 
        zoom: 12
    }) as any

    map.on('load', () => {
        setMapInstanceCallback(map)
    })

    map.on('click', (event: any) => addMarkerCallback(event))

    return () => {
        map.remove()
        map.getLayer('markers').clear()
    }
}

export default initializeMap
