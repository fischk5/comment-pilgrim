import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function GeneralFooter() {
    const navigate = useNavigate()
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Comment Pilgrim</h2>
                    <p>
                        Comment Pilgrim explores the comments section for content ideas and insights based on real audience opinions. Transform comments into valuable content to engage your viewers and grow your channel.
                    </p>
                </div>
                <div className="footer-section links">
                    <ul>
                        <li onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
                        <li><a href="mailto:support@commentpilgrim.com">Support</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Comment Pilgrim. All Rights Reserved.
            </div>
        </footer>
    );
}