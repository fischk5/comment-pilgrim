import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../common/Api';

import { isValidEmailAddress } from '../../common/Helpers';

import { FaCheck } from "react-icons/fa6";

import BrandName from '../branding/BrandName';

export default function Register() {
    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search)
    const plan = query.get('plan')
    const annual = query.get('annual') === 'true'
    const referrer = query.get('referrer')
    const referralCode = query.get('code')
    const [processFeedback, setProcessFeedback] = useState(() => { return "" })
    const [proposedPlan, setProposedPlan] = useState(() => { return "free" })
    const [proposedPassword, setProposedPassword] = useState(() => { return "" })
    const [proposedSpecialCode, setProposedSpecialCode] = useState(() => {
        if (referralCode) {
            return referralCode
        } else {
            return ""
        }
    })
    const [isSubmitted, setIsSubmitted] = useState(() => { return "" })
    const [proposedEmail, setProposedEmail] = useState(() => { return "" })
    const [proposedPlanIsAnnual, setProposedPlanIsAnnual] = useState(() => { return false })
    const updateProposedPlan = () => {
        try {
            if (["free", "starter", "standard", "agency"].includes(plan)) setProposedPlan(plan)
            if (annual) {
                setProposedPlanIsAnnual(true)
            } else {
                setProposedPlanIsAnnual(false)
            }
        } catch (error) {
            setProposedPlan("free")
            setProposedPlanIsAnnual(false)
        }
    }
    const getPasswordValidationSign = () => {
        try {
            if (!proposedPassword) return false
            if (proposedPassword.length >= 8) return <FaCheck/>
            if (proposedPassword.length > 2) return `${proposedPassword.length}/8`
            return false
        } catch (error) {
            return false
        }
    }
    const handleKeyPress = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            return registerUser()        
        }
    }
    const registerUser = () => {
        if (isSubmitted) return
        if (!isValidEmailAddress(proposedEmail)) return setProcessFeedback("Please enter a valid email address")
        if (!proposedPassword) return setProcessFeedback("Please provide a password that is at least 8 characters long")
        if (proposedPassword.length < 8) return setProcessFeedback("Your password needs to be at least 8 characters long")
        if (referrer === "appsumo") {
            if (!proposedSpecialCode) return setProcessFeedback("Please enter your AppSumo code to continue")
            setProposedPlan("standard")
        }
        setIsSubmitted(true)
        setProcessFeedback("")
        let payload = {
            emailAddress: proposedEmail.toLowerCase().trim(),
            password: proposedPassword,
            proposed_plan: proposedPlan,
            proposed_plan_annual: proposedPlanIsAnnual
        }
        if (referrer === "appsumo") {
            payload['code'] = proposedSpecialCode
            payload['proposed_plan'] = "standard"
            payload['proposed_plan_annual'] = true
            payload['referral'] = "appsumo"
        }
        registerNewUser(payload)
        .then( (res) => {
            if (!res) {
                setProcessFeedback("Something went wrong creating your account. Please try again later.")
                setIsSubmitted(false)
                return
            }
            if (!res.success) {
                if (res.exists) {
                    setProcessFeedback("An account is already registered with that email address")
                    setIsSubmitted(false)
                    return
                }
                if (res.invalid_code) {
                    setProcessFeedback("That code is not valid. If you believe this is a mistake, please email support@commentpilgrim.com")
                    setIsSubmitted(false)
                    return
                }
                if (res.sub_failure) {
                    setProcessFeedback("Something went wrong setting up your account. If this continues, please email support@commentpilgrim.com")
                    setIsSubmitted(false)
                    return
                }
            }
            if (res.success) {
                if (res.redirect_path) {
                    window.location.replace(res.redirect_path)
                }
            }
        })
        .catch((err) => {
            return
        });;
    }
    useEffect(() => {
        setProcessFeedback("")
    }, [proposedEmail, proposedPassword])
    useEffect(() => {
        updateProposedPlan()
    // eslint-disable-next-line
    }, [plan, annual])
    return (
        <div className="account">
            <div className="account-outer">
                <div className="account-inner">
                    <div className="account-form-container-standard">
                        <div className="account-form-container-standard-form">
                            <div className="account-form">
                                <div onClick={() => navigate("/")}><BrandName/></div>
                                <SignupHeaderInformation referrer={referrer} />
                                <div className="account-form-fields">
                                    <div className="account-form-field">
                                        <p>Email address</p>
                                        <input type="email" placeholder="Email" autoFocus value={proposedEmail} maxLength={80} onChange={(e) => setProposedEmail(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                                    </div>
                                    {referrer === "appsumo" &&
                                    <div className="account-form-field">
                                        <p>AppSumo Code</p>
                                        <input style={proposedSpecialCode.length > 0 ? {fontWeight: 600, color: "var(--cp-color-brand-primary)"} : {}} type="text" placeholder="Paste your AppSumo code here" value={proposedSpecialCode} maxLength={80} onChange={(e) => setProposedSpecialCode(e.target.value)} />
                                    </div>
                                    }
                                    <div className="account-form-field">
                                        <p>Select a password <span>{getPasswordValidationSign()}</span></p>
                                        <input type="password" placeholder="Password" value={proposedPassword} maxLength={80} onChange={(e) => setProposedPassword(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                                    </div>
                                    {!isSubmitted &&
                                    <div className="account-form-submit" onClick={registerUser}>
                                        Get Started
                                    </div>
                                    }
                                    {!isSubmitted &&
                                    <div className="account-form-alternate-submit-text-centered">
                                        If you already have an account, <span onClick={() => navigate('/login')}>sign in here</span>
                                    </div>
                                    }
                                    {processFeedback && <div className="account-form-alternate-submit-text-centered account-form-alternate-submit-text-warning">
                                        {processFeedback}
                                    </div>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="account-form-container-standard-image">
                            <img src="https://storage.googleapis.com/comment-pilgrim-public/pexels-rdne-8370430.jpg" alt="Creator looking at her stuff" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

function SignupHeaderInformation({referrer}) {
    if (referrer === "appsumo") {
        return (
            <h2>Welcome, Sumo-ling! 👋</h2>
        )
    } else {
        return (
            <h2>Sign Up</h2>
        )
    }

}