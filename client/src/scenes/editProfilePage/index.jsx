import MainPageLayout from '../../components/Layouts/MainPageLayout';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import Form from './Form';

export default function EditProfile() {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const theme = useTheme();

  return (
    <MainPageLayout>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form />
      </Box>
    </MainPageLayout>
  );
}
