import React from "react";
// reactstrap src/components
import {
    Card,
    Container,
    Col, Row, NavItem, NavLink
} from "reactstrap";
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
// core src/components
import RoomNavbar from './RoomNavbar';
import { useCookies } from 'react-cookie';
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
function DiningRoom() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const shadowStyles = useLightTopShadowStyles();
    const [cookies,setCookies]= useCookies();
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
                        <h1 className={styles.header}>Dining Room Units</h1>
                        <h10 className={styles.text}>The activity of eating together is the right moment to gather with family. A comfortable dining room would be an important factor. A table and chairs that fit will make the atmosphere of dining with family be more quality. Find the most comfortable dining tables and chairs in your favorite furniture online shop, only at mybel.com</h10>
                        <br></br>
                        <Row>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Dining Chair")}} to="/index/diningroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/diningroom/diningroomchair.jpg")}/>
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
                                                </CardContent><Typography className={styles.cta} variant={'overline'}>
                                                Dining Chair
                                            </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Dining Table")}} to="/index/diningroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/diningroom/diningroomtable.jpg")}/>
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
                                                    Dining Table
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Dining Cabinet")}} to="/index/diningroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/diningroom/diningroomstorage.jpg")}/>
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
                                                    Dining Cabinet
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                        </Row>
                    </Container>
                    <FooterPage/>
                </Nav>
            </div>
        </>
    );
}
export default DiningRoom;
