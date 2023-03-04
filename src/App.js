import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./styles/index.css";
import SignIn from "./components/signin/SignIn";
import SpecificBook from "./components/specific-book/SpecificBook";
import PurchaseList from "./components/purchaseList/PurchaseList";
import CardList from "./components/cards/CardList";
import ErrorPage from "./components/error/ErrorPage";
import { CartItemCountProvider } from "./context/CartContext";
import { ContextLoginProvider, ContextLogin } from "./helpers/Context";
import Layout from "./components/layout/Layout";

function App() {
  
  return (
    <div className="App">
      <>
        <ContextLoginProvider>
          <CartItemCountProvider>  
            <Routes>
              <Route path="/" element={<Layout />} >
                <Route index element={<SignIn />} />
                <Route
                  path="book-list"
                  element={
                    <UserRoute>
                      <CardList />
                    </UserRoute>
                  }
                />
                <Route
                  path="specific-book/:id"
                  element={
                    <UserRoute>
                      <SpecificBook />
                    </UserRoute>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <UserRoute>
                      <PurchaseList />
                    </UserRoute>
                  }
                />
                <Route path="error" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/error" />} />
                </Route>
              </Routes>
          </CartItemCountProvider>
        </ContextLoginProvider>
      </>
    </div>
  );
}

function UserRoute({ children }) {
  const { userName, setUserName } = useContext(ContextLogin);
  const savedUserName = localStorage.getItem("userName");

  useEffect(() => {
    if (savedUserName && !userName) {
      setUserName(savedUserName);
    }
  }, [savedUserName, userName, setUserName]);

  if (!userName) {
    return <SignIn />;
  }
  return children;
}

export default App;