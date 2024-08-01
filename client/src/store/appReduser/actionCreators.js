import storeActionType from './actionTypes';

const selectCategory = category => ({
  type: storeActionType.SET_SELECTED_CATEGORY,
  payload: category
});

const selectSubcategory = subcategory => ({
  type: storeActionType.SET_SELECTED_SUBCATEGORY,
  payload: subcategory
});

const toggleCategoryMenu = () => ({
  type: storeActionType.TOGGLE_CATEGORY_MENU
});

const closeCategoryMenu = () => ({
  type: storeActionType.CLOSE_CATEGORY_MENU
});

const toggleMobileMenu = () => ({
  type: storeActionType.TOGGLE_MOBILE_MENU
});

const closeMobileMenu = () => ({
  type: storeActionType.CLOSE_MOBILE_MENU
});

const searchProduct = product => ({
  type: storeActionType.SEARCH_PRODUCT,
  payload: product
});

const setLoading = isLoading => ({
  type: storeActionType.LOADING,
  payload: isLoading
});

const toggleLogineModal = () => ({
  type: storeActionType.TOGGLE_LOGIN_MODAL
});

export {
  selectCategory,
  selectSubcategory,
  toggleCategoryMenu,
  closeCategoryMenu,
  toggleMobileMenu,
  closeMobileMenu,
  searchProduct,
  setLoading,
  toggleLogineModal
};
