import { Typography, Input, Slider } from "@mui/material";
import { DesignProps } from "../types/types";

const RouteDesign = ({designProps}: DesignProps) => {
    const {
        routeColor,
        setRouteColor,
        routeThickness,
        setRouteThickness,
        routeLength,
        routeDuration
    } = designProps

    return (
        <>
            <Typography gutterBottom>
                Route color
            </Typography>
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
            <Typography color="textSecondary">
                {routeDuration}
            </Typography>
        </>
    );
}

export default RouteDesign