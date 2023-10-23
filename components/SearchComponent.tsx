import { Autocomplete, TextField, Button, Typography } from "@mui/material";
import { handleInputChange, handleAddMarkerClick, addMarkerBasedOnCoordinates } from "../hooks/mapMethods";

interface Option {
    label: string
    coordinates: [number, number]
  }

const SearchComponent = ({searchProps}:any) => {

    const { 
        searchValue, 
        setSearchValue, 
        options, 
        geocoderRef, 
        handleSubmit, 
        setSelectedCoordinates,
        selectedCoordinates, 
        waypoints, 
        mapInstance,
        setMarkers
        } :any = searchProps    

    return (
        <>
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
        </>
    );
}

export default SearchComponent