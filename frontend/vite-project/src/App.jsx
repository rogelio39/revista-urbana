import Navbar from './Components/NavBar/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { lazy, Suspense, useEffect } from 'react';
import { AuthProvider } from './context/Authcontext';
import NewsByCategory from './Components/NewsByCategory/NewsByCategory';
import ImageLCP from './Components/imageLCP/ImageLCP';
import { CommentProvider } from './context/CommentsContext';



const SearchResults = lazy(() => import('./Components/SearchResults/SearchResults'));
const AddEditNews = lazy(() => import('./Components/AddEditNews/AddEditNews'));
const Login = lazy(() => import('./Components/Login/Login'));
const MainSection = lazy(() => import('./Components/MainSection/MainSection'));
const Profile = lazy(() => import('./Components/Profile/Profile'));
const NewsById = lazy(() => import('./Components/NewsById/NewsById'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
function App() {


  useEffect(() => {

    document.title = "REVISTA URBANA";

  }, [])



  return (
    <>
      <CommentProvider>
        <NewsProvider>
          <BrowserRouter>
            <AuthProvider>
              <ImageLCP />
              <Navbar />
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
              <Footer />
            </AuthProvider>
          </BrowserRouter>
        </NewsProvider>
      </CommentProvider>
    </>
  )
}

export default App





