import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MainPageLayout from '../../components/Layouts/MainPageLayout';
import UserNotFound from '../../components/UserNotFound';
import { BASE_URL } from '../../utils';
import FriendListWidget from '../widgets/FriendListWidget';
import PostsWidget from '../widgets/PostsWidget';
import UserWidget from '../widgets/UserWidget';

export default function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

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
  }, [userId]);

  if (user?.message) return <UserNotFound />;

  return (
    <MainPageLayout>
      {user && (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? 'flex' : 'block'}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <UserWidget userId={userId} picturePath={user?.picturePath} />
            <Box m="2rem 0" />
            <FriendListWidget userId={userId} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? '42%' : undefined}
            mt={isNonMobileScreens ? undefined : '2rem'}
          >
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      )}
    </MainPageLayout>
  );
}
