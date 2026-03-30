import React from 'react'
import { motion } from 'framer-motion'
import { Download, Users, Mail, Phone, MapPin, ChevronRight, Apple, Play } from 'lucide-react'

const LandingPage = ({ content }) => {
  if (!content) return null

  const { appDescription, teamDescription, contact, downloadLinks } = content

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar container">
        <div className="logo gradient-text" style={{ fontSize: '1.8rem', fontWeight: '800' }}>Shot-Mate</div>
        <div className="nav-links">
          <a href="#app">Uygulama</a>
          <a href="#team">Ekip</a>
          <a href="#contact">İletişim</a>
          <a href="#download" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', marginLeft: '1rem' }}>Şimdi İndir</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section hero container" id="app">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '2rem' }}
          >
            {appDescription.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}
          >
            {appDescription.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-buttons"
          >
            <a href="#download" className="btn btn-primary">
              <Download size={20} style={{ marginRight: '0.5rem' }} /> İncele
            </a>
          </motion.div>
        </div>
        <div className="hero-image">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src={appDescription.imageUrl} 
            alt="Shot-Mate" 
            style={{ width: '100%', borderRadius: '32px', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="section team container" id="team">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{teamDescription.title}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>{teamDescription.description}</p>
        </div>
        <div className="team-grid">
          {teamDescription.members.map((member, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="glass-card team-card"
            >
              <img src={member.imageUrl} alt={member.name} />
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact container" id="contact">
        <div className="glass-card contact-wrapper">
          <div className="contact-info">
            <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{contact.title}</h2>
            <div className="info-item">
              <Mail className="gradient-text" /> <span>{contact.email}</span>
            </div>
            <div className="info-item">
              <Phone className="gradient-text" /> <span>{contact.phone}</span>
            </div>
            <div className="info-item">
              <MapPin className="gradient-text" /> <span>{contact.address}</span>
            </div>
          </div>
          <div className="contact-form">
            <h3 style={{ marginBottom: '1.5rem' }}>Bize Mesaj Gönderin</h3>
            <input type="text" placeholder="Adınız" />
            <input type="email" placeholder="E-posta" />
            <textarea placeholder="Mesajınız" rows="5"></textarea>
            <button className="btn btn-primary" style={{ width: '100%' }}>Gönder</button>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="section download container" id="download" style={{ textAlign: 'center' }}>
        <div className="download-box glass-card">
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>{downloadLinks.title}</h2>
          <p style={{ marginBottom: '3rem', color: 'var(--text-muted)', fontSize: '1.2rem' }}>Hadi, eğlenceye sen de katıl!Shot-Mate'i ücretsiz indir.</p>
          <div className="download-links">
            <a href={downloadLinks.appStoreUrl} className="btn-store">
              <Apple size={32} />
              <div className="store-text">
                <span>App Store'dan</span>
                <strong>İndirin</strong>
              </div>
            </a>
            <a href={downloadLinks.playStoreUrl} className="btn-store">
              <Play size={32} />
              <div className="store-text">
                <span>Google Play'den</span>
                <strong>İndirin</strong>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4rem 0', borderTop: '1px solid var(--glass-border)' }}>
          <div className="logo gradient-text" style={{ fontSize: '1.5rem', fontWeight: '800' }}>Shot-Mate</div>
          <div style={{ color: 'var(--text-muted)' }}>&copy; 2024 Shot-Mate. Tüm Hakları Saklıdır.</div>
        </div>
      </footer>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          z-index: 1000;
          backdrop-filter: blur(20px);
          background: rgba(10, 10, 11, 0.8);
        }
        .nav-links a {
          color: var(--text-main);
          text-decoration: none;
          margin-left: 2rem;
          font-weight: 500;
          transition: 0.3s;
        }
        .nav-links a:hover {
          color: var(--primary);
        }
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .team-card {
          padding: 2rem;
          text-align: center;
          transition: 0.4s;
        }
        .team-card img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin-bottom: 1.5rem;
          object-fit: cover;
          border: 4px solid var(--glass-border);
        }
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 4rem;
          gap: 4rem;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }
        .contact-form input, .contact-form textarea {
          width: 100%;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: white;
          margin-bottom: 1rem;
          outline: none;
        }
        .download-box {
          padding: 5rem;
          background: linear-gradient(180deg, rgba(255, 59, 48, 0.05) 0%, rgba(10, 10, 11, 0) 100%);
        }
        .download-links {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }
        .btn-store {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background: white;
          color: black;
          border-radius: 16px;
          text-decoration: none;
          transition: 0.3s;
        }
        .btn-store:hover {
          transform: scale(1.05);
        }
        .store-text {
          display: flex;
          flex-direction: column;
          align-items: start;
        }
        .store-text span {
          font-size: 0.8rem;
          opacity: 0.7;
        }
        .store-text strong {
          font-size: 1.2rem;
        }
        @media (max-width: 968px) {
          .hero, .contact-wrapper { grid-template-columns: 1fr; }
          .hero { text-align: center; }
          .hero-content h1 { font-size: 3rem !important; }
          .hero-buttons { justify-content: center; }
          .navbar { padding: 1rem; }
          .nav-links a:not(.btn) { display: none; }
        }
      `}</style>
    </div>
  )
}

export default LandingPage
