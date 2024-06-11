import Navbar from './Components/NavBar/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/Auth.context';
import NewsByCategory from './Components/NewsByCategory/NewsByCategory';
// import AdSense from './Components/adSense/AdSense';
import ImageLCP from './Components/imageLCP/ImageLCP';

const SearchResults = lazy(() => import('./Components/SearchResults/SearchResults'))
const AddEditNews = lazy(() => import('./Components/AddEditNews/AddEditNews'))
const Login = lazy(() => import('./Components/Login/Login'))
const MainSection = lazy(() => import('./Components/MainSection/MainSection'));
const Profile = lazy(() => import('./Components/Profile/Profile'))
const NewsById = lazy(() => import('./Components/NewsById/NewsById'))

function App() {



  return (
    <>
      <NewsProvider>
        <BrowserRouter>
          <AuthProvider>
            <ImageLCP/>
            <Navbar /> 
            {/* <AdSense/> */}
            <Suspense fallback={<div>Cargando...</div>}>
              <Routes>
                <Route path='*' />
                <Route path='/' element={<MainSection />} />
                <Route path='/add-news' element={<AddEditNews />} />
                <Route path='/search/:query' element={<SearchResults />} />
                <Route path='/newsByCategory/:query' element={<NewsByCategory />} />
                <Route path='/newById/:id' element={<NewsById />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </NewsProvider>
    </>
  )
}

export default App
