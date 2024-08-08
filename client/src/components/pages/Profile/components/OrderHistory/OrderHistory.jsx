import './OrderHistory.scss';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserOrdersThunk,
  getAllOrdersThunk
} from '../../../../../store/orders/thunk';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate } from '../../../../../helpers';
import { orderHeaders, itemHeaders } from '../../../../../constants/constants';

import OrderItem from './components/OrderItem';

const OrderHistory = () => {
  const tokenString = localStorage.getItem('userInfo');
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = useState('orderNumber');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { orders } = useSelector(state => state.orders);
  const { isAdmin } = useSelector(store => store.user);

  const handleStartDateChange = event => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = event => {
    setEndDate(event.target.value);
  };

  const handleRequestSort = property => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (tokenString && startDate && endDate) {
      const token = JSON.parse(tokenString);
      if (isAdmin) {
        dispatch(getAllOrdersThunk(token, startDate, endDate));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  useEffect(() => {
    if (tokenString && !isAdmin) {
      const token = JSON.parse(tokenString);
      dispatch(getUserOrdersThunk(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const token = JSON.parse(tokenString);
      if (isAdmin) {
        dispatch(getAllOrdersThunk(token, startDate, endDate));
      } else {
        dispatch(getUserOrdersThunk(token, startDate, endDate));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

    let matchesDateRange = true;
    if (startDate) {
      matchesDateRange = orderDate >= new Date(startDate);
    }
    if (endDate) {
      matchesDateRange = matchesDateRange && orderDate < adjustedEndDate;
    }

    const matchesSearchTerm =
      order.orderNumber.toString().includes(searchTerm) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDateRange && matchesSearchTerm;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  const paginatedOrders = sortedOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className='order-history-wrap'>
      <h3>{isAdmin ? 'Замовлення клієнтів' : 'Історія замовлень'}</h3>
      {isAdmin && (
        <div className='order-controls'>
          <TextField
            className='search-input'
            placeholder='Пошук...'
            value={searchTerm}
            onChange={handleSearch}
            size='small'
            helperText='Пошук по номеру замовлення, імені, прізвищу або Email замовника'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <div className='date-filters'>
            <TextField
              label='Початкова дата'
              type='date'
              size='small'
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={handleStartDateChange}
            />
            <TextField
              label='Кінцева дата'
              type='date'
              size='small'
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
      )}
      {isAdmin ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {orderHeaders.map(header => (
                  <TableCell key={header.id} className='order-header-cell'>
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header.id ? orderDirection : 'asc'}
                      onClick={() => handleRequestSort(header.id)}
                    >
                      {header.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map(order => (
                <Fragment key={order._id}>
                  <TableRow>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>
                      {order.user.name}
                      <br />
                      {order.user.surname}
                      <br />
                      {order.user.email}
                      <br />
                      {order.user.phone}
                    </TableCell>
                    <TableCell>
                      {order.user.deliveryCity}, {order.user.deliveryAddress}
                    </TableCell>
                    <TableCell>{order.deliveryMethod}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat(undefined, {
                        style: 'currency',
                        currency: 'UAH'
                      }).format(order.totalPrice)}
                    </TableCell>
                    <TableCell>{order.isPaid ? 'Так' : 'Ні'}</TableCell>
                    <TableCell>{order.isDelivered ? 'Так' : 'Ні'}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={9}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel1a-content'
                          id='panel1a-header'
                        >
                          <h4>Показати деталі замовлення</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Table>
                            <TableHead>
                              <TableRow>
                                {itemHeaders.map(header => (
                                  <TableCell key={header.id}>
                                    {header.label}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.orderItems.map(item => (
                                <TableRow key={item._id}>
                                  <TableCell>{item.productCode}</TableCell>
                                  <TableCell>{item.title}</TableCell>
                                  <TableCell>
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      style={{ width: '50px' }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {new Intl.NumberFormat(undefined, {
                                      style: 'currency',
                                      currency: 'UAH'
                                    }).format(item.price)}
                                  </TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>{item.size}</TableCell>
                                  <TableCell>
                                    {new Intl.NumberFormat(undefined, {
                                      style: 'currency',
                                      currency: 'UAH'
                                    }).format(item.total)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='Кількість замовлень на сторінці'
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} із ${count}`
            }
          />
        </TableContainer>
      ) : (
        orders.map(order => (
          <Accordion key={order._id} className='order-box'>
            <AccordionSummary
              className='order-box-summary'
              sx={{
                '.MuiAccordionSummary-content.Mui-expanded': {
                  margin: '5px 0'
                }
              }}
              expandIcon={<ExpandMoreIcon style={{ color: '#3e77aa' }} />}
            >
              <div className='order-header'>
                <h4>Замовлення №{order.orderNumber}</h4>
                <p>Створене: {formatDate(order.createdAt)}</p>
                <h4>
                  Загальна сума:{' '}
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'UAH'
                  }).format(order.totalPrice)}
                </h4>
              </div>
            </AccordionSummary>
            <AccordionDetails className='order-item-details'>
              {order.orderItems.map(item => (
                <OrderItem key={item._id} {...item} />
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
