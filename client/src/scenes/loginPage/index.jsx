import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

export default function Login() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  return <div>LoginPage</div>;
}
