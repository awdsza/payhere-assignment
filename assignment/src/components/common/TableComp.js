import * as React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import Link from '@mui/material/Link';

export default function TableComp({header=[],list=[] ,pager={ count:1, page:1, rowsPerPage:10},pageClick}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count,setCount]=React.useState(1);
  React.useEffect(()=>{
    if(pager.count){
      setCount(pager.count);
      setPage(pager.page);
      setRowsPerPage(pager.rowsPerPage);
    }
    return ()=>{}
  },[pager])
  // Avoid a layout jump when reaching the last page with empty rows.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    pageClick(newPage,rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const perPage = parseInt(event.target.value, 10)
    setRowsPerPage(perPage);
    setPage(0);
    pageClick(0,perPage);
  };
  const setHTML = (header,rowData)=>{
    const {props}=header;
    switch(header.type){
      case 'link':
        return (<Link 
          component="button" 
          onClick={()=>window.open(rowData[header.paramName])}> {props.text} </Link>)    
      case 'button':
      default:
        return (<Button color={!props.color ? 'primary' : props.color} variant="contained" onClick={()=>props.onClick(rowData)}>{props.text}</Button>)
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            {
                header.map((h,index)=> <TableCell key={index} align='center'>{h.title}</TableCell>)    
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            list.map((item)=>(
              <TableRow key={item.id}>
              {
                header.map(
                  (h,idx)=>
                  <TableCell key={idx}>
                  {!h.type ? item[h.paramName]: setHTML(h,{...item})}
                  </TableCell>
                )
              }   
              </TableRow>
            ))
          }
        </TableBody>
        {<TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              colSpan={header.length}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton={true}
              showLastButton={true}
            />
          </TableRow>
        </TableFooter>}
      </Table>
    </TableContainer>
  );
  
}
