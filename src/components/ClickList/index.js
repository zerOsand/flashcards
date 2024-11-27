import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ClickList = ({ active, list, item, event, prependItem }) => {
	const theme = useTheme();

	return (
		<Box sx={{ width: "100%", padding: 2 }}>
			{/* Prepend any additional item, like the AddFlashcard */}
			{prependItem && prependItem()}

			<Grid container spacing={2}>
				{list.map((value, index) => (
					<Grid item xs={6} key={index}>
						<Box
							onClick={() => event(index)}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								padding: "12px 16px", // Uniform padding
								backgroundColor:
									index === active
										? theme.palette.accent.main
										: theme.palette.background.paper,
								border: `2px solid ${
									index === active
										? theme.palette.accent.border
										: theme.palette.background.default
								}`,
								borderRadius: "10px", // Rounded corners
								boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
								cursor: "pointer",
								textAlign: "center",
								transition: "all 0.3s ease",
								"&:hover": {
									backgroundColor: theme.palette.background.default,
								},
							}}
						>
							<Typography
								sx={{
									fontFamily: theme.typography.fontFamily,
									fontSize: theme.typography.body1.fontSize,
									fontWeight: index === active ? 600 : 400,
									color:
										index === active
											? theme.palette.primary.main
											: theme.palette.text.primary,
								}}
							>
								{value.front}
							</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ClickList;
