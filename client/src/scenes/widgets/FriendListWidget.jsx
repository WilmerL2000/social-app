import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { setFriends } from '../../store';
import { BASE_URL } from '../../utils';
import { GroupOutlined } from '@mui/icons-material';
import FlexBetween from '../../components/FlexBetween';

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  /**
   * This function retrieves a user's friends from a server using a provided user ID and token, and
   * then dispatches the retrieved data to update the state.
   */
  const getFriends = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}/friends`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    if (!isNonMobileScreens) setIsMobileMenuToggled((prev) => !prev);
  }, [isNonMobileScreens]);

  return (
    <WidgetWrapper>
      <FlexBetween sx={{ mb: '1.5rem' }}>
        <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
          Friend List ({friends?.length})
        </Typography>
        <IconButton onClick={() => setIsMobileMenuToggled((prev) => !prev)}>
          <GroupOutlined />
        </IconButton>
      </FlexBetween>
      <Divider />

      {!isMobileMenuToggled && (
        <Box display="flex" flexDirection="column" gap="1.5rem" p="1rem 0">
          {!friends.length ? (
            <Typography
              color={palette.neutral.dark}
              variant="h6"
              fontWeight="300"
              sx={{ mb: '1rem' }}
            >
              No friends yet
            </Typography>
          ) : (
            friends?.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
            ))
          )}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
