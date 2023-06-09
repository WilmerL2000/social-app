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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import { loginSchema, registerSchema } from '../../schemas';
import { setLogin } from '../../store';
import { BASE_URL, fileUpload } from '../../utils';
import { toast } from 'react-toastify';

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

export default function Form() {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';
  const [loading, setLoading] = useState(false);
  /**
   * This function logs in a user by sending a POST request to a server with user credentials, resets
   * the form, and sets the user's login information in the state.
   */
  const login = async (values, onSubmitProps) => {
    setLoading(true);
    const loggedInResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedIn.msg) {
      toast.error(loggedIn.msg);
    }

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      setLoading(false);
      navigate('/home');
    }
  };

  /**
   * This function registers a user by sending their form data and image to a server endpoint and then
   * resets the form.
   */
  const register = async (values, onSubmitProps) => {
    setLoading(true);
    let form = { ...values };

    const resp = await fileUpload(values.picture);
    form = { ...values, picturePath: resp };

    const savedUserResponse = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    });

    const savedUser = await savedUserResponse.json();

    setLoading(false);
    if (!savedUser.error) {
      onSubmitProps.resetForm();
      setPageType('login');
      toast.success('Successful registration');
    }
  };

  /**
   * The function handles form submission for login and registration.
   */
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
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
              </>
            )}
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
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
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
                {isLogin ? 'LOGIN' : 'REGISTER'}
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

            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login');
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}
