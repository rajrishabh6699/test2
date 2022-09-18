import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobDetailsPage from './pages/JobDetailsPage';
import Homepage from './pages/HomePage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/jobs">
          <JobDetailsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
