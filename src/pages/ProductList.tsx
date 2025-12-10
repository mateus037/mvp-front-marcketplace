import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@mui/material';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts().then(setProducts).catch(console.error);
    }, []);

    return (
        <Grid container spacing={2} justifyContent="center" >
            {products.map(product => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ maxWidth: 345, mx: 'auto' }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            sx={{
                                // 16:9
                                pt: '56.25%',
                                height: 200,
                                objectFit: 'contain',
                                padding: '10px'
                            }}
                            image={product.image}
                            alt={product.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2" noWrap>
                                {product.title}
                            </Typography>
                            <Typography>
                                ${product.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => navigate(`/product/${product.id}`)}>View Details</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
