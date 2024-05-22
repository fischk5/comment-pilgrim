import React, { useEffect, useState } from 'react'
import { getYoutubeVideoData } from '../common/Api'

export default function Home() {
    const [videoData, setVideoData] = useState(() => { return false })
    const [sentimentScore, setSentimentScore] = useState(() => { return false })
    const [proposedUrlString, setProposedUrlString] = useState(() => { return "" })
    const [insights, setInsights] = useState(() => { return false })
    const [featuredComments, setFeaturedComments] = useState(() => { return false })
    const [videoId, setVideoId] = useState(() => { return false })
    const [isFetching, setIsFetching] = useState(() => { return false })
    const [errorMessage, setErrorMessage] = useState(() => { return false })
    const extractYouTubeVideoId = () => {
        try {
            const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = proposedUrlString.match(regex)
            if (match && match[1]) return setVideoId(match[1])
            return setVideoId(false)
        } catch (error) {
            return setVideoId(false)
        }
    }
    const fetchVideoInformation = () => {
        setVideoData(false)
        setInsights(false)
        setSentimentScore(false)
        setFeaturedComments(false)
        setIsFetching(true);
        if (!videoId) return
        getYoutubeVideoData(videoId)
        .then((res) => {
            if (res.video_id) {
                console.log(res)
                setVideoData(res)
                setIsFetching(false)
            }
            if (res.status === "completed") {
                setSentimentScore(res.sentiment_score)
                setFeaturedComments({featured_positive: res.featured_comment_positive, featured_negative: res.featured_comment_negative })
                setInsights(res.insights)
            }
        })
        .catch((err) => {
            setIsFetching(false)
            setErrorMessage("Something went wrong fetching your video. Double check your link and try again.")
        })
    };
    useEffect(() => {
        extractYouTubeVideoId()
    // eslint-disable-next-line
    }, [proposedUrlString])
    return (
        <div>
            <div>Video URL</div>
            <input type="text" value={proposedUrlString} onChange={(e) => setProposedUrlString(e.target.value)}/>
            {videoId && !isFetching && <div onClick={fetchVideoInformation}>Fetch</div> }
            {isFetching && <div>Loading...</div> }
            {!isFetching && errorMessage && <div>{errorMessage}</div> }
            {videoData &&
                <div>
                    <div>{videoData.video_title}</div>
                    <div>{videoData.video_channel}</div>
                    <div style={{width: "320px", height: "180px"}}>
                        <img src={videoData.video_thumbnail.url} style={{width: "100%", maxWidth: "100%"}} alt="Video thumbnail" />
                    </div>
                    <div>{videoData.video_published}</div>
                </div>
            }
            {(sentimentScore || sentimentScore === 0) &&
            <div>
                <div>Sentiment Score is {sentimentScore}</div>
                {featuredComments &&
                <div>
                    <div>Featured Positive:</div>
                    <p>{featuredComments.featured_positive}</p>
                    <div>Featured Negative:</div>
                    <p>{featuredComments.featured_negative}</p>
                </div>
                }

            </div>
            }
            {insights.summary && <div>{insights.summary}</div> }
            {insights.audience_preferences && <div>{insights.audience_preferences}</div> }

            {insights.themes &&
            <div>
                <div>Themes</div>
                {insights.themes.map((theme) => (
                    <span key={theme}>{theme}</span>
                ))}
            </div>
            }
            {insights.gap_keywords &&
            <div>
                <div>Keywords</div>
                {insights.gap_keywords.map((kw) => (
                    <span key={kw}>{kw}</span>
                ))}
            </div>
            }
        </div>
    )
}
