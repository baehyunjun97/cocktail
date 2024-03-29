import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './components/ErrorPage';
import RecipeUploadLayout from './components/RecipeUploadLayout';

import Join from './components/member/Join';
import Login from './components/member/Login';
import Edit from './components/member/Edit';
import PwdCheck from './components/member/PwdCheck';
import { MemberMemoryProvider } from './context/MemberContext';
import Mypage from './components/member/Mypage';
import RequestIngMain from './components/ingredient/ requestIngredient/ RequestIngMain';
import EmailCertificationId from './components/email/EmailCertificationId';
import EmailCertificationPwd from './components/email/EmailCertificationPwd';

function App() {
  
  return (
    <div>
      <MemberMemoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/recepiUpload' element={<RecipeUploadLayout />} />
            <Route path='/request/ingredient' element={<RequestIngMain />} />
            <Route path='/*' element={<Layout />} />
            <Route path='/join' element={<Join />} />
            <Route path='/login' element={<Login />} />
            <Route path='/mypage' element={<Mypage />}/>
            <Route path='/pwdcheck' element={<PwdCheck />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/idfind' element={<EmailCertificationId />} />
            <Route path='/pwdfind' element={<EmailCertificationPwd />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </MemberMemoryProvider>
    </div>
  );
}

export default App;