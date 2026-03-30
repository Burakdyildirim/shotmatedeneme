import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from './firebase'
import { defaultData } from './defaultData'
import LandingPage from './pages/LandingPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import './index.css'

const App = () => {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchContent = async () => {
    try {
      const docRef = doc(db, "website", "content");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const { adminPassword, ...publicData } = data;
        setContent(publicData);
      } else {
        await setDoc(docRef, defaultData);
        const { adminPassword, ...publicData } = defaultData;
        setContent(publicData);
      }
    } catch (err) {
      console.error("Error fetching content:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0B', color: 'white' }}>Yükleniyor...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage content={content} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard content={content} onUpdate={fetchContent} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App

