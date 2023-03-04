import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import "./styles/index.css";
import SignIn from "./components/signin/SignIn";
import SpecificBook from "./components/specific-book/SpecificBook";
import PurchaseList from "./components/purchaseList/PurchaseList";
import CardList from "./components/cards/CardList";
import ErrorPage from "./components/error/ErrorPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { CartItemCountProvider } from "./context/CartContext";
import { ContextLoginProvider, ContextLogin } from "./helpers/Context";

function App() {
  return (
    <div className="App">
      <>
        <ContextLoginProvider>
          <CartItemCountProvider>
            <Header />            
            <Routes basename="/" >
              <Route path="/" element={<SignIn />} />
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
                </Routes>
              <Footer />
          </CartItemCountProvider>
        </ContextLoginProvider>
      </>
    </div>
  );
}

function UserRoute({ children }) {
  const { userName } = useContext(ContextLogin);
  if (!userName) {
    return <SignIn />;
  }
  return children;
}

export default App;