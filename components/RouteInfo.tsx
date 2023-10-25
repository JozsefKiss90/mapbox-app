import { Typography, Input, Slider } from "@mui/material";
import { DesignProps } from "../types/types";
import styles from '../styles/Mapbox.module.css'
const RouteInfo = ({designProps}: DesignProps) => {
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
            <Typography
                style={{ marginTop: '16px'}}
            >
                Route color
            </Typography>
            <Input 
                className={styles.disablePseudoElements}
                type="color" 
                value={routeColor} 
                fullWidth
                onChange={(e) => setRouteColor(e.target.value)}
                style={{ marginBottom: '6px', cursor: 'pointer', padding:'0 20px 0 0'}}
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
                style={{ marginBottom: '16px', width:'260px'}}
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

export default RouteInfo