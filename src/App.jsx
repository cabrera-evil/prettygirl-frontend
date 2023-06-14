import { Navigate, Routes, Route } from "react-router-dom";
import './App.scss'
import NotFound from "./Components/NotFound/NotFound";
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import Feed from './Pages/Feed/Feed';
import Filtered from './Pages/Feed/Filtered/Filtered';
import Product from "./Pages/Product/Product";
import AddProduct from "./Components/MainFeed/AddProduct/AddProduct";
import { useLayoutEffect, useState } from "react";
import { useConfigContext } from "./Contexts/ConfigContext";
import Loading from "./Components/Loading/Loading";
import { useUserContext } from "./Contexts/UserContext";

function App() {
  const context = useConfigContext();
  const UserContext = useUserContext();
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    context.Login();
    UserContext.isAdmin();
    setLoading(false)
  }, [UserContext.admin || context.isLogged])
  return (
    <div className="App">
      {
        loading ? <Loading></Loading> :
          <>
            <Header />
            <main>
              <Routes>
                <Route path='/' element={<Navigate to='/feed' />} />
                {/* Por default le mostrará la página inicial de la página (feed) */}
                <Route path='/feed/*' element={<Feed />} />
                <Route path='/feed/filtered/' element={<Filtered />} />
                <Route path='/product/*' element={<Product />} />
                {/* En el login, redirigirá a register si no tiene cuenta */}
                <Route path='/login/*' element={<Login />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </>
      }
    </div>
  )
}

export default App
