import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    UncontrolledTooltip,
} from "reactstrap";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {useCookies} from "react-cookie";
import {BASEURL} from "../../../shared/BaseURL";

const StyledBadge = withStyles((theme) => ({

    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function RoomNavbar() {
    const [cookies, setCookies] = useCookies();
    const [navbarColor, setNavbarColor] = React.useState("navbar-blue");
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
                setNavbarColor("navbar-blue");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });
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
            <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
                <Container>
                    <div className="navbar-translate">
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
                        className="justify-content-start"
                        isOpen={collapseOpen}
                        navbar
                    >
                        <Nav navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    href="#pablo"
                                    nav
                                    onClick={e => e.preventDefault()}
                                >
                                    <p>Living Room</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={()=>{setCookies('type',"Sofa")}} to="/index/livingroom/unit" tag={Link}>
                                        Sofa
                                    </DropdownItem>
                                    <DropdownItem onClick={()=>{setCookies('type',"Chair")}} to="/index/livingroom/unit" tag={Link}>
                                        Chair
                                    </DropdownItem>
                                    <DropdownItem onClick={()=>{setCookies('type',"Storage")}} to="/index/livingroom/unit" tag={Link}>
                                        Storage
                                    </DropdownItem>
                                    <DropdownItem to="/index/livingroom/design-livingroom" tag={Link}>
                                        Living Room Design
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    href="#pablo"
                                    nav
                                    onClick={e => e.preventDefault()}
                                >
                                    <p>Bed Room</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={()=>{setCookies('type',"Bed")}} to="/index/bedroom/unit" tag={Link}>
                                        Bed
                                    </DropdownItem>
                                    <DropdownItem onClick={()=>{setCookies('type',"Mattress")}} to="/index/bedroom/unit" tag={Link}>
                                        Mattress
                                    </DropdownItem>
                                    <DropdownItem onClick={()=>{setCookies('type',"Cabinet")}} to="/index/bedroom/unit" tag={Link}>
                                        Cabinets
                                    </DropdownItem>
                                    <DropdownItem to="/index/bedroom/design-bedroom" tag={Link}>
                                        Bed Room Design
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    href="#pablo"
                                    nav
                                    onClick={e => e.preventDefault()}
                                >
                                    <p>Dining Room</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={()=>{setCookies('type',"Dining Chair")}}to="/index/diningroom/unit" tag={Link}>
                                        Chair
                                    </DropdownItem>
                                    <DropdownItem onClick={()=>{setCookies('type',"Dining Table")}} to="/index/diningroom/unit" tag={Link}>
                                        Dining Table
                                    </DropdownItem>
                                    <DropdownItem onClick={()=>{setCookies('type',"Dining Cabinet")}} to="/index/diningroom/unit" tag={Link}>
                                        Cabinets
                                    </DropdownItem>
                                    <DropdownItem to="/index/diningroom/design-diningroom" tag={Link}>
                                        Dining Room Design
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    href="#pablo"
                                    nav
                                    onClick={e => e.preventDefault()}
                                >
                                    <p>Office Room</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={()=>{setCookies('type',"Office Chair")}} to="/index/officeroom/unit" tag={Link}>
                                        Office Chair
                                    </DropdownItem>
                                    <DropdownItem onClick={()=>{setCookies('type',"Office Table")}} to="/index/officeroom/unit" tag={Link}>
                                        Office Table
                                    </DropdownItem>
                                    <DropdownItem onClick={()=>{setCookies('type',"Office Cabinet")}} to="/index/officeroom/unit" tag={Link}>
                                        Cabinets
                                    </DropdownItem>
                                    <DropdownItem to="/index/officeroom/design-office" tag={Link}>
                                        Office Room Design
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>

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
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    href="#pablo"
                                    nav
                                    onClick={e => e.preventDefault()}
                                >
                                    <AccountCircleIcon className="mr-1"/>
                                    <p> Customer</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem to="/user/register" tag={Link}>
                                        <i className="now-ui-icons files_paper"></i>
                                        Registration
                                    </DropdownItem>
                                    <DropdownItem to="/user" tag={Link}>
                                        <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                                        Login
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <NavItem>
                                <NavLink
                                    href="https://twitter.com/enigmacamp"
                                    target="_blank"
                                    id="twitter-tooltip"
                                >
                                    <TwitterIcon/>
                                    <p className="d-lg-none d-xl-none">Twitter</p>
                                </NavLink>
                                <UncontrolledTooltip target="#twitter-tooltip">
                                    Follow us on Twitter
                                </UncontrolledTooltip>
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
                                <UncontrolledTooltip target="#facebook-tooltip">
                                    Like us on Facebook
                                </UncontrolledTooltip>
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
                                <UncontrolledTooltip target="#instagram-tooltip">
                                    Follow us on Instagram
                                </UncontrolledTooltip>
                            </NavItem>
                            {/*<div className={classes.root}>*/}
                            <StyledBadge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                        {
                                            cookies.user===null || cookies.user===undefined ?
                                                <Avatar  src={require("../../../assets/img/photoDefault.png")}></Avatar> :
                                                <NavItem>
                                                 <NavLink to="/user/profile" tag={Link}>
                                                <Avatar src={`${BASEURL}/user/photo/${cookies.user}`}></Avatar>
                                                 </NavLink>
                                                </NavItem>

                                        }


                            </StyledBadge>
                            {/*</div>*/}
                        </Nav>
                    </Collapse>

                </Container>
            </Navbar>
        </>
    );
}

export default RoomNavbar;
