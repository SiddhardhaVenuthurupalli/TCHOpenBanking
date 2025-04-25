import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">BackPacks</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart ({cartCount})</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/merchant-console">Merchant Console</Link> {/* New link */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bank-console">Bank Console</Link> {/* New link */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;