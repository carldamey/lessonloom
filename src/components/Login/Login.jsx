import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import { loginUser } from "../../utilities/users-api";
import { useNavigate } from "react-router-dom";

export default function Login({ showNav, setShowNav, user, setUser }) {
    const google = window.google;
    const [buttonState, setButtonState] = useState();
    const navigate = useNavigate();

    function handleCallbackResponse(response) {
        const idToken = response.credential;
        console.log("encoded jwt id token: ", response.credential);
        const userObject = jwtDecode(response.credential);
        console.log(userObject);
        const newUser = {
            name: userObject.name,
            email: userObject.email,
            picture: userObject.picture,
            googleId: userObject.sub,
        };
        const userData = {
            userInfo: newUser,
            idToken,
            CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        };
        console.log(newUser.googleId);
        setUser(newUser);
        loginUser(userData);
        localStorage.setItem("token", response.credential);
        setShowNav(true);
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            ux_mode: "popup",
            callback: handleCallbackResponse,
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                type: "standard",
                theme: "filled_blue",
                size: "large",
                shape: "pill",
                logo_alignment: "center",
                text: "signin_with",
            }
        );
    }, [showNav]);

    function onSignOut() {
        setUser(null);
        setShowNav(false);
        localStorage.clear();
        google.accounts.id.disableAutoSelect();
        navigate("/");
    }

    useEffect(() => {
        setButtonState(
        <>
            { localStorage.getItem("token") ? 
                <button id="signOutDiv" onClick={onSignOut}>
                    Sign Out
                </button>
            :
            <div className="googleSignIn" id="signInDiv"></div>}
        </>
        )
    }, user)

    return (
        {buttonState}
    );
}
