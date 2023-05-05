//import React from 'react'
import React, { useState, useRef } from "react";
import "../App.css"

const Main = () => {
    const [showPopup, setShowPopup] = useState(false);
    const inputRefs = useRef([]);

    function handleButtonClick() {
        setShowPopup(true);
      }
    
      function handleInputChange(index, event) {
        const value = event.target.value;
        if (/^[0-9]{0,1}$/.test(value)) {
          // Only allow numeric values
          inputRefs.current[index].value = value;
          // Move focus to next input field when a digit is entered
          if (value !== "") {
            if (index < inputRefs.current.length - 1) {
              inputRefs.current[index + 1].focus();
            }
          }
        } else {
          // Clear input if an invalid character is entered
          inputRefs.current[index].value = "";
        }
      }
    
      function handleInputKeyDown(index, event) {
        switch (event.key) {
          case "ArrowLeft":
            if (index > 0) {
              inputRefs.current[index - 1].focus();
            }
            break;
          case "ArrowRight":
            if (index < inputRefs.current.length - 1) {
              inputRefs.current[index + 1].focus();
            }
            break;
          case "Backspace":
            // Delete previous input field and move focus to it
            if (index > 0) {
              inputRefs.current[index - 1].focus();
              inputRefs.current[index - 1].value = "";
            }
            break;
          default:
            break;
        }
      }
    
      function handleInputPaste(event) {
        const pastedText = event.clipboardData.getData("text");
        if (/^[0-9]{6}$/.test(pastedText)) {
          // Auto-fill input fields with pasted OTP
          const otpChars = pastedText.split("");
          otpChars.forEach((char, index) => {
            inputRefs.current[index].value = char;
          });
        }
      }
    
      function handleFormSubmit(event) {
        event.preventDefault();
        let otp = "";
        inputRefs.current.forEach((input) => {
          otp += input.value;
        });
        if (/^[0-9]{6}$/.test(otp)) {
          // OTP is valid, do something
          setShowPopup(false);
        } else {
          // OTP is invalid, show an error message or clear the input fields
          inputRefs.current.forEach((input) => {
            input.value = "";
          });
        }
      }
    
      const otpInputs = [];
      for (let i = 0; i < 6; i++) {
        otpInputs.push(
          <input
            type="text"
            key={i}
            maxLength="1"
            style={{ width: "2rem", marginRight: "0.5rem" }}
            ref={(el) => (inputRefs.current[i] = el)}
            onChange={(e) => handleInputChange(i, e)}
            onKeyDown={(e) => handleInputKeyDown(i, e)}
            onPaste={(e) => handleInputPaste(e)}
          />
        );
      }
  return (
    <div>
         <div>
      <button type="button" className="button1 btn btn-info mx-2 my-2" onClick={handleButtonClick}>Click Me to Verify Phone</button>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <div
        style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "1.5rem",
        
        }}
        >
        <h2>Phone Verification</h2>
        <p>Enter the 6-digit OTP sent to your phone: 8851X-XXXXX</p>
        <form onSubmit={handleFormSubmit}>
        {otpInputs}
        <br />
        <div className="text">
        <p className="te">change number</p>
        <p className="te">resend otp</p>
        </div>
        <button className="btn btn-secondary my-3 " type="submit">Submit</button>
        </form>
        </div>
        </div>
        )}
        </div>
    </div>
  )
}

export default Main