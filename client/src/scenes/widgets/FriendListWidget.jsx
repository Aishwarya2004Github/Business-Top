import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import { useNavigate } from "react-router-dom";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends) || [];

  const navigate = useNavigate(); // useNavigate hook from react-router-dom

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}/friends`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch friends");
        }
        const data = await response.json();
        dispatch(setFriends(data));
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    getFriends(); // Call getFriends inside useEffect to fetch friends on component mount
  }, [userId, token, dispatch]); // Depend on userId, token, and dispatch only

  const handleFriendClick = (friendId) => {
    // Example of using navigate for programmatically navigating
    navigate(`/friends/${friendId}`);
  };

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            onClick={() => handleFriendClick(friend._id)}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
