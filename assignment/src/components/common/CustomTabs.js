import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  Link,
  matchPath,
  useLocation,
} from 'react-router-dom';

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function CustomTabs({tabData}){
  
  const routeMatch = useRouteMatch(['/search', '/issue']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      {tabData.map(({label,value,to},index)=>
      <Tab key={index} label={label} value={value} to={to} component={Link}></Tab>
      )}
    </Tabs>
  ); 
}

export default CustomTabs;