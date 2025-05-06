import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
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
import { Footer } from './components/pages/Footer/Footer';
import { Order } from './components/pages/Order/Order';
import SearchList from './components/layout/SearchList/SearchList';
import Catalog from './components/pages/Catalog/Catalog';
import { CategoryList } from './components/pages/Header/HeaderControlPanel/CategoryList/CategoryList';
import Contacts from './components/pages/Contacts/Contacts';
import Breadcrumbs from './components/common/Breadcrumbs/Breadcrumbs';
import Progress from './components/common/Progress/Progress';
import CustomAlert from './components/common/CustomAlert/CustomAlert';
import { Authentication } from './components/pages/Authentication/Authentication';
import Profile from './components/pages/Profile/Profile';
import OrderHistory from './components/pages/Profile/components/OrderHistory/OrderHistory';
import PersonalInfo from './components/pages/Profile/components/PersonalInfo/PersonalInfo';
import ProductForm from './components/pages/Profile/components/ProductForm/ProductForm';
import { BREAKPOINTS } from './constants/constants';
import { ROUTES } from './constants/routes';

const App = () => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: BREAKPOINTS.TABLET });
  const { message, messageType } = useSelector((state) => state.user);
  const isShowLoginModal = useSelector((state) => state.app.isShowLoginModal);
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
  }, [dispatch, tokenString]);

  return (
    <>
      <Router>
        <Header />
        <Breadcrumbs />
        <Progress />
        {isMobileDevice && <CategoryList categories={categories} />}
        <CustomAlert open={!!message} onClose={() => dispatch(clearMessage())} message={message} severity={messageType} />
        <Authentication isOpen={isShowLoginModal} onClose={toggleLoginVisibility} />
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CATALOG} element={<Catalog />} />
            <Route path={ROUTES.CATEGORY} element={<Catalog />} />
            <Route path={ROUTES.PRODUCT} element={<CardInfo />} />
            <Route path={ROUTES.BASKET} element={<Basket />} />
            <Route path={ROUTES.ORDER} element={<Order />} />
            <Route path={ROUTES.FAVORITES} element={<Favorites />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.CONTACTS} element={<Contacts />} />
            <Route path={ROUTES.DELIVERY_INFO} element={<DeliveryInfo />} />
            <Route path={ROUTES.SALE} element={<DiscountedProducts />} />
            <Route path={ROUTES.NOVELTY} element={<Novelty />} />
            <Route path={ROUTES.SEARCH} element={<SearchList />} />
            <Route path={ROUTES.PROFILE} element={<Profile />}>
              <Route path='' element={<Navigate to={ROUTES.PROFILE_INFO} />} />
              <Route path={ROUTES.PROFILE_INFO} element={<PersonalInfo />} />
              <Route path={ROUTES.PROFILE_ORDERS} element={<OrderHistory />} />
              <Route path={ROUTES.PRODUCT_FORM} element={<ProductForm />} />
              <Route path={ROUTES.UPDATE_PRODUCT_FORM} element={<ProductForm />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
