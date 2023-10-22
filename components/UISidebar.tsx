import { Button, Drawer, Typography, TextField, InputLabel, Input, Slider, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import Autocomplete from '@mui/lab/Autocomplete'
import { clearMarkers, handleInputChange, handleSubmit, handleRoute, handleAddMarkerClick, addMarkerBasedOnCoordinates 
} from '../hooks/mapMethods';
interface Option {
    label: string;
    coordinates: [number, number];
  }
  

const UISidebar = ({props}:any) => {

    const {
        options, 
        setSearchValue,
        geocoderRef,
        searchValue, 
        setSelectedCoordinates, 
        selectedCoordinates,
        mapInstance, 
        waypoints,
        access_token,
        routeColor,
        setRouteColor,
        setRouteLength,
        routeThickness,
        setRouteThickness,
        routeLength,
        markers,
        setMarkers,
        routeProfile,
        setRouteProfile,
        setRouteDuration,
        routeduration
        } = props
    return(
    <Drawer
    variant="permanent"
    style={{ width: '240px', flexShrink: 0 }}
    >
        <Box
            sx={{ width: 260, padding: 2 }}
            role="presentation"
        >
            <Typography variant="h6" gutterBottom>
                Map Settings
            </Typography>
            <form onSubmit={(e) =>handleSubmit(e, searchValue, geocoderRef)}>
                <Autocomplete
                    value={searchValue}
                    onInputChange={(event, newValue) => setSearchValue(newValue)}
                    freeSolo
                    fullWidth
                    options={options}
                    getOptionLabel={(option: string | Option) => typeof option === "string" ? option : option.label}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            fullWidth 
                            label="Search" 
                            variant="outlined" 
                            onChange={(e) => handleInputChange(e, setSearchValue, geocoderRef)}
                            style={{ marginBottom: '16px' }}
                        />
                    )}

                    onChange={(event, newValue: string | Option | null) => {
                        if (typeof newValue === 'object' && newValue && newValue.coordinates) {
                        setSelectedCoordinates(newValue.coordinates)
                        } else {
                            setSelectedCoordinates(null)
                        }
                    }} 
                    />
                <Button 
                        variant="contained" 
                        type="submit"
                        onClick={e => handleAddMarkerClick(
                            e, 
                            selectedCoordinates,
                            mapInstance,
                            waypoints,
                            addMarkerBasedOnCoordinates,
                            setMarkers,
                        )}
                        style={{ marginBottom: '16px', backgroundColor: '#02d12c' }}
                    >
                        Add Marker
                </Button>
            </form>
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
                    Walking
                </ToggleButton>
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
            <InputLabel>Route Color</InputLabel>
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
                {routeduration}
            </Typography>
        </Box>
    </Drawer>
    )
}

export default UISidebar