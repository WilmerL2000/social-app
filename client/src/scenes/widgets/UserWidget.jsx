import {
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  AssignmentIndOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LinkedIn from '../../assets/linkedin.png';
import Twitter from '../../assets/twitter.png';
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import WidgetWrapper from '../../components/WidgetWrapper';
import UserWidgetSkeleton from '../../components/Skeleton/UserWidgetSkeleton';
import { BASE_URL } from '../../utils';

const UserWidget = ({ userId, picturePath }) => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  /**
   * This function retrieves user data from a server using a specified user ID and authorization token.
   */
  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!isNonMobileScreens) setIsMobileMenuToggled((prev) => !prev);
  }, [isNonMobileScreens]);

  if (!user) {
    return <UserWidgetSkeleton />;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween onClick={() => navigate(`/profile/${userId}`)}>
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  '&:hover': {
                    color: palette.primary.light,
                    cursor: 'pointer',
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends?.length} friends</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
        {!isNonMobileScreens && (
          <IconButton onClick={() => setIsMobileMenuToggled((prev) => !prev)}>
            <AssignmentIndOutlined />
          </IconButton>
        )}
      </FlexBetween>

      <Divider />
      {!isMobileMenuToggled && (
        <>
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <LocationOnOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{occupation}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box p="1rem">
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>
                Who&apos;s viwed your profile
              </Typography>
              <Typography color={main} fontWeight="500">
                {viewedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={medium}>Impressions of your post</Typography>
              <Typography color={main} fontWeight="500">
                {impressions}
              </Typography>
            </FlexBetween>
          </Box>
          <Divider />
          <Box p="1rem 0">
            <Typography fontSize="1rem" fontWeight="500" color={main} mb="1rem">
              Social Profiles
            </Typography>

            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="1rem">
                <img src={Twitter} alt="twitter" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Twitter
                  </Typography>
                  <Typography color={medium}>Social Network</Typography>
                </Box>
              </FlexBetween>
              <EditOutlined sx={{ color: main }} />
            </FlexBetween>

            <FlexBetween gap="1rem">
              <FlexBetween gap="1rem">
                <img src={LinkedIn} alt="linkedin" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    LinkedIn
                  </Typography>
                  <Typography color={medium}>Network Platform</Typography>
                </Box>
              </FlexBetween>
              <EditOutlined sx={{ color: main }} />
            </FlexBetween>
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default UserWidget;
