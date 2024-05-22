import React, { useEffect, useState } from 'react'
import { getYoutubeVideoDataSource } from '../common/Api'

export default function Home() {
    const [videoData, setVideoData] = useState(() => { return false })
    const [sentimentScore, setSentimentScore] = useState(() => { return false })
    const [proposedUrlString, setProposedUrlString] = useState(() => { return "" })
    const [insights, setInsights] = useState(() => { return false })
    const [featuredComments, setFeaturedComments] = useState(() => { return false })
    const [videoId, setVideoId] = useState(() => { return false })
    const [isFetching, setIsFetching] = useState(() => { return false })
    const [progressMessage, setProgressMessage] = useState(() => { return false })
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
        const eventSource = new EventSource(getYoutubeVideoDataSource(videoId));
        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setProgressMessage(parsedData.message)
            if (parsedData.video) setVideoData(parsedData.video)
            if (parsedData.sentiment_score || parsedData.sentiment_score === 0) setSentimentScore(parsedData.sentiment_score)
            if (parsedData.featured_positive) {
                if (parsedData.featured_negative) {
                    setFeaturedComments({ featured_positive: parsedData.featured_positive, featured_negative: parsedData.featured_negative })
                }
            }
            if (parsedData.insights) setInsights(parsedData.insights)

            if (parsedData.complete) {
                setIsFetching(false)
                eventSource.close()
            }

            if (parsedData.error) {
                setErrorMessage(parsedData.error);
                setIsFetching(false);
                eventSource.close();
            }
        };

        eventSource.onerror = (error) => {
            console.error("EventSource failed:", error);
            setErrorMessage("An error occurred while fetching the data.");
            setIsFetching(false);
            eventSource.close();
        };
    };
    useEffect(() => {
        extractYouTubeVideoId()
    // eslint-disable-next-line
    }, [proposedUrlString])
    return (
        <div>
            <div>Video URL</div>
            {progressMessage && isFetching && <div>{progressMessage}</div>}
            <input type="text" value={proposedUrlString} onChange={(e) => setProposedUrlString(e.target.value)}/>
            {videoId && !isFetching && <div onClick={fetchVideoInformation}>Fetch</div> }
            {isFetching && !progressMessage && <div>Loading...</div> }
            {!isFetching && errorMessage && <div>{errorMessage}</div> }
            {videoData &&
                <div>
                    <div>{videoData.video_title}</div>
                    <div>{videoData.channel}</div>
                    <div style={{width: "320px", height: "180px"}}>
                        <img src={videoData.thumbnail.url} style={{width: "100%", maxWidth: "100%"}} alt="Video thumbnail" />
                    </div>
                    <div>{videoData.published}</div>
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
