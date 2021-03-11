import React from 'react';

import Chat from '../../src/chat/Chat/Chat';
import Join from '../../src/chat/Join/Join';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import Vendor from "../../views/Vendor/VendorStore";
// import User from "../../views/User/UserStore";

const ChatForum = () => {
    return (
        <Router>


            <Route path="/forum" exact component={Join} />
            <Route path="/forum/chat" component={Chat} />
        </Router>
    );
}

export default ChatForum;
