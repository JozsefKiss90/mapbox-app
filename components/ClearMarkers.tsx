import { Button } from "@mui/material";
import { clearMarkers } from "../hooks/mapMethods";

const ClearMarkers = ({ clearProps } : any) => {
    const {
        waypoints,
        setSelectedCoordinates,
        setSearchValue,
        setMarkers,
        markers,
        mapInstance,
        setRouteLength,
        setRouteDuration
    } = clearProps
    
    return (
        <Button 
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
            style={{ marginBottom: '16px' }}
            >
            Clear markers
        </Button>
    );
}

export default ClearMarkers