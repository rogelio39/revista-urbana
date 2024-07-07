import Navbar from './Components/NavBar/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/Authcontext';
import NewsByCategory from './Components/NewsByCategory/NewsByCategory';
import { CommentProvider } from './context/CommentsContext';
import { HelmetProvider } from 'react-helmet-async'
import Register from './Components/Register/Register';
import DeleteNews from './Components/deleteNews/DeleteNews';


const SearchResults = lazy(() => import('./Components/SearchResults/SearchResults'));
const AddEditNews = lazy(() => import('./Components/AddEditNews/AddEditNews'));
const Login = lazy(() => import('./Components/Login/Login'));
const MainSection = lazy(() => import('./Components/MainSection/MainSection'));
const Profile = lazy(() => import('./Components/Profile/Profile'));
const NewsById = lazy(() => import('./Components/NewsById/NewsById'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
const GoogleAnalytics = lazy(() => import('./Components/googleAnalytics/GoogleAnalytics'));
const GoogleAdsense = lazy(() => import('./Components/googleAdsense/GoogleAdsense'))
function App() {



  return (
    <CommentProvider>
      <NewsProvider>
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <Suspense fallback={<div>Cargando...</div>}>
              <HelmetProvider>
                <GoogleAnalytics/>
                <GoogleAdsense/>
                <Routes>
                  <Route path='*' />
                  <Route path='/' element={<MainSection />} />
                  <Route path='/add-news' element={<AddEditNews />} />
                  <Route path='/delete-news' element={<DeleteNews/>}/>
                  <Route path='/search/:query' element={<SearchResults />} />
                  <Route path='/newsByCategory/:query' element={<NewsByCategory />} />
                  <Route path='/newById/:id' element={<NewsById />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/profile' element={<Profile />} />
                </Routes>
              </HelmetProvider>
            </Suspense>
            <Footer />
          </AuthProvider>
        </BrowserRouter>
      </NewsProvider>
    </CommentProvider>
  )
}

export default App





