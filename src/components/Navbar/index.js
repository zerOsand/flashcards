import UmassLogo from "../../umassLogo";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

/**
 * Styled `AppBar` for the custom navbar.
 * Uses the theme's primary contrast color for the background and primary text color for the text.
 * 
 * @returns {JSX.Element} A styled AppBar component.
 */
const Navbars = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.primary.contrastText, // Maroon from your theme
	color: theme.palette.text.primary, // Dark text color
}));

/**
 * Using MUI, displays:
 * - A disabled logo button (`IconButton`), which can be enabled or customized.
 * - A title displayed in the center of the navbar.
 * 
 * @returns {JSX.Element} The navigation bar with the logo and title.
 */
const Navbar = () => {
	return (
		<>
			<Navbars position="static" elevation={1}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						disabled={ true }
					>
						<UmassLogo />
					</IconButton>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						UMASS - CS520
					</Typography>
				</Toolbar>
			</Navbars>
		</>
	);
};

export default Navbar;
