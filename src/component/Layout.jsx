import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom'

export const Layout = () => {

    return (
        <Container
            maxWidth='md'
            sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <Box as='header'>
                <Typography align='center' component="h1" variant="h5">
                    Ультимативная форма
                </Typography>
            </Box>
            <Box as='main'>
                <Outlet />
            </Box>
        </Container>
    )
}