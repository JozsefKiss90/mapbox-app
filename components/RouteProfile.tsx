import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { ProfileProps } from "../types/types";
import styles from '../styles/Sidebar.module.css'

const RouteProfile = ({profileProps}:ProfileProps) => {
    const {
        routeProfile,
        setRouteProfile
    } = profileProps
    
    return (
        <>
        <Typography gutterBottom>
            Route Profile
            </Typography>
            <ToggleButtonGroup
                value={routeProfile}
                exclusive
                onChange={(event, newProfile) => setRouteProfile(newProfile)}
                aria-label="route profile"
                size="small"
                className={styles.toggleButtonGroup}
            >
                <ToggleButton 
                    value="walking" 
                    aria-label="walking" 
                    className={styles.ToggleButton}
                >
                    Walking
                </ToggleButton>
                <ToggleButton 
                    value="cycling" 
                    aria-label="cycling" 
                    className={styles.ToggleButton}
                >
                    Cycling
                </ToggleButton>
                <ToggleButton 
                    value="driving" 
                    aria-label="driving" 
                    className={styles.ToggleButton}
                >
                    Driving
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    );
}

export default RouteProfile