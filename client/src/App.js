import React from 'react';
import Navbar from './components/navBar/NavBar';
import { BrowserRouter, Route } from 'react-router-dom';
import Catalogue from './components/catalogue/Catalogue.js';
import Product from './components/Product/Product.jsx';
import NavCategories from "./components/Categories/NavCategories";
import CrudProduct from './components/CrudProduct/CrudProduct.jsx'
import NewCategoryForm from './components/NewCategoryForm/NewCategoryForm'
import SignUp from './components/User/SignUp'
import Main from './components/Main/Main'
import ProductsByCategory from "./components/Categories/ProductsByCategory";
import Footer from "./components/Footer/Footer"
import OrderDetails from "./components/OrderDetails/OrderDetails";
import OrderTable from "./components/OrderTable/OrderTable";
import UserTable from "./components/UserTable/UserTable";
import ViewOrder from './components/ViewOrder/ViewOrder';
import Login from './components/User/Login'
import './Styles/App.scss'
import {Link} from "react-router-dom";


import './App.scss';
import decode from 'jwt-decode';
import {useSelector} from "react-redux";
import CrudReview from './components/CrudReview/CrudReview';



function App() {
  
  
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem('refreshToken')

    if(!token || refreshToken){
      return false;
    }
    try{
      const exp = decode(token.token)
      console.log(exp)
      if(exp < new Date().getTime()){
        return false;
      }
    }catch (e) {
      return false
    }
  }
  
  return (
    <BrowserRouter>
      <div className='body'>
        <div className="App">
          <header>
            <Navbar />
            <NavCategories />
            <Route
              path="/products/category/:categoryName"
              render={({ match }) => <ProductsByCategory key={match.params.categoryName} categoryName={match.params.categoryName} />}
            />
          </header>
          <main>
            <div className="transparencia">

              <Route exact path="/" component={Main} />
              <Route exact path='/products' component={Catalogue} />
              <Route exact path="/products/detalle/:id" render={({ match }) => <Product key={match.params.id} id={match.params.id} />} />

              <Route exact path="/orders/:id" render={({ match }) => <OrderDetails key={match.params.id} id={match.params.id} />} />


              <Route exact path='/admin/products' component={CrudProduct} />
              <Route exact path='/admin/categories' component={NewCategoryForm} />
              <Route exact path="/admin/orders" component={OrderTable} />
              <Route exact path="/admin/users" component={UserTable} />
            <Route exact path='/user/signup' component={SignUp} />
        
            <Route exact path='/auth/login' component={Login} />
            
            <Route exact path="/user/order" component={ViewOrder} />
            {/* <Route exact path="/user/:1/review" component={CrudReview} /> */}
            <Route exact path="/user/review/:id" render={({ match }) => <CrudReview key={match.params.id} id={match.params.id} />} />
    </div>
    
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;