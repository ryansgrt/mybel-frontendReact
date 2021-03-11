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
import {Button} from "reactstrap";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";


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
        fontWeight: 200,
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


function Category() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const shadowStyles = useLightTopShadowStyles();
    const [pills, setPills] = React.useState("2");
    return (
        <>
            <div className="section section-pagination">
                <Nav>
                <Container>
                    <h1 className={styles.header}>Furniture Room Category</h1>
                    <Row>
                        <Col md="3">
                            <NavItem>
                                <NavLink to="/index/livingroom" tag={Link}>
                                    <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia  component="img"
                                            color="primary"
                                            height="200" image={require("../../assets/img/roomcategory/livingroom.jpg")} />
                                <CardActionArea>
                                    <CardContent className={styles.content}>
                                        <Typography variant="body4" color="textSecondary" component="p">
                                            Living Room
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                                </NavLink>
                            </NavItem>
                        </Col>
                            <Col md="3">
                                <NavItem>
                                    <NavLink to="/index/bedroom" tag={Link}>
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia component="img"
                                           color="primary"
                                           height="200"image={require("../../assets/img/roomcategory/bedroom.jpg")} />
                                <CardActionArea>
                                        <CardContent className={styles.content}>
                                            <Typography variant="body4" color="textSecondary" component="p">
                                                Bed Room
                                            </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                                    </NavLink>
                                </NavItem>
                        </Col>

                        <Col md="3">
                            <NavItem>
                                <NavLink to="/index/diningroom" tag={Link}>
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia component="img"
                                           color="primary"
                                           height="200" image={require("../../assets/img/roomcategory/diningroom.jpg")} />
                                <CardActionArea>
                                    <CardContent className={styles.content}>
                                        <Typography variant="body4" color="textSecondary" component="p">
                                            Dining Room
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                                </NavLink>
                            </NavItem>
                        </Col>

                        <Col md="3">
                            <NavItem>
                                <NavLink to="/index/officeroom" tag={Link}>
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia  component="img"
                                            color="primary"
                                            height="200"
                                            image={require("../../assets/img/roomcategory/office.jpg")} />
                                <CardActionArea>
                                    <CardContent className={styles.content}>
                                        <Typography variant="body4" color="textSecondary" component="p">
                                            Office Room
                                        </Typography>
                                    </CardContent>
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

export default Category;
