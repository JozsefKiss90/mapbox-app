import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { ProfileProps } from "../types/types";
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
                style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}
            >
                <ToggleButton 
                    value="walking" 
                    aria-label="walking" 
                    style={{
                        borderRadius: '15px', 
                        width: '70px', 
                        padding: '5px 15px', 
                        fontSize: '0.9rem', 
                        border: '1px solid #586375', 
                        textTransform: 'none', 
                        margin: '0 5px'
                    }}>
                    Walking
                </ToggleButton>
                <ToggleButton 
                    value="cycling" 
                    aria-label="cycling" 
                    style={{
                        borderRadius: '15px', 
                        width: '70px', 
                        padding: '5px 15px', 
                        fontSize: '0.9rem', 
                        border: '1px solid #586375', 
                        textTransform: 'none', 
                        margin: '0 5px'
                    }}>
                    Cycling
                </ToggleButton>
                <ToggleButton 
                    value="driving" 
                    aria-label="driving" 
                    style={{
                        borderRadius: '15px', 
                        width: '70px', 
                        padding: '5px 15px', 
                        fontSize: '0.9rem', 
                        border: '1px solid #586375', 
                        textTransform: 'none', 
                        margin: '0 5px'                    
                    }}>
                    Driving
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    );
}

export default RouteProfile