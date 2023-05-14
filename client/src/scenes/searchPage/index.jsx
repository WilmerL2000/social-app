import MainPageLayout from '../../components/Layouts/MainPageLayout';
import SearchWidget from '../widgets/SearchWidget';
import { Box, useMediaQuery } from '@mui/material';

export default function SearchPage() {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  return (
    <MainPageLayout>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <SearchWidget />
        </Box>
      </Box>
    </MainPageLayout>
  );
}
