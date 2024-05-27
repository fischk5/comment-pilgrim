import React, { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useNavigate  } from 'react-router-dom'

import { getYoutubeVideoData, getBasicVideoInformation } from '../../common/Api'

export default function ModalNewJob({ hideModal, goToVideoById, seedUrl }) {
    const navigate = useNavigate()
    const [videoData, setVideoData] = useState(() => { return false })
    const [proposedUrlString, setProposedUrlString] = useState(() => { return seedUrl ? seedUrl : "" })
    const [videoId, setVideoId] = useState(() => { return false })
    const [fetched, setFetched] = useState(() => { return false })
    const [isFetching, setIsFetching] = useState(() => { return false })
    const [planLimits, setPlanLimits] = useState(() => { return false })
    const [isSubmittingForInsights, setIsSubmittingForInsights] = useState(() => { return false })
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
    const attemptJobSubmit = () => {
        if (isSubmittingForInsights) return hideModal()
        if (!videoId) return hideModal()
        fetchVideoInformation()
    }
    const getVideoCheck = () => {
        if (isFetching) return
        if (!videoId) return
        setIsFetching(true)
        getBasicVideoInformation(videoId)
        .then((res) => {
            if (res.video_title) {
                setPlanLimits(res.current_plan)
                setVideoData(res)
                setFetched(true)
                setIsFetching(false)
            } else {
                setFetched(true)
                setIsFetching(false)
                setErrorMessage("Something went wrong fetching your video")
            }
        })
        .catch((err) => {
            setIsFetching(false)
            setErrorMessage("Something went wrong fetching your video")
        })
    }
    const fetchVideoInformation = () => {
        setIsSubmittingForInsights(true);
        setErrorMessage(false)
        if (!videoId) return
        getYoutubeVideoData(videoId)
        .then((res) => {
            if (res.video_id) {
                if (res._id) return goToVideoById(res._id)
            }
        })
        .catch((err) => {
            setIsFetching(false)
            setErrorMessage("Something went wrong fetching your video. Double check your link and try again.")
        })
    };
    const canFetchNewVideo = () => {
        try {
            if (isSubmittingForInsights) return false
            if (!planLimits) return false
            if (planLimits.monthly_limit > planLimits.monthly_total) return true
            return false
        } catch (error) {
            return false
        }
    }
    const handleKeyPress = (e) => {
        if (!videoId) return
        if (isFetching) return
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            getVideoCheck()
        }
    }
    const goToUpgradePage = () => {
        hideModal()
        navigate("/account")
    }
    useEffect(() => {
        extractYouTubeVideoId()
    // eslint-disable-next-line
    }, [proposedUrlString])
    return (
        <ModalWrapper>

            {/* NEW VIDEO REVIEW */}
            {!fetched &&
            <div className="modal-new-job">
                <h2>{!isFetching ? "New video analysis" : "Great choice!"}</h2>
                <p>{!isFetching ? "Learn from the comments section. Drop a link to any YouTube video to get started." : "Looking up video..."}</p>
                {!isFetching && <input autoFocus={true} type="text" placeholder="Enter a YouTube video URL" value={proposedUrlString} onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => setProposedUrlString(e.target.value)} />}
                <div style={{width: "100%", minHeight: "56px"}}>
                    {!isFetching && <div className="button-primary" style={videoId ? {} : {backgroundColor: "grey"}} onClick={getVideoCheck}>{isFetching ? ". . ." : "Search for video"}</div>}
                    {isFetching && <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}> <div className="loader-button" style={{height: "auto"}}/> </div>}
                </div>
                <div className="button-secondary" onClick={hideModal}>Cancel</div>
            </div>
            }

            {/* REVIEW VIDEO */}
            {fetched && videoData && !errorMessage &&
            <div className="modal-new-job">
                <div className="image-preview">
                    <img src={videoData.thumbnail.url} alt={videoData.video_title} />
                    <div className="preview-title">{videoData.video_title}</div>
                    <div className="preview-channel">{videoData.channel}</div>
                </div>
                {!canFetchNewVideo() && !isFetching && !isSubmittingForInsights && <p style={{fontSize: "14px", color: "rgb(157, 24, 24)" }}>You have used all available reports for this period</p>}
                {canFetchNewVideo() && <p style={{fontSize: "14px"}}>You have analyzed {planLimits.monthly_total}/{planLimits.monthly_limit} videos this period.</p>}
                <div style={{width: "100%", minHeight: "56px"}}>
                    {canFetchNewVideo() && <div className="button-primary" style={videoId ? {} : {backgroundColor: "grey"}} onClick={attemptJobSubmit}>Fetch Insights</div>}
                    {!canFetchNewVideo() && !isSubmittingForInsights && <div className="button-primary" onClick={goToUpgradePage}>Upgrade Plan</div>}
                    {isSubmittingForInsights && <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}> <div className="loader-button" style={{height: "auto"}}/> </div>}
                </div>
                {!isSubmittingForInsights && <div className="button-secondary" onClick={hideModal}>Cancel</div>}
            </div>
            }

            {/* ERROR FETCHING DATA */}
            {fetched && errorMessage &&
            <div className="modal-new-job">
                <p>{errorMessage}</p>
                <div style={{width: "100%", minHeight: "56px"}}>
                    <div className="button-secondary" onClick={hideModal}>Start over</div>
                </div>

            </div>
            }
            
        </ModalWrapper>
    )
}
