import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

// reactstrap components
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    UncontrolledTooltip
} from "reactstrap";
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
function UserNavbar() {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 399 ||
                document.body.scrollTop > 399
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 400 ||
                document.body.scrollTop < 400
            ) {
                setNavbarColor("navbar-transparent");
            }
        };

        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    const [cookies, removeCookie] = useCookies();
    const handleLogout=()=>{
        removeCookie('user')
    }

    return (
        <>
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
                <Container>
                    <UncontrolledDropdown className="button-dropdown">
                        <DropdownToggle
                            caret
                            data-toggle="dropdown"
                            href="#pablo"
                            id="navbarDropdown"
                            tag="a"
                            onClick={e => e.preventDefault()}
                        >
                            <span className="button-bar"></span>
                            <span className="button-bar"></span>
                            <span className="button-bar"></span>
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="navbarDropdown">
                            <DropdownItem header tag="a">
                                Dropdown header
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                Action
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                Another action
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                Something else here
                            </DropdownItem>
                            <DropdownItem divider></DropdownItem>
                            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                Separated link
                            </DropdownItem>
                            <DropdownItem divider></DropdownItem>
                            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                One more separated link
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <div className="navbar-translate">
                        <NavbarBrand
                            href=""
                            target="_blank"
                            id="navbar-brand"
                        >
                            MyBel Furniture
                        </NavbarBrand>

                        <button
                            className="navbar-toggler navbar-toggler"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setCollapseOpen(!collapseOpen);
                            }}
                            aria-expanded={collapseOpen}
                            type="button"
                        >
                            <span className="navbar-toggler-bar top-bar"></span>
                            <span className="navbar-toggler-bar middle-bar"></span>
                            <span className="navbar-toggler-bar bottom-bar"></span>
                        </button>
                    </div>
                    <Collapse
                        className="justify-content-end"
                        isOpen={collapseOpen}
                        navbar
                    >
                        <Nav navbar>
                            <NavItem>
                                <NavLink to="/index" tag={Link}>
                                    Back to Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    Need Help?
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="https://twitter.com/enigmacamp"
                                    target="_blank"
                                    id="twitter-tooltip"
                                >
                                    <TwitterIcon/>
                                    <p className="d-lg-none d-xl-none">Twitter</p>
                                </NavLink>

                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="https://www.facebook.com/Enigmacamp-Information-Technology-Bootcamp-551451092021104/"
                                    target="_blank"
                                    id="facebook-tooltip"
                                >
                                    <FacebookIcon/>
                                    <p className="d-lg-none d-xl-none">Facebook</p>
                                </NavLink>

                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="https://www.instagram.com/enigmacamp/?hl=id"
                                    target="_blank"
                                    id="instagram-tooltip"
                                >
                                    <InstagramIcon/>
                                    <p className="d-lg-none d-xl-none">Instagram</p>
                                </NavLink>

                            </NavItem>

                            <NavItem>
                                <NavLink
                                    color="default"
                                    href="#pablo"
                                    nav
                                    to="/user" tag={Link}
                                    onClick={() => handleLogout()}
                                >
                                    <ExitToAppIcon/> Logout
                                    <p className="d-lg-none d-xl-none">Logout</p>
                                </NavLink>


                            </NavItem>

                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default UserNavbar;
