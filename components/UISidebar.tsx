import { Button, Drawer, Typography, TextField, InputLabel, Input, Slider, Box } from '@mui/material'
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
        setMarkers
        } = props
    return(
    <Drawer
    variant="permanent"
    style={{ width: '240px', flexShrink: 0 }}
>
    <Box
        sx={{ width: 240, padding: 2 }}
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
            color="primary" 
            type="submit"
            onClick={e => handleAddMarkerClick(
                e, 
                selectedCoordinates,
                mapInstance,
                waypoints,
                addMarkerBasedOnCoordinates,
                setMarkers,
            )}
            style={{ marginBottom: '16px' }}
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
                markers
            )}
            style={{ marginBottom: '16px' }}
            >
            Clear markers
        </Button>

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
    </Box>
</Drawer>
    )
}

export default UISidebar