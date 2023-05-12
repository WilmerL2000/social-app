import {
  Box,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import WidgetWrapper from '../WidgetWrapper';
import FlexBetween from '../FlexBetween';

const UserWidgetSkeleton = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  return (
    <WidgetWrapper>
      {isNonMobileScreens ? (
        <>
          <FlexBetween gap="0.5rem" pb="1.1rem">
            <FlexBetween>
              <FlexBetween gap="1rem">
                <Skeleton variant="circular" width={60} height={60} />
                <Box>
                  <Typography variant="h4">
                    <Skeleton width={60} />
                  </Typography>
                  <Skeleton width={60} height={14} />
                </Box>
              </FlexBetween>
            </FlexBetween>
          </FlexBetween>

          <Divider />

          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <Typography>
                <Skeleton width={100} />
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <Typography>
                <Skeleton width={100} />
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box p="1rem">
            <FlexBetween mb="0.5rem">
              <Typography>
                <Skeleton width={250} />
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography>
                <Skeleton width={250} />
              </Typography>
            </FlexBetween>
          </Box>
          <Divider />
          <Box p="1rem 0">
            <Typography mb="1rem">
              <Skeleton width={100} />
            </Typography>

            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="1rem">
                <Box>
                  <Typography>
                    <Skeleton width={100} />
                  </Typography>
                  <Typography>
                    <Skeleton width={250} />
                  </Typography>
                </Box>
              </FlexBetween>
            </FlexBetween>

            <FlexBetween gap="1rem">
              <FlexBetween gap="1rem">
                <Box>
                  <Typography>
                    <Skeleton width={100} />
                  </Typography>
                  <Typography>
                    <Skeleton width={250} />
                  </Typography>
                </Box>
              </FlexBetween>
            </FlexBetween>
          </Box>
        </>
      ) : (
        <>
          <FlexBetween gap="0.5rem" pb="1.1rem">
            <FlexBetween>
              <FlexBetween gap="1rem">
                <Skeleton variant="circular" width={60} height={60} />
                <Box>
                  <Typography variant="h4">
                    <Skeleton width={60} />
                  </Typography>
                  <Skeleton width={60} height={14} />
                </Box>
              </FlexBetween>
            </FlexBetween>
          </FlexBetween>

          <Divider />
        </>
      )}
    </WidgetWrapper>
  );
};

export default UserWidgetSkeleton;
