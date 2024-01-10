import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './components/ErrorPage';
import RecipeUploadLayout from './components/RecipeUploadLayout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/recepiUpload' element={<RecipeUploadLayout />} />
          <Route path='/*' element={<Layout />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;