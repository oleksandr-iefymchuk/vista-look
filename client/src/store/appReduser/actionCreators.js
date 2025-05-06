import storeActionType from './actionTypes';

const selectCategory = (category) => ({
  type: storeActionType.SET_SELECTED_CATEGORY,
  payload: category
});

const selectSubcategory = (subcategory) => ({
  type: storeActionType.SET_SELECTED_SUBCATEGORY,
  payload: subcategory
});

const toggleMobileMenu = () => ({
  type: storeActionType.TOGGLE_MOBILE_MENU
});

const closeMobileMenu = () => ({
  type: storeActionType.CLOSE_MOBILE_MENU
});

const searchProduct = (product) => ({
  type: storeActionType.SEARCH_PRODUCT,
  payload: product
});

const setLoading = (isLoading) => ({
  type: storeActionType.LOADING,
  payload: isLoading
});

const toggleLogineModal = () => ({
  type: storeActionType.TOGGLE_LOGIN_MODAL
});

export { selectCategory, selectSubcategory, toggleMobileMenu, closeMobileMenu, searchProduct, setLoading, toggleLogineModal };
