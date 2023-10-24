import { Autocomplete, TextField, Button, Typography, IconButton } from "@mui/material";
import { handleInputChange, handleAddMarkerClick, addMarkerBasedOnCoordinates } from "../hooks/mapMethods";
import { SearchProps, Option } from "../types/types"
import { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const SearchComponent = ({searchProps} : SearchProps) => {

    const [searchValues, setSearchValues] = useState<string[]>(['']);
    const [selectedCoordinatesList, setSelectedCoordinatesList] = useState<Array<[number, number] | null>>([null]);

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
        } = searchProps    

    return (
        <>
        <Typography variant="h6" gutterBottom>
            Map Settings
        </Typography>
        <form onSubmit={(e) =>handleSubmit(e, searchValue, geocoderRef)}>
        {searchValues.map((value, index) => (
            <Autocomplete
                key={index}
                value={value}
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
                    const updatedCoordinates = [...selectedCoordinatesList];
                    if (typeof newValue === 'object' && newValue && newValue.coordinates) {
                        updatedCoordinates[index] = newValue.coordinates;
                    } else {
                        updatedCoordinates[index] = null;
                    }
                    setSelectedCoordinatesList(updatedCoordinates);
                }}
                
                />
            ))}
            <IconButton 
                color="primary" 
                onClick={() => {
                    setSearchValues([...searchValues, '']);
                    setSelectedCoordinatesList([...selectedCoordinatesList, null]);
                }}
                
            >
                <AddCircleIcon/>
                <Typography variant="body1" style={{ marginLeft: '8px' }}>
                    Add new address
                </Typography>
            </IconButton>
            <Button 
                variant="contained" 
                type="submit"
                onClick={e => {
                    e.preventDefault();
                    selectedCoordinatesList.forEach((coords, i) => {
                        if (coords) {
                            handleAddMarkerClick(
                                e, 
                                coords,
                                mapInstance,
                                waypoints,
                                addMarkerBasedOnCoordinates,
                                setMarkers
                            );
                        }
                    });
                }}
                style={{ marginBottom: '16px', backgroundColor: '#02d12c' }}
            >
                Add Marker
            </Button>
        </form>
        </>
    );
}

export default SearchComponent