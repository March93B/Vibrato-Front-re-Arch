import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import personalizar from '../Styles/dashboard.css';

export default function BasicTable(props) {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table  sx={{ width: "100%"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ></TableCell>
            <TableCell align="right" sx={{ fontSize: "20px" }}>Visualizações</TableCell>
            <TableCell align="right" sx={{ fontSize: "20px" }}>Plays</TableCell>
            <TableCell align="right" sx={{ fontSize: "20px" }}>Redirecionamentos</TableCell>
            <TableCell align="right" sx={{ fontSize: "20px" }}>Compartilhamentos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ fontSize: "20px" }}>
                {row.none}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }}>{row.visualizacao || 0}</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }}>{row.plays || 0}</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }}>{row.redirecionamentos || 0}</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }}>{row.compartilhamentos || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}














