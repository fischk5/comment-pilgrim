import React, { useEffect } from 'react'
import GeneralHeader from './GeneralHeader';

export default function TermsOfService({authenticated}) {
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    return (
        <div>
            <GeneralHeader hideNavs={true} />
            <div className="privacy-policy common-outer-width" style={{marginBottom: "120px"}}>
                <h1>Terms of Service</h1>
                <p>Effective date: May 29, 2024</p>

                <h2>1. Introduction</h2>
                <p>Welcome to Comment Pilgrim (“us”, “we”, or “our”, hereinafter referred to as “Service”).</p>
                <p>These Terms of Service (“Terms”, “Terms of Service”) govern your use of our web pages located at Comment Pilgrim operated by Comment Pilgrim.</p>
                <p>Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here [Privacy Policy link].</p>
                <p>Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them.</p>
                <p>If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at support@commentpilgrim.com so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>

                <h2>2. Communications</h2>
                <p>By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at support@commentpilgrim.com.</p>

                <h2>3. Purchases</h2>
                <p>If you wish to purchase any product or service made available through Service (“Purchase”), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>
                <p>You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.</p>
                <p>We may employ the use of third-party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.</p>
                <p>We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.</p>
                <p>We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>

                <h2>4. Subscriptions</h2>
                <p>Some parts of Service are billed on a subscription basis (“Subscription(s)”). You will be billed in advance on a recurring and periodic basis (“Billing Cycle”). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>
                <p>At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Comment Pilgrim cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting our customer support team.</p>
                <p>A valid payment method, including credit card, is required to process the payment for your subscription. You shall provide Comment Pilgrim with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information. By submitting such payment information, you automatically authorize Comment Pilgrim to charge all Subscription fees incurred through your account to any such payment instruments.</p>
                <p>Should automatic billing fail to occur for any reason, Comment Pilgrim will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.</p>
                <p>For billing cycles that begin after the 28th of the month, video reports will be measured starting on the 28th. Any impacts to the first month on the Service will be credited at the end of the billing cycle. If you have any questions or concerns with this arrangement, you may contact support@commentpilgrim.com to request special arrangements.</p>
                <p>Automated invoices are not guaranteed. You may request stored invoices by contacting support or using the Manage Plan button on your account page.</p>

                <h2>5. Fee Changes</h2>
                <p>Comment Pilgrim, in its sole discretion and at any time, may modify Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.</p>
                <p>Comment Pilgrim will provide you with a reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.</p>
                <p>Your continued use of Service after the Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.</p>

                <h2>6. Refunds</h2>
                <p>Certain refund requests for Subscriptions may be considered by Comment Pilgrim on a case-by-case basis and granted in sole discretion of Comment Pilgrim.</p>
                <p>Comment Pilgrim will honor refund requests made within 7 days of purchase provided there is no evidence of abuse or exploitation of the Service, to be determined at the sole discretion of Comment Pilgrim.</p>

                <h2>7. Content</h2>
                <p>Our Service allows you to reference certain information, text, graphics, videos, or other material (“Content”) from public YouTube videos. We are not responsible for Content you use the Service to reference, including its legality, reliability, and appropriateness.</p>
                <div>Thank you for using Comment Pilgrim!</div>

                <h2>8. Data and Security</h2>
                <p>Cookies: The Service stores cookies to manage your session information and some application settings. We do not share cookies with any third parties and will never sell or transfer your data without your explicit, written consent.</p>
                <p>Data: The Service encrypts and stores your email address and authentication information at rest and while in transport. Database access is limited to an as-needed basis (customer support, application issues). All access monitored and recorded.</p>
                <p>External APIs: Our Service uses external APIs provided by OpenAI and Google (YouTube). API consumption is not connected to your user account in any way and no personal information is shared with any external API providers.</p>

                <div>Thank you for using Comment Pilgrim!</div>
            </div>
        </div>
    );
}
