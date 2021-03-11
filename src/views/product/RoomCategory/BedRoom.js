import React, {useState} from "react";
// reactstrap components
import {
    Card,
    Container,
    Col, Row, Nav, NavItem, NavLink
} from "reactstrap";
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
// core components
import RoomNavbar from './RoomNavbar';
import cx from "clsx";
import { useCookies } from 'react-cookie';
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import FooterPage from "./FooterPage";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {getTypes} from "../Services/TypeRoom";
const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 200,
        margin: 'auto',
        borderRadius: 0,
        position: 'relative',
    },
    content: {
        padding: 24,
    },
    cta: {
        display: 'block',
        textAlign: 'center',
        color: '#fff',
        letterSpacing: '3px',
        fontWeight: 'bold',
        fontSize: 12,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        letterSpacing: '2px',
    },
    header: {
        display: 'block',
        textAlign: 'center',
        color: '#000000',
        letterSpacing: '2px',
        fontWeight: 200,
        fontSize: 40,
    },
    text: {
        display: 'block',
        textAlign: 'center',
        color: '#000000',
        letterSpacing: '2px',
        fontWeight: 200,
        fontSize: 20,
    },
}));
function BedRoom() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const shadowStyles = useLightTopShadowStyles();
    const [cookies,setCookies]= useCookies();
    const [types,setTypes]=useState([]);
    React.useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("login-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });
    React.useEffect(()=>{
        getTypes()
            .then((response)=>{
                setTypes(response)
            })
    },[])
    return (
        <>
            <RoomNavbar/>
            <div className="section section-pagination">
                <Nav>
                    <Container>
                        <h1 className={styles.header}>Bed Room Units</h1>
                        <h10 className={styles.text}>Rest is a key to happiness. A bedroom filled with comfortable furniture is a must for attention. Furniture such as beds, wardrobes, side tables, to the cabinet can make the atmosphere of your bedroom better. Make sure you get your favorite bedroom furniture only at Mybel.com</h10>
                        <br></br>
                        <Row>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Bed")}} to="/index/bedroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/bedroom/bedroombed.jpg")}/>
                                            <CardActionArea>
                                                <CardContent className={styles.content}>
                                                    <Box
                                                        display={'flex'}
                                                        flexDirection={'column'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                        minHeight={200}
                                                        color={'common.white'}
                                                        textAlign={'center'}
                                                    >
                                                    </Box>
                                                </CardContent>
                                                <Typography className={styles.cta} variant={'overline'}>
                                                    Bed
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Mattress")}} to="/index/bedroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/bedroom/bedroommatress.jpg")}/>
                                            <CardActionArea>
                                                <CardContent className={styles.content}>
                                                    <Box
                                                        display={'flex'}
                                                        flexDirection={'column'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                        minHeight={200}
                                                        color={'common.white'}
                                                        textAlign={'center'}
                                                    >
                                                    </Box>
                                                </CardContent>
                                                <Typography className={styles.cta} variant={'overline'}>
                                                    Mattress
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Cabinet")}} to="/index/bedroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/bedroom/bedroomstorage.jpg")}/>
                                            <CardActionArea>
                                                <CardContent className={styles.content}>
                                                    <Box
                                                        display={'flex'}
                                                        flexDirection={'column'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                        minHeight={200}
                                                        color={'common.white'}
                                                        textAlign={'center'}
                                                    >
                                                    </Box>
                                                </CardContent>
                                                <Typography className={styles.cta} variant={'overline'}>
                                                    Cabinet
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                        </Row>
                    </Container>
                </Nav>
                <FooterPage/>
            </div>
        </>
    );
}
export default BedRoom;
