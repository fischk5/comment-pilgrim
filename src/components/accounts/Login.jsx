import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import BrandName from '../branding/BrandName';

export default function Login() {
    const navigate = useNavigate()
    const [forgotPassword, setForgotPassword] = useState(() => { return false })
    const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(() => { return false })
    const [proposedPassword, setProposedPassword] = useState(() => { return "" })
    const [proposedEmail, setProposedEmail] = useState(() => { return "" })
    const submitForgotPassword = () => {
        // send submit forgot password to backend
        setForgotPasswordSubmitted(true)
    }
    const resetForm = () => {
        setProposedPassword("")
        setProposedEmail("")
        setForgotPassword(false)
        setForgotPasswordSubmitted(false)
    }
    return (
        <div className="account">
            {/* <GeneralHeader/> */}
            <div className="account-outer">
                <div className="account-inner">
                    <div className="account-form-container-standard">
                        <div className="account-form-container-standard-image">
                            <img src="https://storage.googleapis.com/comment-pilgrim-public/pexels-kun-fotografi-506396-1230302.jpg" alt="Man on a camping trip" style={{objectPosition: "right center"}} />
                        </div>
                        <div className="account-form-container-standard-form">
                            <div className="account-form">
                                <div onClick={() => navigate("/")}><BrandName/></div>
                                <h2>{forgotPassword ? "Password reset" : "Sign In"}</h2>
                                {!forgotPassword &&
                                <div className="account-form-fields">
                                    <div className="account-form-field">
                                        <p>Email</p>
                                        <input type="email" placeholder="Email" autoFocus value={proposedEmail} onChange={(e) => setProposedEmail(e.target.value)} />
                                    </div>
                                    <div className="account-form-field">
                                        <p>Password</p>
                                        <input type="password" placeholder="Password" value={proposedPassword} onChange={(e) => setProposedPassword(e.target.value)} />
                                    </div>
                                    <div className="account-form-submit">
                                        Sign in
                                    </div>
                                    <div className="account-form-alternate-submit-text-centered">
                                        No account? <span onClick={() => navigate("/register")}>Sign up here</span>
                                    </div>
                                    <div className="account-form-alternate-submit-text-centered">
                                        <span onClick={() => setForgotPassword(true)}>Forgot Password</span>
                                    </div>
                                </div>}
                                {forgotPassword && !forgotPasswordSubmitted &&
                                <div className="account-form-fields">
                                    <div className="account-form-field">
                                        <p>Enter your email</p>
                                        <input type="email" placeholder="Email" autoFocus value={proposedEmail} onChange={(e) => setProposedEmail(e.target.value)} />
                                    </div>
                                    <div className="account-form-submit" onClick={submitForgotPassword}>
                                        Submit
                                    </div>
                                    <div className="account-form-alternate-submit-text-centered">
                                        <span onClick={() => setForgotPassword(false)}>Go back</span>
                                    </div>
                                </div>
                                }
                                {forgotPassword && forgotPasswordSubmitted &&
                                <div className="account-form-fields">
                                    <div className="account-form-field">
                                        <p>An email has been sent to your account to reset your password</p>
                                    </div>
                                    <div className="account-form-alternate-submit-text-centered">
                                        <span onClick={resetForm}>Go back</span>
                                    </div>
                                </div>
                                }
                            </div>

                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    )
}