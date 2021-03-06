import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../context';
import { currency } from '../../utils';

export const OrdernSummary = () => {

    const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Products</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ numberOfItems } { numberOfItems > 1 ? 'products' : 'product' }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format(subTotal) }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuesto ({ Number(process.env.NEXT_PUBLIC_TAX_RATE)*100 }%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format(tax) }</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant='subtitle1'>Total: </Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>{ currency.format(total) }</Typography>
        </Grid>
    </Grid>
  )
}
