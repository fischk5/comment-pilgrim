import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter   } from 'react-router-dom'

import LandingPage from "./components/LandingPage"
import Library from "./components/Library"
import VideoPage from './components/VideoPage'

import { getJobLibrary } from './common/Api'

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => { return null })
  const [isLoading, setIsLoading] = useState(() => { return true })
  const [library, setLibrary] = useState(() => { return [] })
  const fetchLibrary = async () => {
    try {
      // if (!authenticated) return
      getJobLibrary()
      .then((res) => {
        setLibrary(res.jobs)
      })
    } catch (error) {
      return
    }
  }
  const initializeCommentPilgrim = async () => {
    fetchLibrary()
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAuthenticated(true)
    setIsLoading(false)
  }
  // useEffect(() => {
  //   const intervalId = setInterval(fetchLibrary, 10000); // runs every 10 seconds
  //   return () => clearInterval(intervalId);
  // }, []);
  useEffect(() => {
    initializeCommentPilgrim()
  }, [])
  return (
    <div className="main">
      {!isLoading &&
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage authenticated={authenticated} />} />
          <Route path="/library" element={<Library library={library} fetchLibrary={fetchLibrary} />} />
          <Route path="/library/:jobId" element={<VideoPage library={library} fetchLibrary={fetchLibrary} />} />
          <Route path="*" element={<LandingPage authenticated={authenticated} />} />
        </Routes>
      </BrowserRouter>
      }
      {isLoading &&
      <div className="app-loader-out">
        <div className="app-load-in">
          <div className="app-load-welcome">
            <h1>Welcome to Comment Pilgrim</h1>
            <div className="loader"></div>
            <div>Loading your experience...</div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}