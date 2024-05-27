import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import BrandName from '../branding/BrandName';
import { resetPassword } from '../../common/Api';

export default function PasswordReset() {
    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search)
    const email = query.get('e')
    const token = query.get('t')
    const [proposedPassword, setProposedPassword] = useState(() => { return "" })
    const [proposedPasswordCheck, setProposedPasswordCheck] = useState(() => { return "" })
    const [isLoading, setIsLoading] = useState(() => { return false })
    const [canSubmitNewPasswordChange, setCanSubmitPasswordChange] = useState(() => { return false })
    const attemptPasswordChange = async () => {
        if (!canSubmitNewPasswordChange) return
        setIsLoading(true)
        const resetRequestPayload = {
            token: token,
            email: email,
            password: proposedPassword
        }
        resetPassword(resetRequestPayload)
        .then((res) => {
            navigate("/login")
        })
        .catch((err) => {
            navigate("/login")
        })
    }
    const validatePasswordProposal = () => {
        try {
            if (!proposedPassword || !proposedPasswordCheck) return setCanSubmitPasswordChange(false)
            if (proposedPassword.length < 8) return setCanSubmitPasswordChange(false)
            if (proposedPassword === proposedPasswordCheck) return setCanSubmitPasswordChange(true)
            return setCanSubmitPasswordChange(false)
        } catch (error) {
            setCanSubmitPasswordChange(false)
        }
    }
    useEffect(() => {
        validatePasswordProposal()
    // eslint-disable-next-line
    }, [proposedPassword, proposedPasswordCheck])
    return (
        <div className="account">
            {/* <GeneralHeader/> */}
            <div className="account-outer">
                <div className="account-inner">
                    <div className="account-form-container-standard">
                        <div className="account-form-container-standard-form">
                            <div className="account-form">
                                <div onClick={() => navigate("/")}><BrandName/></div>
                                <h2>Reset Password</h2>
                                {!isLoading &&
                                <div className="account-form-fields">
                                    <div className="account-form-field">
                                        <p>New password</p>
                                        <input type="password" placeholder="Password" value={proposedPassword} onChange={(e) => setProposedPassword(e.target.value)} />
                                    </div>
                                    <div className="account-form-field">
                                        <p>Repeat password</p>
                                        <input type="password" placeholder="Password" value={proposedPasswordCheck} onChange={(e) => setProposedPasswordCheck(e.target.value)} />
                                    </div>
                                    {canSubmitNewPasswordChange &&
                                    <div className="account-form-submit" onClick={attemptPasswordChange}>
                                        Change Password
                                    </div>
                                    }
                                    {!canSubmitNewPasswordChange &&
                                    <div className="account-form-submit" style={{backgroundColor: "grey"}}>
                                        Change Password
                                    </div>
                                    }
                                </div>
                                }
                                {isLoading &&
                                <div className="plan-loading">
                                    <div>Validating reset request...</div>
                                    <div className="loader"></div>
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
