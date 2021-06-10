import './App.css';
import SideBarMapRoutes from './components/common/SideBarMap/SideBarMap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Botones from './components/common/Botones/Botones';

function App() {
  return (
    <div className="App">
      <div className="Sidebar">
        <Router>
          <div>
            <Switch>                          
              <Route exact path="/maps/:id" render={({match}) => {
                return <SideBarMapRoutes id={match.params.id} />
              }}/>                                    
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
