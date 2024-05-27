import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { getAccountInformation, upgradePlan } from '../../common/Api'

import { FaArrowLeftLong, FaCheck, FaAnglesRight, FaAngleRight } from "react-icons/fa6";

import AuthHeader from '../AuthHeader'

import { PRICING_TABLE } from '../../config/Pricing';

export default function NewPlan({ library, fetchLibrary }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(() => { return true })
    const [isAnnual, setIsAnnual] = useState(() => { return false })
    const handleToggle = (cycle) => {
        setIsAnnual(cycle);
    };
    const answerCallToAction = (plan, annual) => {
        // Getting URL for checkout
        upgradePlan({ proposed_plan: plan, proposed_plan_annual: annual })
        .then((res) => {
            if (!res) {
                setLoading(true)
                navigate(-1)
                return
            }
            if (res.url) {
                window.location.replace(res.url)
            }
        })
        .catch((err) => {
            navigate(-1)
        })
    }
    const fetchPlanDetails = () => {
        getAccountInformation()
        .then((res) => {
            if (!res) {
                navigate("/account")
                return
            }
            if (res.plan_name) {
                if (res.plan_name !== "free") {
                    navigate("/account")
                    return
                } else {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        })
        .catch((err) => {
            console.log('ERROR')
            navigate("/account")
        })
    }
    useEffect(() => {
        fetchPlanDetails()
    // eslint-disable-next-line
    }, [])
    return (
        <div>
            <AuthHeader fetchLibrary={fetchLibrary} library={library} />
            <div className="plan common-outer-width">
                {!loading && <h1 className="plan-new-heading"><FaArrowLeftLong onClick={() => navigate(-1)}/>Select a plan</h1>}
                {loading &&
                <div className="plan-loading">
                    <div>Loading available plans...</div>
                    <div className="loader"></div>
                </div>
                }
                {!loading &&
                <div className="landing-section landing-pricing landing-embedded">
                    <div>
                        <Toggle onToggle={handleToggle} />
                    </div>
                    <div className="landing-plans-prices">
                        {PRICING_TABLE.map((plan) => (
                            <PricingPlan plan={plan} isAnnual={isAnnual} key={plan._id} answerCallToAction={answerCallToAction} />
                        ))}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

function PricingPlan({ plan, isAnnual, answerCallToAction }) {
    const featuredPlan = "standard"
    const calculatedMonthlyCost = () => {
        let annualCost = plan.cost_monthly * 12
        if (isAnnual) annualCost = plan.cost_annual
        const monthly = Math.round(annualCost/12).toFixed(0)
        const number = parseFloat(monthly);
        return number.toLocaleString();
    }
    const calculatedAnnualCost = () => {
        let annualCost = plan.cost_monthly * 12
        if (isAnnual) annualCost = plan.cost_annual
        const monthly = annualCost
        const number = parseFloat(monthly)
        return number.toLocaleString()
    }
    return (
        <div className={`pricing-plan ${plan._id === featuredPlan ? "featured" : "" }`}>
            {plan._id === featuredPlan && <div className="pricing-plan-badge-featured">Recommended</div> }
            <div className="pricing-plan-header">
                <div className="pricing-plan-name">{plan.name}</div>
                <div className="pricing-plan-subtitle">{plan.subtitle}</div>
            </div>
            <div className="pricing-plan-cost">
                <span className="pricing-plan-cost-amount">${calculatedMonthlyCost()}</span>
                <span className="pricing-plan-cost-period">/month</span>
            </div>
            <span className="pricing-plan-cost-period" style={{fontSize: "12px"}}>${calculatedAnnualCost()} per year</span>
            <div className="pricing-plan-description" style={{marginTop: "12px"}}>Included in {plan.name}</div>
            <div className="pricing-plan-benefits">
                <span>
                    <FaCheck /> Library
                </span>
                <span>
                    <FaCheck /> Theme Analysis
                </span>
                <span>
                    <FaCheck /> Featured Comments
                </span>
                <span>
                    <FaCheck /> Audience Sentiment Score
                </span>
                <span>
                    <FaCheck /> Comments Section Summary
                </span>
                <span>
                    <FaCheck /> Long-tail Keyword Generation
                </span>
                <span style={{fontWeight: 800, marginTop: "12px"}}>
                    <FaCheck /> {plan.allowed_videos} Video Reports Per Month
                </span>
            </div>
            <div className="pricing-plan-cta" onClick={() => answerCallToAction(plan._id, isAnnual ? "true" : "false")}>
                Get {plan.name}
                {plan._id === "standard" && <FaAngleRight/>}
                {plan._id === "agency" && <FaAnglesRight/>}
            </div>
        </div>
    );
}

function Toggle({onToggle}) {
    const [isAnnual, setIsAnnual] = useState(false);

    const handleToggle = () => {
        setIsAnnual(!isAnnual);
        onToggle(isAnnual ? false : true);
    };

    return (
        <div className="pricing-toggle">
            <span className="toggle-label">Save with annual billing</span>
            <label className="switch">
                <input type="checkbox" checked={isAnnual} onChange={handleToggle} />
                <span className="slider round"></span>
            </label>
            <span className="save-label">2 Months Free</span>
        </div>
    );
}