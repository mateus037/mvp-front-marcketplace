import React, { useState } from 'react';
import { getAddressByCep, createOrder, registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Alert,
    CircularProgress,
} from '@mui/material';

const Checkout: React.FC = () => {
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState<any>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const navigate = useNavigate();

    const handleCepSearch = async () => {
        if (cep.length < 8) return;
        setLoading(true);
        setError('');
        try {
            const data = await getAddressByCep(cep);
            setAddress(data);
        } catch (error) {
            setError('CEP not found');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = async () => {
        if (!name || !email || !address) {
            setError('Please fill in all fields and search for a valid address.');
            return;
        }

        setLoading(true);
        try {
            // 1. Register User (Mock auth)
            const user = await registerUser({ name, email });

            // 2. Create Order
            const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
            const items = cart.map((item: any) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }));

            await createOrder({
                userId: user.id,
                total,
                items
            });

            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            navigate('/');
        } catch (error) {
            console.error(error);
            setError('Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (<Box
            sx={{
                width: '92vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
                <Button variant="contained" onClick={() => navigate('/')}>Go Shopping</Button>
            </Paper>
        </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '92vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{
                width: '100%',
                maxWidth: 600,
                p: { xs: 2, md: 4 },
                borderRadius: 2,
            }}>
                <Typography variant="h4" gutterBottom>Checkout</Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Cart Items</Typography>
                <List disablePadding>
                    {cart.map((item: any, idx: number) => (
                        <ListItem key={idx} sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={item.title} secondary={`Price: $${item.price}`} />
                            <Typography variant="body2">${item.price}</Typography>
                        </ListItem>
                    ))}
                    <Divider sx={{ my: 1 }} />
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            ${cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)}
                        </Typography>
                    </ListItem>
                </List>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Shipping</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="CEP"
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                        fullWidth
                        size="small"
                    />
                    <Button
                        variant="contained"
                        onClick={handleCepSearch}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Search'}
                    </Button>
                </Box>

                {address && (
                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, mb: 2 }}>
                        <Typography variant="body2">{address.logradouro}, {address.bairro}</Typography>
                        <Typography variant="body2">{address.localidade} - {address.uf}</Typography>
                    </Box>
                )}

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>User Info</Typography>
                <TextField
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                    disabled={loading}
                    sx={{ mt: 4 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Place Order'}
                </Button>
            </Paper>
        </Box>
    );
};

export default Checkout;
