import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CartItem, User } from '../../models';
import { RootState } from '../../../storage/redux/store';
import {
  setLoggedInUser,
  userInitialState,
} from '../../../storage/redux/authSlice';

// Website's logo
let logo = require('../../../assets/images/logo.png');

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: CartItem[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const currentUser: User = useSelector(
    (state: RootState) => state.authStore ?? null
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedInUser({ ...userInitialState }));
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0 w-100">
            <li className="nav-item ">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" aria-current="page" to="/cart">
                <i className="bi bi-cart"></i> {''}
                {shoppingCartFromStore?.length
                  ? `(${shoppingCartFromStore.length})`
                  : ''}
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin panel
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <div className="d-flex align-items-center justify-content-center w-100">
              {' '}
              {/* Centered wrapper */}
              <NavLink className="nav-link" to="/">
                <img src={logo} style={{ height: '30px' }} className="m-1" />
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
                      className="btn btn-secondary btn-outlined rounded-pill text-white mx-2"
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
