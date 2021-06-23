import './App.css';
import SideBarMapRoutes from './components/SideBarMap/SideBarMap';
import ModalBanner from './components/ModalBanner/ModalBanner';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
          <div className="Modal">
            <ModalBanner />
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
