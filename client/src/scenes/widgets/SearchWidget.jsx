import { Search } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from '@mui/material';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { BASE_URL } from '../../utils';

const SearchWidget = () => {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const { palette } = useTheme();
  const neutralLight = theme.palette.neutral.light;

  const { q = '' } = queryString.parse(location.search);

  const [searchText, setSearchText] = useState(q);

  const handleSearch = async () => {
    navigate(`?q=${searchText}`);

    const response = await fetch(`${BASE_URL}/users/${_id}/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm: q }),
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    if (q) handleSearch();
  }, [q]);

  return (
    <WidgetWrapper>
      <FlexBetween
        backgroundColor={neutralLight}
        borderRadius="9px"
        padding="0.1rem 1.5rem"
        sx={{ mb: '1rem' }}
      >
        <InputBase
          placeholder="Search..."
          sx={{
            width: '100%',
            borderRadius: '2rem',
            padding: '0.5rem ',
          }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <IconButton onClick={handleSearch} disabled={!searchText}>
          <Search sx={{ fontSize: '25px' }} />
        </IconButton>
      </FlexBetween>
      <Box display="flex" flexDirection="column" gap="1.5rem" p="1rem 0">
        {!users?.length ? (
          <>
            <Divider />
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{
                mb: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              No users found
            </Typography>
          </>
        ) : (
          users?.map((friend) => (
            <>
              <Divider />
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
            </>
          ))
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default SearchWidget;
