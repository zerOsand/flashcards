import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#800000", // Maroon for primary actions
			light: "#a63a3a", // Lightened maroon for hover or focus
			contrastText: "#fff", // White for text on primary buttons
		},
		secondary: {
			main: "#f0f0f0", // Light complementary background color
		},
		background: {
			default: "#f4f4f4", // Default app background
			paper: "#fff", // Card and paper background
			accent: "#ffe5e5",
		},
		text: {
			primary: "#000", // Black for primary text
			secondary: "#fff", // Gray for secondary text
		},
		accent: {
			main: "#eec2c2", // Light pink for tag chips
			border: "#800000", // Border color for tags
			light: "#fff0f0",
		},
	},
	typography: {
		fontFamily: "'Inter', 'Arial', sans-serif",
		h1: { fontSize: "2rem", fontWeight: 700 },
		h2: { fontSize: "1.75rem", fontWeight: 700 },
		h3: { fontSize: "1.5rem", fontWeight: 500 },
		body1: { fontSize: "1rem", fontWeight: 400 },
		body2: { fontSize: "0.875rem", fontWeight: 400 },
		body3: { fontSize: "0.875rem", fontWeight: 'bold', color: '#800000' },
		body4: { fontSize: "0.875rem", fontWeight: 'light', color: '#888888' },
		button: { textTransform: "none", fontWeight: 600 },
	},
	shape: {
		borderRadius: 8, // Default border radius for components
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					padding: "8px 16px",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: 8,
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
				},
			},
		},
	},
});

theme.cardsList = {
	container: {
		padding: '8px',
		height: '100%',
		overflowY: 'auto',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gap: '8px',
	},
	item: (index, active) => ({
		borderRadius: '4px',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		backgroundColor:
		index === active
			? theme.palette.accent.main
			: theme.palette.background.paper,
		border: `2px solid ${
					index === active
						&& theme.palette.accent.border
					}`,
		height: '75px',
		overflow: 'hidden',
		boxSizing: 'border-box',
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		textAlign: "center",
		transition: "all 0.3s ease",
		"&:hover": {
			backgroundColor: theme.palette.background.default,
		},
	}),
};

theme.tagList = {
	container: {
		width: '100%',
		overflowY: 'auto',
		height: '110px'
	},
	grid: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '4px',
		margin: '4px',
	},
	item: (index, active) => ({
		padding: '0px 0px',
		width: 'fit-content',
		"&:hover": {
			backgroundColor: theme.palette.background.default,
		},
	}),
}


export default theme;
