import { Box, Button, Typography } from '@mui/material/';
import DefaultPopup from "../components/Popup";
import { defaultPopupStyle } from "../utils/styles";


const ConfirmationPopup = ({ open, onCancel, onConfirm, message }) => {
	return (
		<DefaultPopup
			open={open}
			onClose={onCancel}
		>
			<Typography variant="h2">Confirmation</Typography>
			<Typography variant="body1" sx={{ marginTop: '5px' }} >{message}</Typography>
			<Box sx={{ display: 'flex', marginTop: '30px', justifyContent: 'flex-end', padding: '10px', width: '100%' }}>
				<Button disableRipple variant="outlined"
						onClick={onCancel}
		                sx={{
        	    	        fontSize: '0.875rem',
            	    	    padding: '6px 12px',
		                    marginRight: '8px',
        		        }}
				>
						Cancel
				</Button>
				<Button disableRipple variant="contained"
						onClick={onConfirm}
		                sx={{
        	    	        fontSize: '0.875rem',
            	    	    padding: '6px 12px',
		                    marginRight: '8px',
        		        }}
				>
						Confirm
				</Button>
			</Box>
		</DefaultPopup>
	);
};

export default ConfirmationPopup;
