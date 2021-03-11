import React, {useState} from "react";
// reactstrap components
import {
    Card,
    Container,
    Col, Row, NavItem, NavLink
} from "reactstrap";
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { useCookies } from 'react-cookie';
// core components
import RoomNavbar from './RoomNavbar';
import cx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import FooterPage from "./FooterPage";
import {withRouter} from "react-router";
import Nav from "reactstrap/es/Nav";
import {Link} from "react-router-dom";
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
        fontWeight: 'bold'
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
function LivingRoom() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const shadowStyles = useLightTopShadowStyles();
    const [cookies, setCookies] = useCookies();
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
    return (
        <>
            <RoomNavbar/>
            <div className="section section-pagination">
                <Nav>
                    <Container>
                        <h1 className={styles.header}>Living Room Units</h1>
                        <h10 className={styles.text}>The living room is the first impression that is obtained in a residential interior. Therefore it is important for you to make this one room look elegant with selected furniture. One of them is a minimalist sofa that can always be the right mainstay to be your living room furniture. Get suitable living room furniture only at mybel.com
                        </h10>
                        <br></br>
                        <Row>
                            <Col md={4} lg={4}>
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Chair")}} to={"/index/livingroom/unit"} tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/livingroom/livingroomchair.jpg")}/>
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
                                                    Chair
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md="4" lg={4}>
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Sofa")}} to="/index/livingroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/livingroom/livingroomsofa.jpg")}/>
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
                                                    Sofa
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md="4" lg={4}>
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Storage")}} to="/index/livingroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/livingroom/livingroomstoraga.jpg")}/>
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
                                                    Storage
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
export default LivingRoom;
