export const styles = {

    // --- blur the background
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)', 
        },
    
    // --- design the modal for the popup
        modal: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
        },
    
    // --- styles for the content inside of the modal
    
        // this is for the text areas (front and back); just make the padding to look nice
        inputContainer: {
            marginBottom: '20px', 
        },
        
        // this is to keep the text above each text box and make look good
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
        },
    
        // fix the textarea sizes and dont let the users change it
        textarea: {
            width: '80%', 
            height: '100px', 
            padding: '10px',
            borderRadius: '4px', 
            border: '1px solid #ccc', 
            fontSize: '16px', 
            resize: 'none',
        },
    
        // this is to put buttons in corners look nice
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '10px',
        },
    
        // design for save button
        saveButton: {
            backgroundColor: '#49a658', // green
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px',
        },
    
        // design for cancel button (maybe make it a lighter red? idk up2u guys)
        cancelButton: {
            backgroundColor: '#b53550', // red
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px',
        },
    };
    