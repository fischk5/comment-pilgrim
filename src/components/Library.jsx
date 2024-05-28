import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'
import { getSentimentScore } from '../common/Helpers';

import { MdAutoGraph, MdGridView, MdOutlineViewAgenda } from "react-icons/md";

import AuthHeader from './AuthHeader'
import ModalNewJob from './modals/ModalNewJob';

export default function Library({ library, fetchLibrary }) {
    const navigate = useNavigate()
    const [viewType, setViewType] = useState(() => { 
        if (localStorage.getItem("pilgrimView") === "list") return "list"
        if (localStorage.getItem("pilgrimView") === "grid") return "grid"
        return "list"
    });
    const [organizedLibrary, setOrganizedLibrary] = useState(() => { return library });
    const [isCreatingNewJob, setIsCreatingNewJob] = useState(() => { return false })
    const [proposedUrlString, setProposedUrlString] = useState(() => { return "" });
    const updateLibraryOrganization = () => {
        try {
            const libraryCopy = Array.from(library)
            const sorted = libraryCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrganizedLibrary(sorted)
        } catch (error) {
            return
        }
    }
    const handleKeyPress = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            setIsCreatingNewJob(true)
        }
    }
    const goToVideoById = (jobId) => {
        fetchLibrary()
        setIsCreatingNewJob(false)
        if (jobId) navigate(`/library/${jobId}`)
    }
    const saveViewToLocalStorage = () => {
        localStorage.setItem("pilgrimView", viewType)
    }
    const getAdditionalViewStyles = () => {
        try {
            if (library.length < 4 && viewType === "grid") {
                return {
                    justifyContent: "flex-start",
                    gap: "20px"
                }
            }
            return {}
        } catch (error) {
            return {}
        }
    }
    useEffect(() => {
        updateLibraryOrganization()
    // eslint-disable-next-line
    }, [library])
    useEffect(() => {
        saveViewToLocalStorage()
    // eslint-disable-next-line
    }, [viewType])
    return (
        <div>
            <AuthHeader fetchLibrary={fetchLibrary} library={library} />
            {isCreatingNewJob && <ModalNewJob hideModal={() => setIsCreatingNewJob(false) } goToVideoById={goToVideoById} seedUrl={proposedUrlString} /> }
            {library &&
            <div className="library common-outer-width">
                {library.length > 0 &&
                <div className="library-header">
                    <h1>Library</h1>
                    <div className="view-toggle">
                        <button className={viewType === "list" ? "selected" : ""} onClick={() => setViewType('list')}><MdOutlineViewAgenda/></button>
                        <button className={viewType === "grid" ? "selected" : ""} onClick={() => setViewType('grid')}><MdGridView/></button>
                    </div>
                </div>
                }
                {library.length > 0 && (
                    <div className={`library-items ${viewType}`} style={getAdditionalViewStyles()}>
                        {organizedLibrary.map((item) => (
                            <LibraryItem key={item._id} videoData={item} viewType={viewType} />
                        ))}
                    </div>
                )}
                {library.length === 0 &&
                <div className="library-empty">
                    <div className="library-empty-hero">Welcome!</div>
                    <p>Get started by providing a YouTube video link</p>
                    <input autoFocus={true} type="text" placeholder="Enter a YouTube video URL" value={proposedUrlString} onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => setProposedUrlString(e.target.value)} />
                    <p>Rapidly generate long-tail keywords and content ideas from the comments</p>
                </div>
                }

            </div>
            }
        </div>
    )
}

function LibraryItem({ videoData, viewType }) {
    const navigate = useNavigate();
    const translateSentiment = () => {
        if (!videoData.sentiment_score) return false;
        const allegedScore = getSentimentScore(videoData.sentiment_score)
        if (!allegedScore) return false
        return `${allegedScore}%`
    };

    return (
        <div onClick={() => navigate(`/library/${videoData._id}`)} className={`library-item ${viewType}`}>
            <div className="library-item-thumbnail">
                <img src={videoData.video_thumbnail.url} alt={videoData.video_title} />
            </div>
            <div className="library-item-information">
                <div>
                    <h2>{videoData.video_title}</h2>
                    <div className="library-item-subtitles">
                        <span>{videoData.video_channel}</span>
                        <span>{format(parseISO(videoData.video_published), 'MMM d, yyyy')}</span>
                    </div>
                    {videoData.status === "completed" && translateSentiment() && (
                        <div className="library-item-sentiment">
                            <MdAutoGraph />
                            <span>{translateSentiment()}</span>
                        </div>
                    )}
                </div>
                {videoData.status === "completed" && (
                    <div className="library-item-timestamp">
                        Gathered {formatDistanceToNowStrict(parseISO(videoData.createdAt), 'P')} ago
                    </div>
                )}
                {videoData.status !== "invalid" && videoData.status !== "completed" && <div className="library-item-badge">Analyzing</div>}
                {videoData.status === "invalid" && <div className="library-item-badge" style={{backgroundColor: "#ffc107"}}>Not enough data</div>}
            </div>
        </div>
    );
}