import { DarkMode, LightMode } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import FlexBetween from '../../components/FlexBetween';
import { setMode } from '../../store';
import Form from './Form';
export default function Login() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const dispatch = useDispatch();
  const dark = theme.palette.neutral.dark;

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <FlexBetween>
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Friendify
          </Typography>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontsize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontsize: '25px' }} />
            )}
          </IconButton>
        </FlexBetween>
      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome to Friendify, the Social Media for FriendPaths
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}
