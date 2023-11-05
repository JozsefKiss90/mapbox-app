import { Button } from "@mui/material";
import { clearMarkers } from "../hooks/mapMethods";
import { ClearProps } from "../types/types"; 
import styles from '../styles/Mapbox.module.css'

const ClearMarkers = ({ clearProps } : ClearProps) => {
    const {
        waypoints,
        mapInstance,
        setSelectedCoordinates, 
        setSearchValue,
        setMarkers,
        markers,
        setRouteLength,
        setRouteDuration
    } = clearProps
    
    return (
        <Button 
            className={styles.buttons}
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={markers.length===0}
            onClick={(e)=> clearMarkers(
                e,
                waypoints,
                setSelectedCoordinates,
                setSearchValue,
                setMarkers,
                markers,
                mapInstance,
                setRouteLength,
                setRouteDuration
            )}
            style={{marginBottom:'16px'}}
        >
            Clear markers
        </Button>
    );
}

export default ClearMarkers