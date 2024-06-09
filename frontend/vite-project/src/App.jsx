import Navbar from './Components/NavBar/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/Auth.context';
import NewsByCategory from './Components/NewsByCategory/NewsByCategory';
import { useEffect } from 'react';

const SearchResults = lazy(() => import('./Components/SearchResults/SearchResults'))
const AddEditNews = lazy(() => import('./Components/AddEditNews/AddEditNews'))
const Login = lazy(() => import('./Components/Login/Login'))
const MainSection = lazy(() => import('./Components/MainSection/MainSection'));
const NewsById = lazy(() => import('./Components/NewsById/NewsById'))
const Profile = lazy(() => import('./Components/Profile/Profile'))

function App() {

  useEffect(() => {
    document.title = "REVISTA URBANA"; 
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5685964602459573";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
        document.head.removeChild(script);
    };
  }, []);


  return (
    <>
      <NewsProvider>
        <BrowserRouter>
          <AuthProvider>
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
          </AuthProvider>
        </BrowserRouter>
      </NewsProvider>
    </>
  )
}

export default App
