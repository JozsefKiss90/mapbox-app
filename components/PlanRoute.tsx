import { Button } from "@mui/material";
import { handleRoute } from "../hooks/mapMethods";
import { RouteProps } from "../types/types";

const PlanRoute: React.FC<RouteProps> = ({ 
    routeProps
}) => {
    const { 
        mapInstance,
        waypoints,
        access_token,
        setRouteLength, 
        routeColor,
        routeThickness,
        routeProfile,
        setRouteDuration 
    } = routeProps;
    
    return (
        <Button 
            variant="contained" 
            color="secondary" 
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
            style={{ marginBottom: '16px' }}
        >
            Plan Route
        </Button>
    );
}

export default PlanRoute;