import React from 'react';
import CSVImport from '../../components/CSVImport/CSVImport';
import { Box } from '@material-ui/core';
import SearchForm from '../Form/Search';

export const Home = () => {
     return (
          <Box>
               <h1>Home</h1>
               <br/>
               <CSVImport />
               <SearchForm/>
          </Box>
     )

}