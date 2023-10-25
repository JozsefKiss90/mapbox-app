import { Autocomplete, TextField, Button, Typography, IconButton } from "@mui/material"
import { handleInputChange, handleAddMarkerClick, addMarkerBasedOnCoordinates } from "../hooks/mapMethods"
import { SearchProps, Option } from "../types/types"
import { useState } from "react"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import React from "react"
import styles from '../styles/Mapbox.module.css'

const SearchComponent = ({searchProps} : SearchProps) => {

    const [searchValueElements, setSearchValueElements] = useState<string[]>([''])
    const [selectedCoordinateElements, setSelectedCoordinateElements] = useState<Array<[number, number] | null>>([null])
    const { 
        searchValue, 
        setSearchValue, 
        options, 
        geocoderRef, 
        handleSubmit, 
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
        {searchValueElements.map((value, index) => (
            <React.Fragment key={index}>
            <div className={styles.searchBar}>
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
                        label="Enter an address or location" 
                        variant="outlined" 
                        onChange={(e) => handleInputChange(e, setSearchValue, geocoderRef)}
                        style={{ marginBottom: '16px' }}
                    />
                )}

                onChange={(event, newValue: string | Option | null) => {
                    const updatedCoordinates = [...selectedCoordinateElements]
                    if (typeof newValue === 'object' && newValue && newValue.coordinates) {
                        updatedCoordinates[index] = newValue.coordinates
                    } else {
                        updatedCoordinates[index] = null
                    }
                    setSelectedCoordinateElements(updatedCoordinates)
                }}
                />
                {searchValueElements.length > 1 && index > 0 && (
                    <IconButton 
                        color="secondary" 
                        style={{marginBottom:'10px'}}
                        onClick={() => {
                            const newSearchValues = [...searchValueElements]
                            newSearchValues.splice(index, 1)
                            setSearchValueElements(newSearchValues)
                            const newCoordinatesList = [...selectedCoordinateElements]
                            newCoordinatesList.splice(index, 1)
                            setSelectedCoordinateElements(newCoordinatesList)
                        }}
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                </div>
                </React.Fragment>
            ))}
            <IconButton 
                className={styles.addressButton}
                color="primary" 
                disabled={selectedCoordinateElements[selectedCoordinateElements.length -1] === null}
                onClick={() => {
                    setSearchValueElements([...searchValueElements, ''])
                    setSelectedCoordinateElements([...selectedCoordinateElements, null])
                }}
            >
                <AddCircleIcon/>
                <Typography variant="body1" style={{ marginLeft: '8px' }}>
                    Add new address
                </Typography>
            </IconButton>
            <Button 
                className={styles.buttons}
                variant="contained" 
                type="submit"
                onClick={e => {
                    e.preventDefault()
                    selectedCoordinateElements.forEach(coords => {
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
                style={{backgroundColor: '#02d12c'}}
            >
                Add Marker <i style={{textTransform:'lowercase', fontStyle:'normal'}}>(s)</i>
            </Button>
        </form>
        </>
    )
}

export default SearchComponent


