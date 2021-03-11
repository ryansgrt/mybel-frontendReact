import React from "react";

// reactstrap components
import {
    Container,
} from "reactstrap";
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';

import {makeStyles} from "@material-ui/core/styles";
import Nav from "reactstrap/es/Nav";
import FooterPage from "../../views/product/RoomCategory/FooterPage";
import GoogleMap from "../../views/ShowRoomPage/GoogleMap";
import RoomNavbar from "../../views/product/RoomCategory/RoomNavbar";
import Space from "../../views/ShowRoomPage/Space";

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
function ShowRoom() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const shadowStyles = useLightTopShadowStyles();
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
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

                {/*<GoogleMap/>*/}
                <Nav>
                    <GoogleMap/>
                    <Container>
                        <h1 className={styles.header}>Find Our Show Room</h1>

                        <br></br>




                    </Container>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>


                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>


                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>
                    <Space/>

                    <FooterPage/>
                </Nav>
            </div>
        </>
    );
}

export default ShowRoom;
