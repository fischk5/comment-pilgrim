import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'
import { getSentimentScore } from '../common/Helpers';

import { FaPlay } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdFileDownload } from "react-icons/md";

import AuthHeader from './AuthHeader'

export default function VideoPage({ library, fetchLibrary }) {
    const navigate = useNavigate()
    const { jobId } = useParams();
    const [job, setJob] = useState(() => { return false })
    const [page, setPage] = useState(() => { return "ideas" })
    const [themes, setThemes] = useState(() => { return [] })
    const [audiencePreferences, setAudiencePreferences] = useState(() => { return false })
    const [featuredComments, setFeaturedComments] = useState(() => { return [] })
    const [keywords, setKeywords] = useState(() => { return [] })
    const [summary, setSummary] = useState(() => { return false })
    const identifyJobFromLibrary = () => {
        try {
            const libraryCopy = Array.from(library)
            const foundVideo = libraryCopy.find((i) => { return i._id === jobId })
            if (foundVideo) return setJob(foundVideo)
            navigate('/library')
        } catch (error) {
            navigate('/library')
        }
    }
    const openVideoInNewTab = () => {
        if (!job) return
        if (!job.video_id) return
        const newWindow = window.open(`https://www.youtube.com/watch?v=${job.video_id}`, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const resetJobInformation = () => {
        setThemes([])
        setAudiencePreferences(false)
        setFeaturedComments([])
        setKeywords([])
        setSummary(false)
    }
    const updateJobInformation = () => {
        resetJobInformation()
        if (!job) return
        if (job.status === "new") return
        if (job.status === "active") return
        if (job.insights) {
            if (job.insights.themes) setThemes(job.insights.themes)
            if (job.insights.audience_preferences) setAudiencePreferences(job.insights.audience_preferences)
            if (job.insights.gap_keywords) setKeywords(job.insights.gap_keywords)
            if (job.insights.summary) setSummary(job.insights.summary)
            if (job.insights.interesting_comments) setFeaturedComments(job.insights.interesting_comments)
        }
    }
    const translateSentiment = () => {
        if (!job.sentiment_score) return false
        const allegedScore = getSentimentScore(job.sentiment_score)
        if (!allegedScore) return false
        return `${allegedScore}%`
    }
    const getNavClassName = (proposedPage) => {
        if (proposedPage === page) return "selected"
        return ""
    }
    useEffect(() => {
        updateJobInformation()
    // eslint-disable-next-line
    }, [job])
    useEffect(() => {
        identifyJobFromLibrary()
    // eslint-disable-next-line
    }, [jobId, library])
    return (
        <div>
            <AuthHeader fetchLibrary={fetchLibrary} library={library} />
            {job &&
            <div className="video-page common-outer-width" >
                <div className="video-breadcrumb">
                    <p onClick={() => navigate("/library")}>Library</p>
                    <span>{">"}</span>
                    <p>{job.video_title}</p>
                </div>
                <h2>{job.video_title}</h2>
                <div className="video-primary-information-panels">
                    <div className="video-primary-information-panel-thumbnail">
                        <div className="video-primary-information-panel-thumbnail-cover" onClick={openVideoInNewTab}><FaPlay/></div>
                        <img src={job.video_thumbnail.url} alt={job.video_title} onClick={openVideoInNewTab} />
                    </div>
                    <div className="video-primary-information-panel-overview">
                        <div className="video-primary-informations">
                            <div className="video-primary-data-points">
                                <p>Channel:</p><span>{job.video_channel}</span>
                            </div>
                            <div className="video-primary-data-points">
                                <p>Published:</p><span>{format(parseISO(job.video_published), 'MMM d, yyyy')}</span>
                            </div>
                            {translateSentiment() && 
                            <div className="video-primary-data-points">
                                <p>Sentiment:</p><span>{translateSentiment()}</span>
                            </div>
                            }
                            <div className="video-primary-data-points">
                                <p>Updated:</p><span>{formatDistanceToNowStrict(parseISO(job.updatedAt))} ago</span>
                            </div>
                        </div>

                    </div>
                </div>
                {job.status !== "completed" && job.status !== "invalid" &&
                <div>
                    <div className="video-analysis-incomplete">Your video is still being analyzed. This page will automatically refresh when it's ready.</div>
                    <div style={{display: "flex", justifyContent: "center", marginTop: "80px"}}>
                        <div className="loader-dancer"></div>
                    </div>
                    
                </div>
                }
                {job.status === "completed" &&
                <div className="video-navigation">
                    <span className={getNavClassName("ideas")} onClick={() => setPage("ideas")}>Content Ideas</span>
                    <span className={getNavClassName("comments")} onClick={() => setPage("comments")}>Comments</span>
                    <span className={getNavClassName("summary")} onClick={() => setPage("summary")}>Audience</span>
                </div>
                }

                {page === "ideas" && job.status === "completed" &&
                <div className="video-fold-panel-keywords">
                    <KeywordsTable keywords={keywords} job={job} />
                </div>
                }

                {page === "comments" && job.status === "completed" &&
                <div className="video-panel video-fold-panel-keywords">
                    <div className="video-panel-header">
                        <h3>Featured Comments</h3>
                    </div>
                    <div className="video-panel-subheading">Insightful statements found in the comments section</div>
                        <div className="video-featured-comments">
                            {featuredComments.map((comment) => (
                                <p key={comment}>{comment}</p>
                            ))}
                        </div>
                </div>
                }

                {page === "summary" && job.status === "completed" &&
                <div className="video-panel-text">
                    <h3>Themes and values</h3>
                    <div className="video-panel-subheading">Sentiments and beliefs valued by the audience</div>
                    <div className="video-primary-themes">
                        <div className="video-primary-themes-list">
                            {themes.map((theme) => (
                                <span key={theme}>{theme}</span>
                            ))}
                        </div>
                    </div>
                    <p></p>
                    <h3>Key Insight</h3>
                    <div className="video-panel-subheading">Something this audience would find incredibly useful</div>
                    <p>{summary}</p>
                    <h3>Review</h3>
                    <div className="video-panel-subheading">What the comment section thinks</div>
                    <p>{audiencePreferences}</p>
                </div>
                }

                {job.status === "invalid" &&
                <div className="video-analysis-incomplete">
                    {summary} It will not be counted against your monthly usage.
                </div>
                }
            </div>
            }
            
            {!job &&
            <div className="common-outer-width">
                Loading...
            </div>
            }
        </div>
    )
}

function KeywordsTable({ keywords, job }) {
    const [tablePage, setTablePage] = useState(() => { return 1 })
    const [maxPages, setMaxPages] = useState(() => { return 1 })
    const [displayedKeywords, setDisplayedKeywords] = useState(() => { return [] })
    const MAX_TABLE_SIZE = 8
    const adjustPageNumber = (isUp) => {
        if (isUp && tablePage < maxPages) return setTablePage(tablePage + 1)
        if (!isUp && tablePage > 1) return setTablePage(tablePage - 1)
    }
    const downloadCSVFromJson = () => {
        const csvRows = [];
        const headers = ['Content Idea'];
        csvRows.push(headers.join(','));    
        keywords.forEach(keyword => {
            csvRows.push(keyword);
        });
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${job.video_title}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const copyLink = (comment) => {
        navigator.clipboard.writeText(comment)
    }
    const getAdditionalStyle = (isRight) => {
        if (isRight) {
            if (tablePage === maxPages) return {}
            return { color: "var(--cp-color-dark)" }
        }
        if (tablePage === 1) return {}
        return { color: "var(--cp-color-dark)" }
    }
    const updateMaxPages = () => {
        try {
            if (!keywords) return
            if (keywords.length === 0) return
            setMaxPages(Math.ceil(keywords.length / MAX_TABLE_SIZE))
        } catch (error) {
            return setMaxPages(1)
        }
    }
    const updateKeywordsShown = () => {
        try {
            const startingValue = (tablePage - 1) * MAX_TABLE_SIZE
            const copyOfKeywords = Array.from(keywords)
            if (copyOfKeywords.length <= MAX_TABLE_SIZE) return setDisplayedKeywords(copyOfKeywords)
            const result = copyOfKeywords.slice(startingValue, startingValue + MAX_TABLE_SIZE + 1);
            setDisplayedKeywords(result)
        } catch (error) {
            return setDisplayedKeywords(keywords)
        }
    }
    useEffect(() => {
        updateMaxPages()
    // eslint-disable-next-line
    }, [keywords])
    useEffect(() => {
        updateKeywordsShown()
    // eslint-disable-next-line
    }, [tablePage, keywords])
    return (
        <div className="video-panel">
            <div className="video-panel-header">
                <h3>Content Ideas</h3>
                {maxPages > 1 &&
                <div className="video-panel-options">
                    <div className="video-panel-option video-panel-option-pagination" onClick={() => adjustPageNumber(false)}><MdKeyboardArrowLeft style={getAdditionalStyle(false)}/></div>
                    <div className="video-panel-option video-panel-option-pagination" onClick={() => adjustPageNumber(true)}><MdKeyboardArrowRight style={getAdditionalStyle(true)}/></div>
                    <div className="video-panel-option video-panel-option-pagination" title="Download keywords as a .csv" onClick={downloadCSVFromJson}><MdFileDownload style={{color: "var(--cp-color-dark)"}}/></div>
                </div>
                }
            </div>
            <div className="video-panel-subheading">Topics the audience for this video wants to learn more about and expressed interest in.</div>
            {displayedKeywords.length > 0 &&
            <div className="video-keywords-list">
            {displayedKeywords.map((keyword) => (
                <span key={keyword} onClick={() => copyLink(keyword)}>{keyword}</span>
            ))}
            </div>
            }
            {displayedKeywords.length === 0 &&
            <div className="video-keywords-list">
                <span></span>
                <span></span>
                <span style={{textAlign: "center", color: "grey", textTransform: "unset", fontWeight: 600}}>Content ideas will be shown here when they're ready</span>
                <span></span>
                <span></span>
            </div>
            }
        </div>  
    )
}