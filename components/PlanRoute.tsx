import { Button } from "@mui/material";
import { handleRoute } from "../hooks/mapMethods";
import { RouteProps } from "../types/types";
import styles from '../styles/Mapbox.module.css' 

const PlanRoute = ({ routeProps } : RouteProps) => {

    const {
        mapInstance,
        waypoints,
        setRouteLength,
        access_token,
        routeColor,
        routeThickness,
        routeProfile,
        setRouteDuration
    } = routeProps
    
    return (
        <Button 
            className={styles.buttons}
            variant="contained" 
            color="secondary" 
            disabled={waypoints.current.length < 2}
            onClick={e=> handleRoute(
                e,
                mapInstance,
                waypoints,
                setRouteLength,
                access_token,
                routeColor,
                routeThickness,
                routeProfile,
                setRouteDuration
                )}
            style={{marginBottom:'16px'}}
        > 
            Plan Route
        </Button>
    );
}

export default PlanRoute;