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
    fontWeight: 500,
 
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

const tableToolsStyle = {
  display: 'grid',
  gridTemplateColumns:'33% 33% 33%',
  minWidth: '350px'

}

const PaginateComponent = ({ arts, changePage, deleteArticle, updateStatus, editArticle }) => {
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
              <Table size="small" sx={{ minWidth: 450 }} aria-label="customized table">
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
                      <StyledTableCell style={{ textAlign: 'left' }} component="th" scope="row">
                        <Moment to={row.date}></Moment>
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: 'left' }} align="left">{row.title}</StyledTableCell>
                      <StyledTableCell align="left">{row.score}</StyledTableCell>
                      <StyledTableCell align="left">
                        <Stack sx={tableToolsStyle} direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => editArticle(row._id)}
                          >Edit</Button>
                          <Button
                            variant="contained"
                            onClick={() => {
                              updateStatus(row.status, row._id)
                            }}
                          >
                            {row.status}
                          </Button>
                          <Button onClick={() => {
                            window.confirm("Are you sure you wish to delete this article?") &&
                              deleteArticle(row._id)
                          }} variant="contained" color="error">
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