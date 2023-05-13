import { Box, Skeleton, Typography } from '@mui/material';
import WidgetWrapper from '../WidgetWrapper';
import FlexBetween from '../FlexBetween';

const PostWidgetSkeleton = ({ isProfile }) => {
  return (
    <WidgetWrapper m={!isProfile ? '2rem 0' : '0 0 2rem 0'}>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween>
          <FlexBetween gap="1rem">
            <Skeleton variant="circular" width={60} height={60} />
            <Box>
              <Typography variant="h4">
                <Skeleton width={100} />
              </Typography>
              <Skeleton width={60} height={14} />
            </Box>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>

      <Skeleton width={200} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={270}
        style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
      />

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <Skeleton width={60} height={40} />
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <Skeleton width={60} height={40} />
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>

      <FlexBetween gap="0.5rem">
        <Skeleton width="100%" height="6rem" style={{ borderRadius: '2rem' }} />
        <Skeleton width={60} height={60} />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidgetSkeleton;
