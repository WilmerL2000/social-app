import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import { updateProfileSchema } from '../../schemas';
import { setUser } from '../../store';
import { BASE_URL, fileUpload } from '../../utils';

export default function Form() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const dispatch = useDispatch();

  const { palette } = useTheme();

  if (!user) {
    return null;
  }

  /**
   * This function handles the submission of a form, including uploading a file and sending a PATCH
   * request to update a user's profile information.
   */
  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    let form = { ...values };

    if (values.picture) {
      const resp = await fileUpload(values.picture);
      form = { ...values, picturePath: resp };
    }

    const response = await fetch(`${BASE_URL}/auth/${user._id}/edit-profile`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    });

    const updatedUser = await response.json();
    updatedUser.error
      ? toast.error(updatedUser.error)
      : toast.success('Profile updated successfully');

    if (updatedUser) {
      onSubmitProps.setFieldValue('picturePath', updatedUser.picturePath);
      onSubmitProps.setFieldValue('picture', '');
      dispatch(setUser({ user: updatedUser }));
      setLoading(false);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={user}
      validationSchema={updateProfileSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Box display="flex" flexDirection="column" gap="3rem">
          <Box display="flex" alignItems="center" justifyContent="center">
            <UserImage image={values.picturePath} size="100px" />
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              ></TextField>
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: 'span 4' }}
              />
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue('picture', acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            </Box>

            {/* BUTTONS */}
            <Box>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: '2rem 0',
                    p: '1rem',
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    '&:hover': { color: palette.primary.main },
                  }}
                  disabled={loading}
                >
                  Update
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
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
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
}
