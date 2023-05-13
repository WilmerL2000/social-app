import MainPageLayout from './Layouts/MainPageLayout';
import NotFound from '../assets/404-not-found.png';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserNotFound = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <MainPageLayout>
      <Box
        justifyContent="center"
        alignItems="center"
        width="100%"
        padding="2rem 6%"
        display="flex"
        flexDirection="column"
      >
        <img
          src={NotFound}
          width={isNonMobileScreens ? '70%' : '100%'}
          height="auto"
          alt="Not Found"
        />
        <Box width="40%">
          <Button
            fullWidth
            type="submit"
            sx={{
              m: '2rem 0',
              p: '1rem',
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              '&:hover': { color: palette.primary.main },
            }}
            onClick={() => navigate('/home')}
          >
            GO BACK HOME
          </Button>
        </Box>
      </Box>
    </MainPageLayout>
  );
};

export default UserNotFound;
