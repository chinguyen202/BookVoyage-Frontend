import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CartItem, User } from '../../models';
import { RootState } from '../../../storage/redux/store';
import {
  setLoggedInUser,
  userInitialState,
} from '../../../storage/redux/authSlice';
import { Roles } from '../../../utility';

// Website's logo
let logo = require('../../../assets/images/logo.png');

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get the shopping cart from redux
  const shoppingCartFromStore: CartItem[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  // get the log in user data
  const currentUser: User = useSelector(
    (state: RootState) => state.authStore ?? null
  );
  // log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedInUser({ ...userInitialState }));
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0 w-100">
            <li className="nav-item ">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            {/* If the user is admin, show admin panel */}
            {currentUser.role === Roles.ADMIN ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin panel
                </a>
                <ul className="dropdown-menu">
                  <li
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item"
                    onClick={() => navigate('/order/myOrders')}
                  >
                    My orders
                  </li>
                  <li
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item"
                    onClick={() => navigate('/order/allOrders')}
                  >
                    All orders
                  </li>
                  <li
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item"
                    onClick={() => navigate('/books/bookList')}
                  >
                    Books
                  </li>
                  <li
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item"
                    onClick={() => navigate('/categories')}
                  >
                    Categories
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/order/myOrders"
                >
                  Orders
                </NavLink>
              </li>
            )}

            {/* User's current shopping cart */}
            <li className="nav-item ">
              <NavLink className="nav-link" aria-current="page" to="/cart">
                <i className="bi bi-cart"></i>
                {currentUser.id && `(${shoppingCartFromStore.length})`}
              </NavLink>
            </li>
            <div className="d-flex align-items-center justify-content-center w-100">
              {' '}
              {/* Centered wrapper */}
              <NavLink className="nav-link" to="/">
                <img
                  src={logo}
                  alt="app logo"
                  style={{ height: '30px' }}
                  className="m-1"
                />
              </NavLink>
            </div>

            <div className="d-flex pt-2" style={{ marginLeft: 'auto' }}>
              {/* If user is logged in */}
              {currentUser.id && (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      style={{
                        cursor: 'pointer',
                        background: 'transparent',
                        border: 0,
                        marginLeft: '10px',
                      }}
                    >
                      {currentUser.userName.toUpperCase()}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="btn btn-warning btn-outlined rounded-pill text-dark mx-2"
                      style={{ border: 'none', height: '40px', width: '100px' }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {/* If user is not logged in */}
              {!currentUser.id && (
                <>
                  <li className="nav-item text-white">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item text-white">
                    <NavLink
                      className="btn btn-secondary btn-outlined rounded-pill text-dark mx-2"
                      style={{ border: 'none', height: '40px', width: '100px' }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
