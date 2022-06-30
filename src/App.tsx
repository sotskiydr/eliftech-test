import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {useAppSelector} from "./store/hooks/redux";
import Header from "./components/Header";
import ShopPage from "./pages/ShopPage";
import ShoppingPage from "./pages/ShoppingPage";

const App: React.FC = () => {
    const { token } = useAppSelector(state => state.AuthSlice);
  return token ?
          <>
             <Header />
              <Routes>
                  <Route path="*" element={<Navigate to="/shop"/>}/>
                  <Route
                    path="/shop"
                    element={ <ShopPage /> }
                  />
                  <Route
                    path="/cart"
                    element={ <ShoppingPage /> }
                  />
              </Routes>
          </>
          :
            <Routes>
                <Route path="*" element={<Navigate to="/login"/>}/>
                <Route
                    path="/login"
                    element={ <LoginPage /> }
                />
                <Route
                    path="/register"
                    element={ <RegisterPage /> }
                />
            </Routes>
};

export default App;
