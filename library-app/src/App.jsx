import {Route, Routes} from 'react-router-dom';
import Library from './components/library/Library';
import AddContent from './components/addContent/AddContent';
import Catalog from './components/catalog/Catalog';
import Login from './components/userAcess/Login';
import CreateAccount from './components/userAcess/CreateAccount';
import MyCollection from './components/mycollection/MyCollection';
import Admin from './components/adminControls/Admin';

function App() {


  return (
    
     <Routes>
      <Route path='/' element={<Library />} />
      <Route path='/addContent' element={<AddContent />} />
      <Route path='/Catalog' element={<Catalog />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/CreateAccount' element={<CreateAccount />} />
      <Route path='/MyCollection' element={<MyCollection />} />
      <Route path='/Admin' element={<Admin />} />
     </Routes>
  )
}

export default App;
