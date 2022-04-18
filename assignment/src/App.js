import SearchRepository from './components/search/SearchRepository';
import RepositoryIssue from './components/issue/RepositoryIssue';
import CustomTabs from './components/common/CustomTabs';
import tabList from './jsons/tabList.json';

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/search">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/search']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}


Router.propTypes = {
  children: PropTypes.node,
};

function CurrentRoute() {
  const location = useLocation();
  return (
    location.pathname === '/search' ? <SearchRepository/> : <RepositoryIssue/>
  );
}

function App() {
  
  return (
    <Router>
      <Box sx={{ width: '100%' }}>
        <CustomTabs tabData={tabList}/>
         <Routes>
          <Route path="*" element={<CurrentRoute />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
