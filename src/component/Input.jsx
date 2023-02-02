import { TextField } from '@mui/material';
import { forwardRef } from 'react';

export const Input = forwardRef((props, ref) => {
    return (
        <TextField
            variant='outliner'
            margin='normal'
            InputRef={ref}
            fullWidth
            // type="number"
            // label="Кол-во"
            {...props}
        />
    )
})