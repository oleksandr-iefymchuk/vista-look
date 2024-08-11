import './App.scss';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { categories } from './constants/categories';
import { getProductsThunk } from './store/products/thunk';
import { getReviewsThunk } from './store/reviews/thunk';
import { getUserProfileThunk } from './store/user/thunk';
import { clearMessage } from './store/user/actionCreators';
import { toggleLogineModal } from './store/appReduser/actionCreators';

import Header from './components/pages/Header/Header';
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import DiscountedProducts from './components/pages/DiscountedProducts/DiscountedProducts';
import Novelty from './components/pages/Novelty/Novelty';
import DeliveryInfo from './components/pages/DeliveryInfo/DeliveryInfo';
import CardInfo from './components/layout/CardInfo/CardInfo';
import Basket from './components/pages/Basket/Basket';
import Favorites from './components/pages/Favorites/Favorites';
import Footer from './components/pages/Footer/Footer';
import Order from './components/pages/Order/Order';
import SearchList from './components/layout/SearchList/SearchList';
import Catalog from './components/pages/Catalog/Catalog';
import CategoryMenu from './components/layout/CategoryMenu/CategoryMenu';
import Contacts from './components/pages/Contacts/Contacts';
import Breadcrumbs from './components/common/Breadcrumbs/Breadcrumbs';
import Progress from './components/common/Progress/Progress';
import CustomAlert from './components/common/CustomAlert/CustomAlert';
import Authentication from './components/pages/Authentication/Authentication';
import Profile from './components/pages/Profile/Profile';
import OrderHistory from './components/pages/Profile/components/OrderHistory/OrderHistory';
import PersonalInfo from './components/pages/Profile/components/PersonalInfo/PersonalInfo';
import ProductForm from './components/pages/Profile/components/ProductForm/ProductForm';

const App = () => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const { message, messageType } = useSelector(state => state.user);
  const isShowLoginModal = useSelector(state => state.app.isShowLoginModal);
  const tokenString = localStorage.getItem('userInfo');

  const toggleLoginVisibility = () => {
    dispatch(toggleLogineModal());
  };

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getReviewsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(getUserProfileThunk(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Breadcrumbs />
        <Progress />
        {isMobileDevice && <CategoryMenu categories={categories} />}
        <CustomAlert
          open={!!message}
          onClose={() => dispatch(clearMessage())}
          message={message}
          severity={messageType}
        />
        <Authentication
          openModalForm={isShowLoginModal}
          closeModalForm={toggleLoginVisibility}
        />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:category' element={<Catalog />} />
            <Route path='/:productSlug' element={<CardInfo />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/order' element={<Order />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/about' element={<About />}></Route>
            <Route path='/contacts' element={<Contacts />}></Route>
            <Route path='/delivery-info' element={<DeliveryInfo />}></Route>
            <Route path='/sale' element={<DiscountedProducts />}></Route>
            <Route path='/novelty' element={<Novelty />}></Route>
            <Route path='/search' element={<SearchList />}></Route>
            <Route path='/profile' element={<Profile />}>
              <Route path='' element={<Navigate to='personal-info' />} />
              <Route path='personal-info' element={<PersonalInfo />} />
              <Route path='personal-orders' element={<OrderHistory />} />
              <Route path='product-form' element={<ProductForm />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
