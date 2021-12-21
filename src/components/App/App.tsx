// Contexts
import ContextProvider from 'globalState/ContextProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ViewToShow from './ViewToShow';
import TicketPage from './Form/Step4/TicketPage';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route path="/ticket/:ticketId">
            <TicketPage />
          </Route>
          <Route path="/">
            <ViewToShow />
          </Route>
        </Switch>
      </Router>
    </ContextProvider>
  );
}

export default App;
