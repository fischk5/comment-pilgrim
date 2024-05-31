import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'

import { FaLongArrowAltRight } from "react-icons/fa";
import { FaCheck, FaPlus, FaMinus, FaAnglesRight, FaAngleRight } from "react-icons/fa6";

import GeneralHeader from './GeneralHeader'
import GeneralFooter from './GeneralFooter';
import { PRICING_TABLE } from '../config/Pricing';
import { FAQ } from '../config/FAQ';

import { updateSchemaOrgJSONLD, updateHeadTags } from '../common/Helpers';

export default function LandingPage({ authenticated }) {
    const navigate = useNavigate()
    const [isAnnual, setIsAnnual] = useState(() => { return false })
    const handleToggle = (cycle) => {
        setIsAnnual(cycle);
    };
    const updateMeta = () => {
        try {
            updateSchemaOrgJSONLD({
                "@context": "http://schema.org",
                "@type": "WebSite",
                "name": "Comment Pilgrim",
                "url": "https://www.commentpilgrim.com",
                "logo": "https://storage.googleapis.com/comment-pilgrim-public/Comment%20Pilgrim.png",
                "description": "Generate keyword ideas from YouTube comments so you can create more relevant content for your audience",
                "publisher": {
                    "@type": "Organization",
                    "name": "Comment Pilgrim",
                    "url": "https://www.commentpilgrim.com",
                    "logo": {
                    "@type": "ImageObject",
                    "url": "https://storage.googleapis.com/comment-pilgrim-public/Comment%20Pilgrim.png",
                    "width": 1200,
                    "height": 630
                    }
                }
            })

            // Meta
            let title = "Comment Pilgrim"
            let metaTags = [
                { name: 'description', content: 'Generate keyword ideas from YouTube comments so you can create more relevant content for your audience' },
                { name: 'robots', content: 'index, follow' },
                { name: 'og:title', content: title },
                { name: 'og:description', content: 'Generate keyword ideas from YouTube comments so you can create more relevant content for your audience' },
                { name: 'og:url', content: 'https://tetheros.com/blog' },
                { name: 'og:type', content: 'website' },
                { name: 'og:image', content: 'https://storage.googleapis.com/comment-pilgrim-public/Comment%20Pilgrim.png' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:image', content: 'https://storage.googleapis.com/comment-pilgrim-public/Comment%20Pilgrim.png' },
                { name: 'twitter:description', content: 'Generate keyword ideas from YouTube comments so you can create more relevant content for your audience' },
            ]
            updateHeadTags(title, metaTags)
        } catch (error) {
            return
        }
    }
    const answerCallToAction = (plan, annual) => {
        return navigate(`/register?plan=${plan}&annual=${annual}`)
    }
    useEffect(() => {
        if (authenticated === true) return navigate('/library')
        return navigate("/")
    // eslint-disable-next-line
    }, [authenticated])
    useEffect(() => {
        updateMeta()
    // eslint-disable-next-line
    }, [])
    return (
        <div className="landing">
            <div className="landing-hero-outer">
                <div className="landing-hero-inner common-outer-width">
                    <GeneralHeader/>
                    <h1>Make content that <span>resonates</span></h1>
                    <p>Comment Pilgrim generates content ideas from YouTube comments so you can discover keywords in the audience instead of the algorithm.</p>
                    <div className="landing-hero-cta" onClick={() => answerCallToAction("free", "false")}>Get Started Free<FaLongArrowAltRight/></div>
                    <div style={{textAlign: "center"}}>No credit card required</div>
                    <div className="landing-hero-image">
                        <img className="landing-hero-image-desktop" src="https://storage.googleapis.com/comment-pilgrim-public/2024%2005%2031%20Comment%20Pilgrim%20Hero%20Desktop.png" alt="Comment Pilgrims video audience tab" />
                        <img className="landing-hero-image-mobile" src="https://storage.googleapis.com/comment-pilgrim-public/2024%2005%2031%20Comment%20Pilgrim%20on%20Phone.png" alt="Comment Pilgrims video feedback page" />
                    </div>
                </div>
            </div>

            <div className="landing-video-embed-section">
                <h2>Watch a demo</h2>
                <iframe src="https://www.youtube.com/embed/bw4Oh6E4cVw?si=3H9giKrn2RfF4fDx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

            <div className="landing-section landing-benefits">
                <div>
                    <h2>Keyword ideas based on the audience's questions, confusions, and requests</h2>
                    <p>Tap into the collective voice of your viewers to uncover the most relevant and engaging topics. Comment Pilgrim transforms any comments section into a goldmine of long-tail keywords, ensuring your content speaks directly to their needs and interests.</p>
                </div>
                <div className="landing-section-image">
                    <img src="https://storage.googleapis.com/comment-pilgrim-public/2024%2005%2031%20Comment%20Pilgrim%20Content%20Ideas.png" alt="A list of keywords generated by Comment Pilgrim"/>
                </div>
            </div>

            <div className="landing-section landing-benefits">
                <div className="landing-section-image">
                    <img src="https://storage.googleapis.com/comment-pilgrim-public/comment-pilgrim-library.png" alt="A library of videos that have been analyzed by Comment Pilgrim" />
                </div>
                <div>
                    <h2>Borrow any audience</h2>
                    <p>Amass a collection of perspectives and ideas you can pull from for months at a time, no matter who the original creator is.</p>
                </div>
            </div>
            <div className="landing-section landing-pricing">
                <h2 id="pricing">Plans & Pricing</h2>
                <div>
                    <Toggle onToggle={handleToggle} />
                </div>
                <div className="landing-plans-prices">
                    {PRICING_TABLE.map((plan) => (
                        <PricingPlan plan={plan} isAnnual={isAnnual} key={plan._id} answerCallToAction={answerCallToAction} />
                    ))}
                </div>
                <div style={{marginTop: "20px", fontSize: "17px", color: "var(--cp-color-subtitles)"}}>Want to try Comment Pilgrim first? Get 5 video reports free when you sign up without a plan</div>
            </div>
            <div className="landing-section landing-benefits">
                <div>
                    <FAQSection/>
                </div>
            </div>
            <div className="landing-section landing-benefits">
                <div>
                    <h2>Create content<br/>without guessing</h2>
                    <p>Don't waste hours creating content your audience doesn't care about. Let Comment Pilgrim figure out exactly what the people want in minutes.</p>
                </div>
                <div className="landing-section-image">
                    <div className="landing-hero-cta" onClick={() => answerCallToAction("free", "false")}>Get started free<FaLongArrowAltRight/></div>
                </div>
            </div>
            <GeneralFooter/>
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

function FAQSection() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleFAQ = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            {FAQ.map((item, index) => (
                <div key={index} className="faq-item">
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        {item.question}
                        {expandedIndex === index ? <FaMinus/> : <FaPlus/>}
                        
                    </div>
                    <div className={`faq-answer ${expandedIndex === index ? 'expanded' : ''}`}>
                        <span>{item.answer}</span>
                    </div>
                </div>
            ))}
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