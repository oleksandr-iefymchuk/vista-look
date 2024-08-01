import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import './FilterProducts.scss';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ButtonWrapper from '../../common/Button/Button';
import SortList from '../SortList/SortList';
import PriceFilter from './PriceFilter/PriceFilter';

const FilterProducts = ({ products, showFilterButton }) => {
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const [isShowFilterMenu, setShowFilterMenu] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedParams, setSelectedParams] = useState({});

  const applyFilters = params => {
    let filtered = products;

    Object.entries(params).forEach(([paramName, selectedValues]) => {
      if (selectedValues.length > 0) {
        filtered = filtered.filter(product =>
          selectedValues.some(value =>
            Array.isArray(product.param[paramName])
              ? product.param[paramName].includes(value)
              : product.param[paramName] === value
          )
        );
      }
    });

    setFilteredProducts(filtered);
  };

  const handleParamChange = (paramName, value) => {
    const updatedValues = selectedParams[paramName] || [];
    const isChecked = updatedValues.includes(value);
    const updatedParams = {
      ...selectedParams,
      [paramName]: isChecked
        ? updatedValues.filter(item => item !== value)
        : [...updatedValues, value]
    };
    setSelectedParams(updatedParams);
    applyFilters(updatedParams);
  };

  const allParamValues = products.reduce((acc, product) => {
    Object.entries(product.param).forEach(([paramName, paramValue]) => {
      if (!acc[paramName]) {
        acc[paramName] = [];
      }
      const values = Array.isArray(paramValue) ? paramValue : [paramValue];
      values.forEach(value => {
        if (!acc[paramName].includes(value)) {
          acc[paramName].push(value);
        }
      });
    });
    return acc;
  }, {});

  const availableParams = Object.keys(allParamValues).reduce(
    (acc, paramName) => {
      acc[paramName] = allParamValues[paramName].filter(paramValue => {
        const tempSelectedParams = {
          ...selectedParams,
          [paramName]: [paramValue]
        };
        const filtered = products.filter(product =>
          Object.entries(tempSelectedParams).every(
            ([key, values]) =>
              values.length === 0 ||
              values.some(value =>
                Array.isArray(product.param[key])
                  ? product.param[key].includes(value)
                  : product.param[key] === value
              )
          )
        );
        return filtered.length > 0;
      });
      return acc;
    },
    {}
  );

  const getProductsWordUkr = count => {
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ['товар', 'товари', 'товарів'];
    return titles[
      count % 100 > 4 && count % 100 < 20
        ? 2
        : cases[count % 10 < 5 ? count % 10 : 5]
    ];
  };

  const toggleFilterMenu = () => {
    if (!isShowFilterMenu) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    setShowFilterMenu(prevState => !prevState);
  };

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  return (
    <div className='filter-products-wrap'>
      {isShowFilterMenu && (
        <div className='filter-menu-overlay' onClick={toggleFilterMenu}></div>
      )}
      {products.length > 0 && (
        <div className={`filters ${isShowFilterMenu ? 'show' : 'hide'}`}>
          {isMobileDevice && (
            <div className='filter-title'>
              <h3>Фільтр</h3>
              <ButtonWrapper
                buttonClassName='close-filter-btn'
                onClick={toggleFilterMenu}
                icon='close'
              />
            </div>
          )}
          <div className='filter-param'>
            {Object.keys(allParamValues).map(paramName => (
              <Accordion key={paramName} defaultExpanded className='param-box'>
                <AccordionSummary
                  sx={{
                    '.MuiAccordionSummary-content.Mui-expanded': {
                      margin: '5px 0'
                    }
                  }}
                  className='param-box-content'
                  expandIcon={<ExpandMoreIcon style={{ color: '#3e77aa' }} />}
                >
                  <h4 className='param-name'>{paramName}</h4>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {allParamValues[paramName].map(paramValue => (
                      <FormControlLabel
                        key={`${paramName}-${paramValue}`}
                        control={
                          <Checkbox
                            sx={{
                              '& .MuiSvgIcon-root': { fontSize: 28 }
                            }}
                            checked={
                              selectedParams[paramName]
                                ? selectedParams[paramName].includes(paramValue)
                                : false
                            }
                            disabled={
                              !availableParams[paramName]?.includes(paramValue)
                            }
                            onChange={() =>
                              handleParamChange(paramName, paramValue)
                            }
                          />
                        }
                        label={paramValue}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            ))}
            <PriceFilter
              products={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          </div>
          {isMobileDevice && (
            <ButtonWrapper
              buttonClassName='show-filtered-products-btn'
              buttonText={`Показати ${
                filteredProducts.length
              } ${getProductsWordUkr(filteredProducts.length)}`}
              onClick={toggleFilterMenu}
            />
          )}
        </div>
      )}

      <SortList
        products={filteredProducts}
        setShowFilterMenu={toggleFilterMenu}
        showFilterButton={showFilterButton}
      ></SortList>
    </div>
  );
};

FilterProducts.propTypes = {
  products: PropTypes.array.isRequired,
  isShowFilterMenu: PropTypes.bool,
  setShowFilterMenu: PropTypes.func,
  showFilterButton: PropTypes.bool
};

export default FilterProducts;
