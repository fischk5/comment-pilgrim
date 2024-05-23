import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'

import { MdAutoGraph, MdGridView, MdOutlineViewAgenda } from "react-icons/md";

import AuthHeader from './AuthHeader'

export default function Library({ library, fetchLibrary }) {
    const [viewType, setViewType] = useState(() => { return "list"});
    const [organizedLibrary, setOrganizedLibrary] = useState(() => { return library });
    const updateLibraryOrganization = () => {
        try {
            const libraryCopy = Array.from(library)
            const sorted = libraryCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrganizedLibrary(sorted)
        } catch (error) {
            return
        }
    }
    useEffect(() => {
        updateLibraryOrganization()
    // eslint-disable-next-line
    }, [library])
    return (
        <div>
            <AuthHeader fetchLibrary={fetchLibrary}/>
            <div className="library common-outer-width">
                <div className="library-header">
                    <h1>Library</h1>
                    <div className="view-toggle">
                        <button className={viewType === "list" ? "selected" : ""} onClick={() => setViewType('list')}><MdOutlineViewAgenda/></button>
                        <button className={viewType === "grid" ? "selected" : ""} onClick={() => setViewType('grid')}><MdGridView/></button>
                    </div>
                </div>
                {library.length > 0 && (
                    <div className={`library-items ${viewType}`}>
                        {organizedLibrary.map((item) => (
                            <LibraryItem key={item._id} videoData={item} viewType={viewType} />
                        ))}
                    </div>
                )}
                {library.length === 0 &&
                <div>
                    Nothing here
                </div>
                }

            </div>
        </div>
    )
}

function LibraryItem({ videoData, viewType }) {
    const navigate = useNavigate();
    const translateSentiment = () => {
        if (!videoData.sentiment_score) return false;
        const rawScore = parseFloat(videoData.sentiment_score);
        const adjustmentFromFifty = 50 * rawScore;
        if (isNaN(adjustmentFromFifty)) return false;
        return `${Math.floor(50 + adjustmentFromFifty).toFixed(0)}%`;
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
                {videoData.status !== "completed" && <div className="library-item-badge">Analyzing</div>}
            </div>
        </div>
    );
}