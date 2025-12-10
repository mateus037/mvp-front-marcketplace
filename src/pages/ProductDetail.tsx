import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Grid, Typography, Button, Box, Paper, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    };

    if (loading) {
        return (
            <Box sx={{ mt: 4 }}>
                <Skeleton variant="rectangular" height={400} />
                <Skeleton variant="text" sx={{ mt: 2 }} />
                <Skeleton variant="text" width="60%" />
            </Box>
        );
    }

    if (!product) return <Typography>Product not found</Typography>;

    return (
        <Box
            sx={{
                width: '92vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper elevation={0} sx={{ p: 2 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    sx={{ mb: 2 }}
                >
                    Back to Products
                </Button>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                maxHeight: 400,
                                objectFit: 'contain'
                            }}
                            src={product.image}
                            alt={product.title}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {product.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="h5" color="primary" gutterBottom>
                            ${product.price}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                            <Button variant="contained" size="large" onClick={addToCart}>
                                Add to Cart
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/checkout')}
                                color="success"
                            >
                                Go to Checkout
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ProductDetail;
