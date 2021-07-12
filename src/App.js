import './App.css';
import SideBarMapRoutes from './components/SideBarMap/SideBarMap';
import ModalBanner from './components/ModalBanner/ModalBanner';
import QRScanner from './components/QRScanner/QRScanner';
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
              <Route exact path="/:id" render={({match}) => {
                return <SideBarMapRoutes id={match.params.id} />
              }}/>          
              <Route exact path="/" component={QRScanner} />                          
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
