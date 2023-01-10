import AddData from './view/AddData'
import Monitoring from './view/Monitoring'
import { Routes, Route } from 'react-router-dom'
import DetailData from './view/DetailData';
import EditData from './view/EditData';

import './App.css';
import Delete from './components/Delete';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Monitoring />} />        
        <Route path="/add-data" element={<AddData />} />    
        <Route path="/detail-motor/:id" element={<DetailData />} /> 
        <Route path="/update-motor/:id" element={<EditData />} />   
        {/* <Route path="/" element={<Delete />} />    */}
      </Routes>
    </>
  );
}

export default App;
