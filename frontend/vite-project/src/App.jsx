import Navbar from './Components/NavBar/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/Auth.context';


const AddNew = lazy(() => import('./Components/AddNew/AddNew'))
const Login = lazy(() => import('./Components/Login/Login'))
const MainSection = lazy(() => import('./Components/MainSection/MainSection'));
const NewsById = lazy(() => import('./Components/NewsById/NewsById'))

function App() {


  return (
    <>
      <NewsProvider>
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <Suspense fallback={<div>Cargando...</div>}>
              <Routes>
                <Route path='/' element={<MainSection/>} />
                <Route path='/add-news' element={<AddNew />} />
                <Route path='/newById/:id' element={<NewsById/>}/>
                <Route path='login' element={<Login/>}/>
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </NewsProvider>
    </>
  )
}

export default App
