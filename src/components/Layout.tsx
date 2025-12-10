import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer', mr: 2, whiteSpace: 'nowrap' }}
                        onClick={() => navigate('/')}
                    >
                        E-commerce
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="inherit" onClick={() => navigate('/')}>Products</Button>
                        <Button color="inherit" onClick={() => navigate('/checkout')}>Checkout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ mt: 10, mb: 4 }}>
                {children}
            </Container >
        </>
    );
};

export default Layout;
