import { Box, Divider, Skeleton, Typography } from '@mui/material';
import FlexBetween from '../FlexBetween';

const FriendSkeleton = () => {
  return (
    <>
      <Divider />
      <FlexBetween gap="0.5rem">
        <FlexBetween>
          <FlexBetween gap="1rem">
            <Skeleton variant="circular" width={60} height={60} />
            <Box>
              <Typography variant="h4">
                <Skeleton width={80} />
              </Typography>
              <Skeleton width={60} height={14} />
            </Box>
          </FlexBetween>
        </FlexBetween>
        <Skeleton variant="circular" width={40} height={40} />
      </FlexBetween>
    </>
  );
};

export default FriendSkeleton;
