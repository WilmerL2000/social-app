/**
 * The function formats an array of friend objects by selecting specific properties.
 * @param [friends] - An array of objects representing friends, where each object has the following
 * properties:
 */
export const formatFriends = (friends = []) =>
  friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
      _id,
      firstName,
      lastName,
      occupation,
      location,
      picturePath,
    })
  );
