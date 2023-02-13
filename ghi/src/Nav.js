import { NavLink } from "react-router-dom";
import "./Nav.css";
import { LoginModal } from "./Accounts/LoginModal";
import { LogoutModal } from "./Accounts/LogoutModal";
import { SignupModal } from "./Accounts/SignupModal";
import { useGetTokenQuery } from "./store/authApi";

function Navigation() {
  const { data: tokenData, isLoading } = useGetTokenQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.account.is_admin === false) {
    return (
      <>
        <div className="container">
          <header>
            <h2>Travel<sup>2</sup></h2>
            <nav>
              <ul>
                <li>
                  <NavLink to="/"> Explore</NavLink>
                </li>
                <li>
                  <NavLink to="/trending"> Trending</NavLink>
                </li>
                <li>
                  <NavLink to="/request"> Request</NavLink>
                </li>
                <li>
                  <LogoutModal />
                </li>
              </ul>
            </nav>
          </header>
        </div>
      </>
    );

  } else if (tokenData && tokenData.account.is_admin === true) {
    return (
      <>
        <div className="container">
          <header>
            <h2>Travel<sup>2</sup></h2>
            <nav>
              <ul>
                <li>
                  <NavLink to="/"> Explore</NavLink>
                </li>
                <li>
                  <NavLink to="/trending"> Trending</NavLink>
                </li>
                <li>
                  <NavLink to="/request"> Request</NavLink>
                </li>
                <li>
                  <NavLink to="/unapproved"> Unapproved Venues</NavLink>
                </li>
                <li>
                  <NavLink to="/categories"> Categories</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/dashboard"> Dashboard</NavLink>
                </li> */}
                <li>
                  <LogoutModal />
                </li>
              </ul>
            </nav>
          </header>
        </div>
      </>
    );

  } else if (!tokenData) {
    return (
      <>
        <div className="container">
          <header>
            <h2>Travel<sup>2</sup></h2>
            <nav>
              <ul>
                <li>
                  <NavLink to="/"> Explore</NavLink>
                </li>
                <li>
                  <NavLink to="/trending"> Trending</NavLink>
                </li>
                <li>
                  <NavLink to="/request"> Request</NavLink>
                </li>
                <li>
                  <SignupModal />
                </li>
                <li>
                  <LoginModal />
                </li>
              </ul>
            </nav>
          </header>
        </div>
      </>
    );
  }
}

export default Navigation;
