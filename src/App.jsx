import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import LandingPage from "./components/LandingPage"
import Library from "./components/Library"
import VideoPage from './components/VideoPage'
import PrivacyPolicy from './components/PrivacyPolicy'
import Register from './components/accounts/Register'
import Login from './components/accounts/Login'
import LandingWelcome from './components/accounts/LandingWelcome'
import PlanManager from './components/accounts/PlanManager'
import NewPlan from './components/accounts/NewPlan'

import { getJobLibrary, fetchAuth } from './common/Api'

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => { return null })
  const [isLoading, setIsLoading] = useState(() => { return true })
  const [library, setLibrary] = useState(() => { return [] })
  const fetchLibrary = async () => {
    try {
      if (!authenticated) return
      getJobLibrary()
      .then((res) => {
        setLibrary(res.jobs)
      })
    } catch (error) {
      return
    }
  }
  const getAuthentication = async () => {
    fetchAuth()
        .then((res) => {
            if (res.authenticated) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        })
        .catch((err) => {
            setAuthenticated(false)
        })
  }
  useEffect(() => {
    const initialize = async () => {
      getAuthentication()
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    initialize();
  }, []);
  useEffect(() => {
    if (!authenticated) return
    const intervalId = setInterval(fetchLibrary, 10000);
    fetchLibrary();
    return () => clearInterval(intervalId);
  // eslint-disable-next-line
  }, [authenticated]);
  return (
    <div className="main">
      {!isLoading &&
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage authenticated={authenticated} />} />
          <Route path="/landing-welcome" element={<LandingWelcome authenticated={authenticated} setAuthenticated={setAuthenticated}/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy authenticated={authenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {authenticated && <Route path="/account" element={<PlanManager library={library} fetchLibrary={fetchLibrary} />} />}
          {authenticated && <Route path="/new-plan" element={<NewPlan library={library} fetchLibrary={fetchLibrary} />} />}
          {authenticated && <Route path="/library" element={<Library library={library} fetchLibrary={fetchLibrary} />} />}
          {authenticated && <Route path="/library/:jobId" element={<VideoPage library={library} fetchLibrary={fetchLibrary} />} />}
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