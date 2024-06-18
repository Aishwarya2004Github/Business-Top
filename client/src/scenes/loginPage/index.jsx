import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const handleWrongInput = () => {
    toast.error("Invalid username or password!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Box>
      <ToastContainer />
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
         <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ height: "3rem", marginRight: "0.5rem" }} // Adjust the height here
          />
          Business Top
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Business Top, the Social Media for Business!
        </Typography>
        <Form handleWrongInput={handleWrongInput} />
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;