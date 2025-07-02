import MainPage from "./components/MainPage"
import LogIn from "./components/LogIn"
import {Route, createRoutesFromElements, RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainLayout from "./layout/MainLayout";
import AboutUs from "./components/AboutUs";
import Model from "./components/Model";
import Features from "./components/Features";
import EmptyPage from "./components/EmptyPage";
import SignUp from "./components/SignUp";
import ProfilePage from "./components/ProfilePage";
import RequireAuth from "./components/RequireAuth";
import { Navigate } from "react-router-dom";



const App = () => {
  
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<MainPage />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='ai-model' element={<Model />} /> 
          <Route path='features' element={<Features />} /> 
          <Route path="profile/:uid" element={<RequireAuth><ProfilePage /></RequireAuth>} />
          <Route path="/404" element={<EmptyPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />

        
      </>
      
  ));
  return (
    <>
      <BrowserRouter router={router}/>
    </>
  )

}

export default App
