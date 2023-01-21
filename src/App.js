 import './App.css';
 import 'bootstrap/dist/css/bootstrap.min.css';  
 import { Route,Routes } from 'react-router-dom';
import Header from './Components/Header';  
import Todo from './Projects/ToDo-List/Todo'; 


function App() {
  return (
    <div className="App"> 
        <Header /> 
          <Routes> 
          <Route path="todolist" element={<Todo />} /> 
          </Routes>  
    </div>
  );
}

export default App;
