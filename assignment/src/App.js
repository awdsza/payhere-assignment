
import SearchRepository from './components/search/SearchRepository';
import RepositoryIssue from './components/issue/RepositoryIssue'
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
      <SearchRepository/>
      <RepositoryIssue/>
      </header>
    </div>
  );
}

export default App;
