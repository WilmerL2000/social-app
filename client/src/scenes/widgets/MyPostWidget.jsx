import {
  DeleteOutlined,
  EditOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import WidgetWrapper from '../../components/WidgetWrapper';
import { setPosts } from '../../store';
import { BASE_URL } from '../../utils';
import Zoom from '@mui/material/Zoom';
import { toast } from 'react-toastify';

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [loading, setLoading] = useState(false);

  /**
   * This function handles the submission of a post with optional image to a server and updates the
   * state accordingly.
   */
  const handlePost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', post);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    if (posts) {
      dispatch(setPosts({ posts }));
      setLoading(false);
      toast.success('Successfully published');
    }
    setImage(null);
    setPost('');
    setIsImage((prev) => !prev);
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <Tooltip TransitionComponent={Zoom} arrow title="Add picture">
          <FlexBetween
            gap="0.25rem"
            onClick={() => setIsImage(!isImage)}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            <ImageOutlined />
            <Typography>Image</Typography>
          </FlexBetween>
        </Tooltip>
        <FlexBetween gap="0.25rem">
          <MoreHorizOutlined sx={{ color: mediumMain }} />
        </FlexBetween>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            disabled={!post || !image || loading}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: '3rem',
            }}
          >
            POST
          </Button>
          {loading && (
            <CircularProgress
              size={20}
              sx={{
                position: 'absolute',
                color: 'inherit',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
