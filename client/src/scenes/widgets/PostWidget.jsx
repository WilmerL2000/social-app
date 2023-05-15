import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from '@mui/icons-material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from '../../components/FlexBetween';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { setPost } from '../../store';
import { BASE_URL } from '../../utils';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isProfile,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [comment, setComment] = useState('');

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  /**
   * This function sends a PATCH request to update the like count of a post and dispatches the updated
   * post to the Redux store.
   */
  const patchLike = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  /**
   * This function sends a PATCH request to update a comment on a post and then updates the post with
   * the new comment.
   */
  const patchComment = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });
    setComment('');
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  /**
   * The function checks if a double-click event occurred and calls the patchLike function if it did.
   */
  const clickHandler = (event) => {
    if (event.detail == 2) {
      patchLike();
    }
  };

  return (
    <WidgetWrapper m={!isProfile ? '2rem 0' : '0 0 2rem 0'}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          loading="lazy"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={picturePath}
          onClick={clickHandler}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      <FlexBetween gap="0.5rem">
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
        <IconButton disabled={!comment} onClick={patchComment}>
          <SendOutlinedIcon sx={{ color: !comment ? medium : primary }} />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments?.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
