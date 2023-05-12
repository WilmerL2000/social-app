import Navbar from '../../scenes/navbar';
import { Box } from '@mui/material';

const MainPageLayout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
};

export default MainPageLayout;
