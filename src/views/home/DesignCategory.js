import React from "react";

// reactstrap components
import {
    Badge,
    NavItem,
    NavLink,
    Nav,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Container,
    Row,
    Col
} from "reactstrap";
// import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
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
}));
// core components


function DesignCategory() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const shadowStyles = useLightTopShadowStyles();
    const [pills, setPills] = React.useState("2");
    return (
        <>
            <div className="section section-pagination">
                <Nav>
                <Container>
                    <h1 className={styles.header}>Interior Design Category</h1>
                    <Row>
                        <Col md="3">
                            <NavItem>
                                <NavLink to="/index/livingroom/design-livingroom" tag={Link}>
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia classes={mediaStyles} image={require("../../assets/img/vector/livingroom.jpg")} />
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
                                        Living Room
                                    </Typography>
                                </CardActionArea>
                            </Card>
                                </NavLink>
                            </NavItem>
                        </Col>
                        <Col md="3">
                            <NavItem>
                                <NavLink to="/index/bedroom/design-bedroom" tag={Link}>
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia classes={mediaStyles}image={require("../../assets/img/vector/bedroom.jpg")} />
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
                                            {/*<h1 className={styles.title}>Space</h1>*/}
                                            {/*<p>The space between the stars and galaxies is largely empty.</p>*/}
                                        </Box>

                                    </CardContent>
                                    <Typography className={styles.cta} variant={'overline'}>
                                        Bed Room
                                    </Typography>
                                </CardActionArea>
                            </Card>
                                </NavLink>
                            </NavItem>
                        </Col>

                        <Col md="3">
                            <NavItem>
                                <NavLink to="/index/diningroom/design-diningroom" tag={Link}>
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia classes={mediaStyles} image={require("../../assets/img/vector/diningroom.jpg")} />
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
                                            {/*<h1 className={styles.title}>Space</h1>*/}
                                            {/*<p>The space between the stars and galaxies is largely empty.</p>*/}
                                        </Box>

                                    </CardContent>
                                    <Typography className={styles.cta} variant={'overline'}>
                                        Dining Room
                                    </Typography>
                                </CardActionArea>
                            </Card>
                                </NavLink>
                            </NavItem>
                        </Col>

                        <Col md="3">
                            <NavItem>
                                <NavLink to="/index/officeroom/design-office" tag={Link}>
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia classes={mediaStyles} image={require("../../assets/img/vector/office.jpg")} />
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
                                        Office Room
                                    </Typography>
                                </CardActionArea>
                            </Card>
                                </NavLink>
                            </NavItem>
                        </Col>
                    </Row>

                    <div className="space"></div>

                </Container>
                </Nav>
            </div>
        </>
    );
}

export default DesignCategory;
