import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase'
import { Lock } from 'lucide-react'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const docRef = doc(db, "website", "content")
      const docSnap = await getDoc(docRef)
      if (docSnap.exists() && docSnap.data().adminPassword === password) {
        localStorage.setItem('admin_token', 'authenticated')
        navigate('/admin/dashboard')
      } else {
        setError('Geçersiz şifre')
      }
    } catch (err) {
      console.error("Login error:", err)
      setError('Giriş yapılırken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleLogin} className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Shot-Mate Admin</div>
        <div style={{ marginBottom: '2rem' }}>
          <Lock size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>Devam etmek için yönetici şifresini girin.</p>
        </div>
        <input 
          type="password" 
          placeholder="Şifre" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', marginBottom: '1rem', outline: 'none' }}
        />
        {error && <p style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Giriş Yap</button>
      </form>
    </div>
  )
}

export default AdminLogin
