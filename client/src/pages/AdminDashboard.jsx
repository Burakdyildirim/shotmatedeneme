import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../firebase'
import { Save, LogOut, Info, Users, Mail, Download, Plus, Trash2 } from 'lucide-react'

const AdminDashboard = ({ content, onUpdate }) => {
  const [data, setData] = useState(content)
  const [activeTab, setActiveTab] = useState('app')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('admin_token') !== 'authenticated') {
      navigate('/admin')
    }
  }, [])

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "website", "content");
      await updateDoc(docRef, data);
      setMessage('İçerik başarıyla güncellendi!');
      onUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Firebase update error:", err)
      setMessage('Güncelleme hatası.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin')
  }

  if (!data) return null

  return (
    <div className="admin-dashboard" style={{ display: 'flex', height: '100vh', background: '#0A0A0B' }}>
      {/* Sidebar */}
      <div style={{ width: '280px', background: 'var(--bg-card)', padding: '2rem', borderRight: '1px solid var(--glass-border)' }}>
        <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '3rem' }}>Shot-Mate Admin</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button onClick={() => setActiveTab('app')} className={`tab-btn ${activeTab === 'app' ? 'active' : ''}`}><Info size={18} /> Uygulama</button>
          <button onClick={() => setActiveTab('team')} className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}><Users size={18} /> Ekip</button>
          <button onClick={() => setActiveTab('contact')} className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}><Mail size={18} /> İletişim</button>
          <button onClick={() => setActiveTab('download')} className={`tab-btn ${activeTab === 'download' ? 'active' : ''}`}><Download size={18} /> İndirme</button>
        </div>
        <button onClick={handleLogout} className="btn-logout" style={{ marginTop: 'auto', position: 'absolute', bottom: '2rem', width: '216px' }}><LogOut size={18} /> Çıkış Yap</button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem' }}>İçerik Editörü</h2>
          <button onClick={handleUpdate} className="btn btn-primary"><Save size={20} style={{ marginRight: '0.5rem' }} /> Değişiklikleri Kaydet</button>
        </div>

        {message && <div style={{ background: 'rgba(48, 209, 88, 0.1)', color: 'var(--accent)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--accent)' }}>{message}</div>}

        <div className="glass-card" style={{ padding: '2rem' }}>
          {activeTab === 'app' && (
            <div>
              <h3 style={{ marginBottom: '2rem' }}>Uygulama Bilgileri</h3>
              <div className="form-group">
                <label>Başlık</label>
                <input type="text" value={data.appDescription.title} onChange={(e) => setData({...data, appDescription: {...data.appDescription, title: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>Açıklama</label>
                <textarea rows="5" value={data.appDescription.description} onChange={(e) => setData({...data, appDescription: {...data.appDescription, description: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>Görsel URL</label>
                <input type="text" value={data.appDescription.imageUrl} onChange={(e) => setData({...data, appDescription: {...data.appDescription, imageUrl: e.target.value}})} />
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <h3 style={{ marginBottom: '2rem' }}>Ekip Bilgileri</h3>
              <div className="form-group">
                <label>Bölüm Başlığı</label>
                <input type="text" value={data.teamDescription.title} onChange={(e) => setData({...data, teamDescription: {...data.teamDescription, title: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>Bölüm Açıklaması</label>
                <textarea rows="3" value={data.teamDescription.description} onChange={(e) => setData({...data, teamDescription: {...data.teamDescription, description: e.target.value}})} />
              </div>
              <h4 style={{ margin: '2rem 0 1rem' }}>Üyeler</h4>
              {data.teamDescription.members.map((member, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Ad Soyad</label>
                      <input type="text" value={member.name} onChange={(e) => {
                        const newMembers = [...data.teamDescription.members]
                        newMembers[idx].name = e.target.value
                        setData({...data, teamDescription: {...data.teamDescription, members: newMembers}})
                      }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Rol</label>
                      <input type="text" value={member.role} onChange={(e) => {
                        const newMembers = [...data.teamDescription.members]
                        newMembers[idx].role = e.target.value
                        setData({...data, teamDescription: {...data.teamDescription, members: newMembers}})
                      }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Görsel URL</label>
                      <input type="text" value={member.imageUrl} onChange={(e) => {
                        const newMembers = [...data.teamDescription.members]
                        newMembers[idx].imageUrl = e.target.value
                        setData({...data, teamDescription: {...data.teamDescription, members: newMembers}})
                      }} />
                    </div>
                    <button onClick={() => {
                        const newMembers = data.teamDescription.members.filter((_, i) => i !== idx)
                        setData({...data, teamDescription: {...data.teamDescription, members: newMembers}})
                    }} style={{ background: 'none', border: 'none', color: '#ff3b30', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
              <button 
                className="btn" 
                style={{ background: 'rgba(255,255,255,0.05)', color: 'white', width: '100%', marginTop: '1rem' }}
                onClick={() => {
                  const newMembers = [...data.teamDescription.members, { name: "", role: "", imageUrl: "" }]
                  setData({...data, teamDescription: {...data.teamDescription, members: newMembers}})
                }}
              >
                <Plus size={18} style={{ marginRight: '0.5rem' }} /> Üye Ekle
              </button>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h3 style={{ marginBottom: '2rem' }}>İletişim Bilgileri</h3>
              <div className="form-group">
                <label>Başlık</label>
                <input type="text" value={data.contact.title} onChange={(e) => setData({...data, contact: {...data.contact, title: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="text" value={data.contact.email} onChange={(e) => setData({...data, contact: {...data.contact, email: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input type="text" value={data.contact.phone} onChange={(e) => setData({...data, contact: {...data.contact, phone: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>Adres</label>
                <input type="text" value={data.contact.address} onChange={(e) => setData({...data, contact: {...data.contact, address: e.target.value}})} />
              </div>
            </div>
          )}

          {activeTab === 'download' && (
            <div>
              <h3 style={{ marginBottom: '2rem' }}>İndirme Linkleri</h3>
              <div className="form-group">
                <label>Başlık</label>
                <input type="text" value={data.downloadLinks.title} onChange={(e) => setData({...data, downloadLinks: {...data.downloadLinks, title: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>App Store URL</label>
                <input type="text" value={data.downloadLinks.appStoreUrl} onChange={(e) => setData({...data, downloadLinks: {...data.downloadLinks, appStoreUrl: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>Google Play Store URL</label>
                <input type="text" value={data.downloadLinks.playStoreUrl} onChange={(e) => setData({...data, downloadLinks: {...data.downloadLinks, playStoreUrl: e.target.value}})} />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem;
          background: none;
          border: none;
          color: var(--text-muted);
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
          font-weight: 500;
          font-size: 1rem;
        }
        .tab-btn:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }
        .tab-btn.active {
          background: var(--primary);
          color: white;
        }
        .btn-logout {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 59, 48, 0.1);
          border: 1px solid rgba(255, 59, 48, 0.2);
          color: #ff3b30;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
        }
        .form-group {
          margin-bottom: 2rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.8rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: white;
          outline: none;
          font-family: inherit;
          font-size: 1rem;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.06);
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
