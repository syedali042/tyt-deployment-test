'use client';
import React from 'react';
import Link from 'next/link';
import {
  FormControl,
  Nav,
  Row,
  Dropdown,
  Navbar,
  InputGroup,
} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {signOutUser} from '@/shared/redux/slices/user';

//leftsidemenu
const SideMenuIcon = () => {
  document.querySelector('.app').classList.toggle('sidenav-toggled');
};

// Darkmode
const DarkMode = () => {
  if (document.querySelector('.app').classList.contains('dark-mode')) {
    document.querySelector('.app').classList.remove('dark-mode');
  } else {
    document.querySelector('.app').classList.add('dark-mode');
  }
};

// FullScreen
var i = true;
const Fullscreen = (vale) => {
  // var elem = document.documentElement;
  switch (vale) {
    case true:
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        /* Safari */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        /* IE11 */
        document.documentElement.msRequestFullscreen();
      }
      i = false;
      break;
    case false:
      document.exitFullscreen();
      i = true;
      break;
    default:
      break;
  }
};

const Header = ({localVaraiable}) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="header sticky app-header header1">
        <div className="container-fluid main-container">
          <div className="d-flex">
            <a
              aria-label="Hide Sidebar"
              className="app-sidebar__toggle"
              data-bs-toggle="sidebar"
              onClick={() => SideMenuIcon()}
            />
            <Link className="logo-horizontal " href={`/`}>
              <img
                src={`/assets/images/brand/logo-white.png`}
                className="header-brand-img desktop-logo"
                style={{width:'140px', height:'65px'}}
                alt="logo"
              />
              <img
                src={`/assets/images/brand/logo-dark.png`}
                className="header-brand-img light-logo1"
                style={{width:'140px', height:'65px'}}
                alt="logo"
              />
            </Link>

            <Navbar className="d-flex order-lg-2 ms-auto header-right-icons">
              <Dropdown className="dropdown d-none">
                <Link href="#!" className="nav-link icon ">
                  <i className="fe fe-search"></i>
                </Link>
                <Dropdown.Menu className="header-search dropdown-menu-start ">
                  <InputGroup className="input-group w-100 p-2">
                    <FormControl type="text" placeholder="Search...." />
                    <InputGroup.Text className="btn btn-primary">
                      <i className="fe fe-search" aria-hidden="true"></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Dropdown.Menu>
              </Dropdown>
              <Navbar.Toggle className="d-lg-none ms-auto header2 navbar-toggler navresponsive-toggler">
                <span className="navbar-toggler-icon fe fe-more-vertical"></span>
              </Navbar.Toggle>

              <div className="responsive-navbar navbar p-0">
                <Navbar.Collapse className="" id="navbarSupportedContent-4">
                  <div className="d-flex order-lg-2">
                    <Dropdown className="d-lg-none d-flex">
                      <Dropdown.Toggle
                        href="#!"
                        className="nav-link icon no-caret"
                      >
                        <i className="fe fe-search"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="header-search dropdown-menu-start">
                        <InputGroup className="w-100 p-2">
                          <FormControl type="text" placeholder="Search...." />
                          <InputGroup.Text>
                            <i className="fa fa-search" aria-hidden="true"></i>
                          </InputGroup.Text>
                        </InputGroup>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* Dark Mode */}

                    <div className="dropdown">
                      <Nav.Link
                        className="nav-link icon theme-layout nav-link-bg layout-setting"
                        onClick={() => DarkMode()}
                      >
                        <span className="dark-layout">
                          <i className="fe fe-moon"></i>
                        </span>
                        <span className="light-layout">
                          <i className="fe fe-sun"></i>
                        </span>
                      </Nav.Link>
                    </div>

                    {/* FullScreen button */}

                    <div className="dropdown">
                      <Nav.Link
                        className="nav-link icon full-screen-link nav-link-bg"
                        onClick={() => Fullscreen(i)}
                      >
                        <i className="fe fe-minimize fullscreen-button"></i>
                      </Nav.Link>
                    </div>

                    {/* Profile  */}

                    <Dropdown className="profile-1">
                      <Dropdown.Toggle
                        variant=""
                        className="nav-link leading-none d-flex no-caret"
                      >
                        <img
                          src={`/assets/images/users/21.jpg`}
                          alt="profile-user"
                          className="avatar  profile-user brround cover-image"
                        />
                      </Dropdown.Toggle>
                      <Row
                        style={{
                          position: 'absolute',
                          right: '200px',
                          top: '40px',
                        }}
                      >
                        <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow">
                          <div className="drop-heading">
                            <div className="text-center">
                              <h5 className="text-dark mb-0 fs-14 fw-semibold">
                                Syed Ali
                              </h5>
                              <small className="text-muted">User</small>
                            </div>
                          </div>
                          <div className="dropdown-divider m-0"></div>
                          <Link className="dropdown-item" href={`/dashboard`}>
                            <i className="dropdown-icon fe fe-user"></i> Profile
                          </Link>
                          <Link className="dropdown-item" href={`/dashboard`}>
                            <i className="dropdown-icon fe fe-lock"></i>{' '}
                            Lockscreen
                          </Link>
                          <span
                            className="dropdown-item"
                            href={`/`}
                            onClick={() => dispatch(signOutUser())}
                          >
                            <i className="dropdown-icon fe fe-alert-circle"></i>{' '}
                            Sign out
                          </span>
                        </Dropdown.Menu>
                      </Row>
                    </Dropdown>
                  </div>
                </Navbar.Collapse>
              </div>
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  localVaraiable: state,
});
export default Header;
