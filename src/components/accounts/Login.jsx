import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import BrandName from '../branding/BrandName';
import { isValidEmailAddress } from '../../common/Helpers';
import { login, requestPasswordReset } from '../../common/Api';

export default function Login() {
    const navigate = useNavigate()
    const [forgotPassword, setForgotPassword] = useState(() => { return false })
    const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(() => { return false })
    const [proposedPassword, setProposedPassword] = useState(() => { return "" })
    const [processFeedback, setProcessFeedback] = useState(() => { return "" })
    const [proposedEmail, setProposedEmail] = useState(() => { return "" })
    const submitForgotPassword = () => {
        try {
            requestPasswordReset({ email_address: proposedEmail })
            setForgotPasswordSubmitted(true)
        } catch (error) {
            return
        }

    }
    const resetForm = () => {
        setProposedPassword("")
        setProposedEmail("")
        setForgotPassword(false)
        setForgotPasswordSubmitted(false)
    }
    const handleKeyPress = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            return attemptLogin()        
        }
    }
    const attemptLogin = () => {
        if (!proposedPassword) return
        if (!isValidEmailAddress(proposedEmail)) return setProcessFeedback("Please enter a valid email address")
        login({emailAddress: proposedEmail, password: proposedPassword})
        .then((res) => {
            if (res.success) {
                return navigate("/landing-welcome")
            }
            if (!res.success) {
                if (res.reason) setProcessFeedback(res.reason)
                setProposedPassword("")
            }
        })
        .catch((err) => {
            setProcessFeedback("Something went wrong. Please try again later")
            return
        })
    }
    return (
        <div className="account">
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
                                        <input type="email" placeholder="Email" autoFocus value={proposedEmail} onChange={(e) => setProposedEmail(e.target.value)} onKeyDown={(e) => handleKeyPress(e)}/>
                                    </div>
                                    <div className="account-form-field">
                                        <p>Password</p>
                                        <input type="password" placeholder="Password" value={proposedPassword} onChange={(e) => setProposedPassword(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                                    </div>
                                    <div className="account-form-submit" onClick={attemptLogin}>
                                        Sign in
                                    </div>
                                    {processFeedback && <div className="account-form-alternate-submit-text-centered account-form-alternate-submit-text-warning">
                                        {processFeedback}
                                    </div>
                                    }
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
                                        <p style={{display: "block"}}>Please email <a href={`mailto:pilgrim@commentpilgrim.com?subject=${encodeURIComponent('Password Reset Request')}&body=${encodeURIComponent('Please finish resetting my password.')}`}>pilgrim@commentpilgrim.com</a> to finish resetting your password</p>
                                        
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