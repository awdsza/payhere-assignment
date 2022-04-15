import SearchRepository from './components/search/SearchRepository';
import RepositoryIssue from './components/issue/RepositoryIssue'
import { Route, Link } from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
     <ul>
        <li>
          <Link to="/">검색</Link>
        </li>
        <li>
          <Link to="/issue">issue관리</Link>
        </li>
      </ul>
      <Route path="/" exact={true}  component={SearchRepository} />
      <Route path="/issue" component={RepositoryIssue} />
    </div>
  );
}

export default App;
