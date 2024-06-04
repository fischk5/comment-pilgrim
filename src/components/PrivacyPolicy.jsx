import React, { useEffect } from 'react'
import GeneralHeader from './GeneralHeader';

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    return (
        <div>
            <GeneralHeader hideNavs={true} />
            <div className="privacy-policy common-outer-width" style={{marginBottom: "120px"}}>
                <h1>Privacy Policy</h1>
                <p>Effective Date: May 29, 2024</p>

                <section>
                    <h2>1. Introduction</h2>
                    <p>Welcome to Comment Pilgrim. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy, or our practices with regards to your personal information, please contact us at support@commentpilgrim.com.</p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <p>We collect personal information that you voluntarily provide to us when registering on Comment Pilgrim, expressing an interest in obtaining information about us or our products and services, when participating in activities on the platform, or otherwise contacting us.</p>
                    <p>The personal information that we collect depends on the context of your interactions with us and the platform, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                    <ul>
                        <li>Name and Contact Data (e.g., email address, phone number)</li>
                        <li>Credentials (e.g., passwords, security information)</li>
                        <li>Payment Data (e.g., payment instrument details)</li>
                        <li>Usage Data (e.g., IP address, browser type, device information)</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We use the information we collect or receive:</p>
                    <ul>
                        <li>To facilitate account creation and the logon process</li>
                        <li>To send administrative information to you</li>
                        <li>To fulfill and manage your orders</li>
                        <li>To manage user accounts</li>
                        <li>To respond to user inquiries and offer support</li>
                        <li>To improve our platform and services</li>
                        <li>To send you marketing and promotional communications</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Sharing Your Information</h2>
                    <p>We only share information with your consent, to comply with laws, to protect your rights, or to fulfill business obligations. We may process or share data based on the following legal basis:</p>
                    <ul>
                        <li>Consent: We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                        <li>Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                        <li>Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                    </ul>
                </section>

                <section>
                    <h2>5. User Rights</h2>
                    <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                    <ul>
                        <li>The right to access - You have the right to request copies of your personal data.</li>
                        <li>The right to rectification - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                        <li>The right to erasure - You have the right to request that we erase your personal data, under certain conditions.</li>
                        <li>The right to restrict processing - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                        <li>The right to object to processing - You have the right to object to our processing of your personal data, under certain conditions.</li>
                        <li>The right to data portability - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                    </ul>
                    <p>To exercise any of these rights, please contact us at support@commentpilgrim.com.</p>
                </section>

                <section>
                    <h2>6. Data Security</h2>
                    <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our platform is at your own risk. You should only access the services within a secure environment.</p>
                </section>

                <section>
                    <h2>7. Cookies and Tracking Technologies</h2>
                    <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.</p>
                </section>

                <section>
                    <h2>8. Privacy Policy Updates</h2>
                    <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.</p>
                </section>

                <section>
                    <h2>9. Contact Us</h2>
                    <p>If you have questions or comments about this policy, you may contact us at:</p>
                    <p>Armatage Candle Company</p>
                    <p>10430 163rd St W, Lakeville, MN 55044</p>
                    <p>Email: <a href="mailto:support@commentpilgrim.com">support@commentpilgrim.com</a></p>
                </section>
            </div>
        </div>
    );
}
