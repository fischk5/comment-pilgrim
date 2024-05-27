import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { getAccountInformation, getAccountManagementUrl } from '../../common/Api'
import { format } from 'date-fns'

import { FaVideo, FaDollarSign } from "react-icons/fa6";

import AuthHeader from '../AuthHeader'

export default function PlanManager({ library, fetchLibrary }) {
    const navigate = useNavigate()
    const [planInfo, setPlanInfo] = useState(() => { return false })
    const [loading, setLoading] = useState(() => { return true })
    const [errorMessage, setErrorMessage] = useState(() => { return "" })
    const fetchPlanDetails = () => {
        getAccountInformation()
        .then((res) => {
            if (!res) {
                setErrorMessage("Something went wrong fetching your account")
                setLoading(false)
                return
            }
            if (res.plan_name) {
                console.log(res)
                setPlanInfo(res)
                setLoading(false)
                return
            }
            setLoading(false)
        })
        .catch((err) => {
            console.log('ERROR')
        })
    }
    const getLicenseUsage = () => {
        try {
            if (planInfo.plan_name === "free") {
                return (
                    <div className="plan-section-use-totals">
                        <span>{planInfo.monthly_total}</span> videos generated
                    </div>
                )
            } else {
                return (
                    <div className="plan-section-use-totals">
                        <span>{planInfo.monthly_total}</span> of {planInfo.monthly_limit} /month
                    </div>
                )
            }
        } catch (error) {
            return false
        }
        
    }
    const handleAccountClick = () => {
        getAccountManagementUrl()
        .then((res) => {
            if (!res) {
                setPlanInfo(false)
                setErrorMessage("Please contact support at support@commentpilgrim.com")
                return
            }
            if (res.url) {
                window.location.replace(res.url)
            }
        })
        .catch((err) => {
            setPlanInfo(false)
            setErrorMessage("Please contact support at support@commentpilgrim.com")
        })
    }
    const getPlanName = () => {
        try {
            if (planInfo.plan_name === "free") return "Complimentary Trial"
            return planInfo.plan_name
        } catch (error) {
            setPlanInfo(false)
            return false
        }
    }
    const getCurrentPeriodInformation = () => {
        try {
            if (planInfo.plan_name === "free") return false
            return (
                <div className="plan-section-terms" style={{marginTop: "20px"}}>
                    <div className="plan-term">
                        <div>From</div>
                        <span>{format(planInfo.current_period_start, "MMM d, yyyy")}</span>
                    </div>
                    <div className="plan-term">
                        <div>Until</div>
                        <span>{format(planInfo.current_period_end, "MMM d, yyyy")}</span>
                    </div>
                </div>
            ) 
        } catch (error) {
            return false
        }
    }
    const getPlanTerms = () => {
        try {
            if (planInfo.plan_name === "free") return (
                <div className="plan-section-terms">
                    <div className="plan-term">
                        <div>Cost</div>
                        <span>$0</span>
                    </div>
                </div>
            )
            return (
                <div className="plan-section-terms">
                    <div className="plan-term">
                        <div>Term</div>
                        <span>{format(planInfo.plan_started, "MMM d, yyyy")} - {format(planInfo.plan_end, "MMM d, yyyy")}</span>
                    </div>
                    <div className="plan-term">
                        <div>Cost</div>
                        <span>{`$${(planInfo.plan_price_pennies/100).toFixed(2)}`} / {planInfo.plan_term_length}</span>
                    </div>
                </div>
            )
        } catch (error) {
            setPlanInfo(false)
            return false
        }
    }
    const handleUpgradePlanClick = () => {
        navigate("/new-plan")
    }
    useEffect(() => {
        fetchPlanDetails()
    // eslint-disable-next-line
    }, [])
    return (
        <div>
            <AuthHeader fetchLibrary={fetchLibrary} library={library} />
            <div className="plan common-outer-width">
                <h1>Plan</h1>
                {loading &&
                <div className="plan-loading">
                    <div>Checking your plan...</div>
                    <div className="loader"></div>
                </div>
                }
                {((!loading && errorMessage) || (!loading && !errorMessage && !planInfo)) &&
                <div className="plan-loading">
                    <div style={{textAlign: "center"}}>{errorMessage ? errorMessage : "Something went wrong fetching your account"}</div>
                    <div className="plan-button" onClick={() => navigate("/library")}>Return to library</div>
                </div>
                }
                {!loading && !errorMessage && planInfo && 
                <div className="plan-sections">
                    <div className="plan-section-use">
                        <h2><FaVideo/>Video reports usage</h2>
                        {getLicenseUsage()}
                        <ProgressBar percentage={planInfo.monthly_total/planInfo.monthly_limit*100} />
                        {getCurrentPeriodInformation()}
                        <p>Video reports are charged as soon as you request an analysis. If the video doesn't have enough information to generate meaningful results, Comment Pilgrim will not count it against your total.</p>
                        <p>Plans created after the 28th of a month are reset on the 28th of every month. For more information, review the <span style={{color: "var(--cp-color-brand-primary)", fontWeight: 600, cursor: "pointer"}} onClick={() => navigate('/terms-of-service')}>Terms of Service.</span></p>
                    </div>
                    <div className="plan-section-current">
                        <h2><FaDollarSign/>Current plan</h2>
                        <div className="plan-section-blueprint">
                            <div>{getPlanName()}</div>
                        </div>
                        {getPlanTerms()}
                        {planInfo.plan_name !== "free" &&
                        <div className="plan-section-current-change-buttons">
                            <div className="plan-section-current-change-button" onClick={handleAccountClick}>Manage Plan</div>
                            <div className="plan-section-current-change-button plan-section-current-change-button-alt" onClick={handleAccountClick}>Cancel</div>
                        </div>
                        }
                        {planInfo.plan_name === "free" &&
                        <div className="plan-section-current-change-buttons">
                            <div className="plan-section-current-change-button" onClick={handleUpgradePlanClick}>Upgrade Plan</div>
                        </div>
                        }
                        {planInfo.plan_name !== "free" && <p>Use Manage Plan to view invoices or change your plan.</p>}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

function ProgressBar({ height = 14, percentage = 0 }) {
    return (
        <div className="plan-progress-bar-container" style={{ height: `${height}px` }}>
            <div 
                className="plan-progress-bar-fill" 
                style={{ width: `${percentage}%`, height: `${height}px` }}
            />
        </div>
    );
};