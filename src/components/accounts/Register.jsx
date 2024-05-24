import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { FaCheck } from "react-icons/fa6";

import BrandName from '../branding/BrandName';

export default function Register() {
    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search)
    const plan = query.get('plan')
    const annual = query.get('annual') === 'true'
    const [proposedPlan, setProposedPlan] = useState(() => { return "free" })
    const [proposedPassword, setProposedPassword] = useState(() => { return "" })
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
                                        <input type="email" placeholder="Email" autoFocus value={proposedEmail} onChange={(e) => setProposedEmail(e.target.value)} />
                                    </div>
                                    <div className="account-form-field">
                                        <p>Select a password <span>{getPasswordValidationSign()}</span></p>
                                        <input type="password" placeholder="Password" value={proposedPassword} onChange={(e) => setProposedPassword(e.target.value)} />
                                    </div>
                                    <div className="account-form-submit">
                                        Get Started
                                    </div>
                                    <div className="account-form-alternate-submit-text-centered">
                                        If you already have an account, <span onClick={() => navigate('/login')}>sign in here</span>
                                    </div>
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
