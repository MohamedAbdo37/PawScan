import MainPage from "./components/MainPage"
import LogIn from "./components/LogIn"
import {Route, createRoutesFromElements, RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainLayout from "./layout/MainLayout";
import AboutUs from "./components/AboutUs";
import Model from "./components/Model";
import Features from "./components/Features";
import EmptyPage from "./components/EmptyPage";



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<MainPage />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='ai-model' element={<Model />} /> 
          <Route path='features' element={<Features />} /> 
          <Route path='*' element={<EmptyPage/>}/>
        </Route>

        <Route path='/login' element={<LogIn />} />

        
      </>
      
  ));
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )

}

export default App
