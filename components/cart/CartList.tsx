import { initialData } from '../../database/products';
import { Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { Box } from '@mui/system';
import { ItemCounter } from '../ui';
import { FC } from 'react';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
];

interface Props {
    editable: boolean;
}

export const CartList: FC<Props>= ({ editable=false }) => {
  return (
    <>
        {
            productsInCart.map( product => (
                <Grid container spacing={2} key={product.slug} sx={{ mb:1 }}>
                    <Grid item xs={3}>
                        { /* TODO: Llevar a la pagina dle producto */}
                        <NextLink href='/product/slug' passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={`products/${product.images[0] }`}
                                        component='img'
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{product.title}</Typography>
                            <Typography variant='body1'>Talla: </Typography>

                            {/* Condicional */}
                            {
                                editable
                                ? <ItemCounter />
                                : <Typography variant='h5'>3 items</Typography>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                        {/* Editable */}
                        {
                            editable && (
                                <Button variant='text' color='secondary'>
                                    Remover
                                </Button>
                            )
                        }
                    </Grid>
                </Grid> 
            ))
        }
    </>
  )
}
