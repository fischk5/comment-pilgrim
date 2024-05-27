import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'
import { getSentimentScore } from '../common/Helpers';

import { FaPlay } from "react-icons/fa6";

import AuthHeader from './AuthHeader'

export default function VideoPage({ library, fetchLibrary }) {
    const navigate = useNavigate()
    const { jobId } = useParams();
    const [job, setJob] = useState(() => { return false })
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
            <div className="video-page common-outer-width">
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
                {themes.length > 0 &&
                <div className="video-primary-themes">
                    <p>Themes from the comments</p>
                    <div className="video-primary-themes-list">
                        {themes.map((theme) => (
                            <span key={theme}>{theme}</span>
                        ))}
                    </div>
                </div>
                }
                {job.status === "completed" &&
                <div className="video-fold-panels">
                    <div className="video-fold-panel-primary">
                        <h3>Audience Review</h3>
                        <p>{summary}</p>
                        <p>{audiencePreferences}</p>
                        {keywords.length > 0 &&
                        <div>
                            <h3>Keyword Ideas</h3>
                            <div className="video-keywords-list">
                                {keywords.map((keyword) => (
                                    <span key={keyword}>{keyword}</span>
                                ))}
                            </div>
                        </div>
                        }

                    </div>
                    <div className="video-fold-panel-secondary">
                        {featuredComments.length > 0 &&
                        <div className="video-featured-comments">
                            <h3>Featured Comments</h3>
                            {featuredComments.map((comment) => (
                                <p key={comment}>{comment}</p>
                            ))}
                        </div>
                        }
                    </div>
                </div>
                }
                {job.status !== "completed" &&
                <div className="video-analysis-incomplete">
                    Your video is still being analyzed
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
