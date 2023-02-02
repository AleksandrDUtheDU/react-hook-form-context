import { Button } from '@mui/material';


export const CustomButton = ({ children, props }) => {

    return (
        <Button sx={{ mt: 2, mb: 3 }} type='submit' fullWidth variant='contained' {...props}>
            {children}
        </Button>
    );
}
