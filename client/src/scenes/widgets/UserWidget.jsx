import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, TextField, IconButton } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState({ location: false, occupation: false });
  const [tempLocation, setTempLocation] = useState("");
  const [tempOccupation, setTempOccupation] = useState("");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  const handleEdit = (field) => {
    if (field === "location") {
      setTempLocation(location);
      setEditMode({ ...editMode, location: true });
    } else if (field === "occupation") {
      setTempOccupation(occupation);
      setEditMode({ ...editMode, occupation: true });
    }
  };

  const handleSave = async (field) => {
    let updatedData;
    if (field === "location") {
      updatedData = { location: tempLocation };
    } else if (field === "occupation") {
      updatedData = { occupation: tempOccupation };
    }
  
    try {
      console.log(`Sending update for ${field}:`, updatedData);
  
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
  
      const updatedUser = await response.json();
      console.log("Update successful, received updated user data:", updatedUser);
  
      setUser(updatedUser);
      setEditMode({ ...editMode, [field]: false });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          {editMode.location ? (
            <TextField
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: '80%' }}
            />
          ) : (
            <Typography color={medium}>{location}</Typography>
          )}
          <IconButton onClick={() => editMode.location ? handleSave("location") : handleEdit("location")}>
            {editMode.location ? <SaveOutlined /> : <EditOutlined />}
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          {editMode.occupation ? (
            <TextField
              value={tempOccupation}
              onChange={(e) => setTempOccupation(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: '80%' }}
            />
          ) : (
            <Typography color={medium}>{occupation}</Typography>
          )}
          <IconButton onClick={() => editMode.occupation ? handleSave("occupation") : handleEdit("occupation")}>
            {editMode.occupation ? <SaveOutlined /> : <EditOutlined />}
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="/assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="/assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="/assets/instagram.png" alt="instagram" height={"30px"} width={"25px"} />
            <Box>
              <Typography color={main} fontWeight="500">
                Instagram
              </Typography>
              <Typography color={medium}>Social Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="/assets/telegram.png" alt="telegram" height={"30px"} width={"25px"} />
            <Box>
              <Typography color={main} fontWeight="500">
                telegram
              </Typography>
              <Typography color={medium}>Social Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="/assets/facebook.png" alt="facebook" height={"30px"} width={"25px"} />
            <Box>
              <Typography color={main} fontWeight="500">
                facebook
              </Typography>
              <Typography color={medium}>Social platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
