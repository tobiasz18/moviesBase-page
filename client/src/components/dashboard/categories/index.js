import React, { useEffect } from 'react';
import LayoutDashboard from '../../../hoc/LayoutDashboard';
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/system';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getCategoriesAsync } from '../../../store/actions/categories_actions';

import Add from './add'; // Add Category Component

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #0062cc;
    color: #fff;
  }
`;


const Categories = () => {
  const matches = useMediaQuery('(max-width:600px)');

  const categories = useSelector((state) => state.categories.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [dispatch])

  return (
    <LayoutDashboard section="Categories">
      <Grid container spacing={2}>

        <Grid item xs={matches ? 12 : 4}>
          <Root>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {categories && categories.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{item.name}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </Root>
        </Grid>

        <Grid item xs={matches ? 12 : 8}>
          <Add />
        </Grid>

      </Grid>
    </LayoutDashboard >
  );
}

export default Categories;
