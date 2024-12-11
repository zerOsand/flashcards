import { Box, Button, Typography } from '@mui/material/';
import DefaultPopup from "../components/Popup";

/**
 * `ConfirmationPopup` is a React component that renders a confirmation dialog with a message and options to cancel or confirm.
 * 
 * @param {boolean} open - A boolean that controls whether the popup is visible or not.
 * @param {Function} onCancel - A function that is called when the cancel button is clicked.
 * @param {Function} onConfirm - A function that is called when the confirm button is clicked.
 * @param {string} message - The message displayed inside the popup.
 * 
 * @returns {JSX.Element} A `DefaultPopup` component with confirmation options.
 */
const ConfirmationPopup = ({ open, onCancel, onConfirm, message }) => {
    return (
        <DefaultPopup
            open={open}
            onClose={onConfirm}
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
