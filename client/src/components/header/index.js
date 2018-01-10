import React from 'react';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { Button, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import fontawesome from '@fortawesome/fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import faCaretSquareLeft from '@fortawesome/fontawesome-free-solid/faCaretSquareLeft';
fontawesome.library.add(faLock, faCaretSquareLeft);

class Header extends React.Component {
    render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                <header className="header">
                    <section className="page-heading">
                        { location.pathname === '/' ?
                        <h2 className="page-title"><Link to="/">Journal</Link></h2>
                        :
                        <Route render={({ history }) => (
                            <Button color="secondary" className="page-nav-back-btn" onClick={() => { history.push('/') }}><i className="fas fa-caret-square-left"></i> Back</Button>
                        )} />
                        }
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

const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;