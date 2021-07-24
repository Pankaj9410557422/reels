import './App.css'
import Signup from './Components/Signup';
import AuthProvider from './Context/AuthProvider';
import Login from './Components/Login/Login';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route path="/" component={Login}/>
        <Route path ="/signup" component={Signup}/>
      </Switch>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
