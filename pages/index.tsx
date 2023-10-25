import { NextPage } from 'next';
import { useMapState } from '../hooks/useMapState';
import UISidebar from '../components/UISidebar';
import MapComponent from '../components/MapComponent';

const Home: NextPage = () => {
  const {
    mapProps,
    sidebarProps,
  } = useMapState();

  return (
    <div style={{ display: 'flex' }}>
      <UISidebar {...sidebarProps} />
      <MapComponent 
        {...mapProps}
      />
    </div>
  );
};

export default Home;
