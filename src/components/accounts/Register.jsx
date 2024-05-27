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
    const [processFeedback, setProcessFeedback] = useState(() => { return "" })
    const [proposedPlan, setProposedPlan] = useState(() => { return "free" })
    const [proposedPassword, setProposedPassword] = useState(() => { return "" })
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
        setIsSubmitted(true)
        setProcessFeedback("")
        const payload = {
            emailAddress: proposedEmail.toLowerCase().trim(),
            password: proposedPassword,
            proposed_plan: proposedPlan,
            proposed_plan_annual: proposedPlanIsAnnual
        }
        registerNewUser(payload)
        .then( (res) => {
            console.log('RESPONSE')
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
            }
            if (res.success) {
                if (res.redirect_path) {
                    window.location.replace(res.redirect_path)
                }
            }
        })
        .catch((err) => {
            console.log('ERROR')
            console.log(err)
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
            {/* <GeneralHeader/> */}
            <div className="account-outer">
                <div className="account-inner">
                    <div className="account-form-container-standard">
                        <div className="account-form-container-standard-form">
                            <div className="account-form">
                                <div onClick={() => navigate("/")}><BrandName/></div>
                                <h2>Sign Up</h2>
                                <div className="account-form-fields">
                                    <div className="account-form-field">
                                        <p>Email address</p>
                                        <input type="email" placeholder="Email" autoFocus value={proposedEmail} maxLength={80} onChange={(e) => setProposedEmail(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                                    </div>
                                    <div className="account-form-field">
                                        <p>Select a password <span>{getPasswordValidationSign()}</span></p>
                                        <input type="password" placeholder="Password" value={proposedPassword} maxLength={80} onChange={(e) => setProposedPassword(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                                    </div>
                                    {!isSubmitted &&
                                    <div className="account-form-submit" onClick={registerUser}>
                                        Get Started
                                    </div>
                                    }
                                    <div className="account-form-alternate-submit-text-centered">
                                        If you already have an account, <span onClick={() => navigate('/login')}>sign in here</span>
                                    </div>
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
