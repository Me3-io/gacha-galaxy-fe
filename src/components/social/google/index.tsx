// src/GoogleLoginButton.tsx
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from 'config/firebaseConfig';
import './styled.module.css';
import { customAxiosLocalTest } from 'utils/customAxios';

const GoogleLoginButton: React.FC = () => {

  const fetchGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result); 
      const token = credential?.accessToken;
      const user = result.user;

      console.log("User Info:", user);
      console.log("Token:", token);

      if (token) {
        customAxiosLocalTest()
        .post("/user/google", {
          token: token
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

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <button className="google-login-button" onClick={fetchGoogle}>
      <img src="google-icon.png" alt="Google Icon" className="google-icon" />
      Login with Google
    </button>
  );

};

export default GoogleLoginButton;

