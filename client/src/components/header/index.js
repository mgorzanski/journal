import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Button, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import fontawesome from '@fortawesome/fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
fontawesome.library.add(faLock);

class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
                <header className="header">
                    <section className="page-heading">
                        <h2 className="page-title"><Link to="/">Journal</Link></h2>
                    </section>

                    <nav className="page-nav">
                        <Button color="primary" className="page-nav-unlock-btn"><i className="fas fa-lock"></i> Unlock</Button>
                        <Route render={({ history }) => (
                            <Button color="primary" className="page-nav-new-btn" onClick={() => { history.push('/new') }}>Add new entry</Button>
                        )} />
                        <UncontrolledDropdown className="page-nav-dropdown-menu">
                            <DropdownToggle nav caret>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><Link to="/settings">Settings</Link></DropdownItem>
                                <DropdownItem><Link to="/logout">Logout</Link></DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </nav>
                </header>
            </React.Fragment>
        );
    }
}

export default Header;