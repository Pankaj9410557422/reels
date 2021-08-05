import './App.css'
import Signup from './Components/Signup';
import AuthProvider from './Context/AuthProvider';
import Login from './Components/Login/Login';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Switch>
        <PrivateRoute exact path="/" component={Feed}/>
        <Route path="/login" component={Login}/>
        <Route path ="/signup" component={Signup}/>
        <Route path ='/profile' component={Profile}/>
      </Switch>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
