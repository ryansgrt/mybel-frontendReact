import React from "react";
// reactstrap components
import {
    Card,
    Container,
    Col, Row, NavItem, NavLink
} from "reactstrap";
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
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
import {Link} from "react-router-dom";
import { useCookies } from 'react-cookie';

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
function OfficeRoom() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const [cookies,setCookies]=useCookies();
    const shadowStyles = useLightTopShadowStyles();
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
                <nav>
                    <Container>
                        <h1 className={styles.header}>Office Room Units</h1>
                        <h10 className={styles.text}>Comfort at work is a priority so that all work is not delayed. Work desks or office chairs become one of the best keys to get this comfort. You can also apply this furniture to a special workspace in the house. Fabelio.com always gives you quality and guaranteed workspace furniture. Check right now
                        </h10>
                        <br></br>
                        <Row>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Office Chair")}} to="/index/officeroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/office/officechair.jpg")}/>
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
                                                    Office Chair
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Office Table")}} to="/index/officeroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/office/table.jpg")}/>
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
                                                    Office Table
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md="4">
                                <NavItem>
                                    <NavLink onClick={()=>{setCookies('type',"Office Cabinet")}} to="/index/officeroom/unit" tag={Link}>
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardMedia classes={mediaStyles}
                                                       image={require("../../../assets/img/room/office/officestorage.jpg")}/>
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
                </nav>
                <FooterPage/>
            </div>
        </>
    );
}
export default OfficeRoom;
