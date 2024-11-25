import { Nav, NavLink, NavLogo, NavMenu } from "./navbarElements";
import UmassLogo from "../../umassLogo";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

import { styled } from "@mui/system";
const Navbars = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.primary.contrastText, // Maroon from your theme
	color: theme.palette.text.primary, // Dark text color
}));
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
