// src/GoogleLoginButton.tsx
import React from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { auth, provider } from "config/firebaseConfig";
import styled from "./styled.module.scss";
import { customAxiosLocalTest } from "utils/customAxios";
import icon from "assets/icons/google.png";

const GoogleLoginButton: React.FC = () => {
  const fetchGoogle = async () => {
    try {
      const auth = getAuth();
      auth.currentUser
        ?.getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
          // Send idToken to your backend
          console.log("Token:", idToken);
          if (idToken) {
            customAxiosLocalTest()
              .post("/user/google", {
                token: idToken,
              })
              .then((response) => {
                //setLoading(false);
                alert(response);
                if (response?.data?.status === "error") {
                  //setShowAlertInfo({ open: true, text: response?.data?.message || "error" });
                } else {
                  //setOpenSuccessModal(completeTelegram);
                }
              })
              .catch((error) => {
                //setLoading(false);
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error("Error retrieving ID token:", error);
        });
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      console.log("User Info:", user);
      console.log("Token:", token);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <button className={styled.googleLoginButton} onClick={fetchGoogle}>
      <img src={icon} alt="Google" className={styled.googleIcon} />
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
