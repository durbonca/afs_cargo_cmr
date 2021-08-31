import React from 'react';
import CSVImport from '../../components/CSVImport/CSVImport';
import DataTable from '../DataTable'
import { Box } from '@material-ui/core';

export const Home = () => {
     return (
          <Box>
               <h1>Home</h1>
               <br/>
               <CSVImport />
               <DataTable />
          </Box>
     )

}