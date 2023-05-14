import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../store';
import PostWidget from './PostWidget';
import { BASE_URL } from '../../utils';
import PostWidgetSkeleton from '../../components/Skeleton/PostWidgetSkeleton';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  /**
   * This function retrieves posts from a server using a GET request and sets them in the state using
   * dispatch.
   */
  const getPosts = async () => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  /**
   * This function retrieves posts for a specific user using their user ID and authorization token.
   */
  const getUserPosts = async () => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/posts/${userId}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {loading ? (
        <PostWidgetSkeleton isProfile={isProfile} />
      ) : posts.length ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              isProfile={isProfile}
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <WidgetWrapper>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: '0.5rem' }}
          >
            <Typography variant="h4" color={dark} fontWeight="500">
              No posts
            </Typography>
          </Box>
        </WidgetWrapper>
      )}
    </>
  );
};

export default PostsWidget;
