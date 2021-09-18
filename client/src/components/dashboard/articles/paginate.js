import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import { PaginationItem } from '@mui/material'

import Moment from 'react-moment'
import { Loader } from '../../../utils/loader'

//styled(Component, [options])(styles) => Component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0062cc',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PaginateComponent = ({ arts, changePage }) => {
  const [page, setpage] = useState(1)
  const handleChange = (event, value) => {
    setpage(value)
    changePage(value)
  }

  return (
    <>
      {
        arts && arts.docs ?
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Created</StyledTableCell>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="left">Score</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arts.docs.map((row, index) => (
                    <StyledTableRow key={`${row.title + index}`}>
                      <StyledTableCell component="th" scope="row">
                        <Moment to={row.date}></Moment>
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.title}</StyledTableCell>
                      <StyledTableCell align="left">{row.score}</StyledTableCell>
                      <StyledTableCell align="left">
                        <Stack direction="row" spacing={1}>
                          <Button variant="contained" color="secondary">Edit</Button>
                          <Button variant="contained" >
                            Status
                          </Button>
                          <Button variant="contained" color="error">
                            Remove
                          </Button>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2}>
              <Pagination count={arts.totalPages} page={page} onChange={handleChange} color="secondary" />
              <PaginationItem />
            </Box>
          </> : <Loader />
      }
    </>
  );
}

export default PaginateComponent