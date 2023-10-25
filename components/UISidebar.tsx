import { Drawer, Box } from '@mui/material';
import SearchComponent from './SearchComponent';
import PlanRoute from './PlanRoute';
import ClearMarkers from './ClearMarkers';
import RouteProfile from './RouteProfile';
import RouteInfo from './RouteInfo';
import { UISidebarProps } from '../types/types';
import { useSidebarState } from '../hooks/useSidebarState';

const UISidebar = (props: UISidebarProps) => {
  const {
    routeColor,
    setRouteColor,
    routeThickness,
    setRouteThickness,
    routeProfile,
    setRouteProfile,
    handleSubmit
  } = useSidebarState({
    mapInstance: props.mapInstance,
    waypoints: props.waypoints,
    access_token: props.access_token,
    setRouteLength: props.setRouteLength,
    setRouteDuration: props.setRouteDuration
  });

  const mapConfigProps = {
    mapInstance: props.mapInstance,
    waypoints: props.waypoints,
    access_token: props.access_token
  };

  const routeConfigProps = {
    setRouteLength: props.setRouteLength,
    setRouteDuration: props.setRouteDuration
  }

  const designConfigProps = {
    routeColor,
    routeThickness,
  }

  return (
    <Drawer variant="permanent" style={{ width: '300px', flexShrink: 0 }}>
      <Box sx={{ width: 300, padding: '16px 0 16px 16px' }} role="presentation">
        <SearchComponent searchProps={{
          ...mapConfigProps,
          searchValue: props.searchValue,
          setSearchValue: props.setSearchValue,
          options: props.options,
          geocoderRef: props.geocoderRef,
          handleSubmit,
          setMarkers: props.setMarkers
        }} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <PlanRoute routeProps={{
            ...mapConfigProps,
            ...routeConfigProps,
            ...designConfigProps,
            routeProfile,
          }} />
          <ClearMarkers clearProps={{
            ...mapConfigProps,
            ...routeConfigProps,
            waypoints: props.waypoints,
            setSelectedCoordinates: props.setSelectedCoordinates,
            setSearchValue: props.setSearchValue,
            setMarkers: props.setMarkers,
            markers: props.markers,
          }} />
        </div>
        <RouteProfile profileProps={{
          routeProfile,
          setRouteProfile
        }} />
        <RouteInfo designProps={{
          ...designConfigProps,
          setRouteColor,
          setRouteThickness,
          routeLength: props.routeLength,
          routeDuration: props.routeDuration
        }} />
      </Box>
    </Drawer>
  );
};

export default UISidebar;
