import { Autocomplete, TextField, Button, Typography, IconButton } from "@mui/material"
import { handleInputChange, handleAddMarkerClick, addMarkerBasedOnCoordinates } from "../hooks/mapMethods"
import { SearchProps, Option } from "../types/types"
import { useState } from "react"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'

const SearchComponent = ({searchProps} : SearchProps) => {

    const [searchValues, setSearchValues] = useState<string[]>([''])
    const [selectedCoordinatesList, setSelectedCoordinatesList] = useState<Array<[number, number] | null>>([null])
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
    
    console.log(waypoints)

    return (
        <>
        <Typography variant="h6" gutterBottom>
            Map Settings
        </Typography>
        <form onSubmit={(e) =>handleSubmit(e, searchValue, geocoderRef)}>
        {searchValues.map((value, index) => (
            <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
                key={index}
                value={value}
                style={{width:'250px'}}
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
                    const updatedCoordinates = [...selectedCoordinatesList]
                    if (typeof newValue === 'object' && newValue && newValue.coordinates) {
                        updatedCoordinates[index] = newValue.coordinates
                    } else {
                        updatedCoordinates[index] = null
                    }
                    setSelectedCoordinatesList(updatedCoordinates)
                }}
                />
                {searchValues.length > 1 && index > 0 && (
                    <IconButton 
                        color="secondary" 
                        style={{marginBottom:'10px'}}
                        onClick={() => {
                            const newSearchValues = [...searchValues]
                            newSearchValues.splice(index, 1)
                            setSearchValues(newSearchValues)
                            const newCoordinatesList = [...selectedCoordinatesList]
                            newCoordinatesList.splice(index, 1)
                            setSelectedCoordinatesList(newCoordinatesList)
                        }}
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                </div>
                </>
            ))}
            <IconButton 
                color="primary" 
                disabled={selectedCoordinatesList[selectedCoordinatesList.length -1] === null}
                onClick={() => {
                    setSearchValues([...searchValues, ''])
                    setSelectedCoordinatesList([...selectedCoordinatesList, null])
                }}
                style={{marginBottom:'13px', padding:'0'}}
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
                    e.preventDefault()
                    selectedCoordinatesList.forEach((coords, i) => {
                        if (coords) {
                            handleAddMarkerClick(
                                e, 
                                coords,
                                mapInstance,
                                waypoints,
                                addMarkerBasedOnCoordinates,
                                setMarkers
                            )
                        }
                    })
                }}
                style={{ marginBottom: '16px', backgroundColor: '#02d12c', width:'160px' }}
            >
                Add Marker
            </Button>
        </form>
        </>
    )
}

export default SearchComponent


