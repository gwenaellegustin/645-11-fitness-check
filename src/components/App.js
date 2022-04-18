import {auth, createUserFirestore, firebaseApp, getUserByUID} from "../config/initFirebase";
import {Route, Routes} from "react-router-dom";
import {Collapse, Nav, Navbar, NavItem, NavbarBrand, NavbarToggler,  NavLink} from 'reactstrap';
import React, {useEffect, useState} from "react";
import {FitnessForm} from "./form/FitnessForm";
import Login from "./Login";
import Home from "./Home";
import {History} from "./history/History";
import {NavDropdown} from "react-bootstrap";

import {Admin} from "./admin/Admin";
import {Loading} from "./Loading";
import {Footer} from "./Footer";

export const UserContext = React.createContext();

function App() {
    const [user, setUser] = useState();
    const [collapse, isCollapse] = useState(true);

    // Local signed-in state.
    const [isSignedIn, setIsSignedIn] = useState(null);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebaseApp
            .auth()
            .onAuthStateChanged( (firebaseUser) => {
                setIsSignedIn(!!firebaseUser); // if there is a user, set to true
                if (firebaseUser !== null){
                    // Create user in Firestore if not already exist
                    createUserFirestore(firebaseUser.uid);
                    getUserByUID(firebaseUser.uid).then(u => setUser(u));
                }
            });
        // Make sure we un-register Firebase observers when the component unmounts.
        return () => unregisterAuthObserver();
    }, []);

    // Not initialized yet - Render loading message
    if (isSignedIn === null) {
        return (
            <Loading/>
        );
    }

    // Not signed in - Render auth screen
    if (!isSignedIn){
        return (
            <div className="App">
                <Login/>
            </div>
        );
    }

    // Sign out
    const handleSignOutClick = async () => {
        await firebaseApp.auth().signOut();
    };

    const toggleNavbar = () => {
        isCollapse(!collapse);
    }


    // Signed in - Render app
    return (
        <UserContext.Provider value={user}>
        <div>
            <Navbar color="light" light  expand="md" container="fluid">
                <NavbarBrand href="/" className="px-3 ">
                   Fitness check
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={!collapse} navbar>
                    <Nav
                        className="me-auto px-3"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/Form">
                                Questionnaire
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/History">
                                Historique
                            </NavLink>
                        </NavItem>
                        {user && user.admin ?
                            <NavItem>
                                <NavLink href="/Admin">
                                    Gestion
                                </NavLink>
                            </NavItem>
                        : null}
                    </Nav>
                    <NavDropdown title={auth.currentUser.displayName}>
                        <NavDropdown.Item onClick={handleSignOutClick}>Se déconnecter</NavDropdown.Item>
                    </NavDropdown>
                </Collapse>
            </Navbar>

            <div className="px-3 m-auto w-75 my-2 text-center">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/form" element={<FitnessForm />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </div>
            <Footer/>
        </div>
        </UserContext.Provider>
    );
}

export default App;
