import { useEffect } from 'react'
import { shop, categories, offers } from './config'

const wa = `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(shop.whatsappMessage)}`
const ig = `https://instagram.com/${shop.instagram}`
const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(shop.mapQuery)}&output=embed`
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.mapQuery)}`

const perks = [
  ['01', 'Try before you buy', 'Walk in, feel the fabric, check the fit.'],
  ['02', 'Fresh drops', 'New styles land in store all the time.'],
  ['03', 'Honest prices', 'Good clothes that don\'t punch your wallet.'],
  ['04', 'Open late', '8 AM to 10 PM, every single day.'],
]

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  const [first, ...rest] = shop.name.split(' ')

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo">{first}<span>.</span></a>
        <nav>
          <a href="#collections">Collections</a>
          <a href="#why">Why us</a>
          <a href="#visit">Visit</a>
        </nav>
        <a className="pill" href={wa} target="_blank" rel="noreferrer">Chat ↗</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="blob b1" />
          <div className="blob b2" />
          <p className="tag">Men's wear · Puliampatti</p>
          <h1>
            <span className="line">BE</span>
            <span className="line outline">YOU</span>
            <span className="line">NIQUE<i>*</i></span>
          </h1>
          <p className="lead">{shop.tagline} Shirts, jeans, ethnic & more — all in one store.</p>
          <div className="cta">
            <a className="btn y" href={mapLink} target="_blank" rel="noreferrer">Get Directions →</a>
            <a className="btn" href={ig} target="_blank" rel="noreferrer">Follow on Instagram</a>
          </div>

          <svg className="badge" viewBox="0 0 200 200" aria-hidden="true">
            <defs><path id="c" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" /></defs>
            <circle cx="100" cy="100" r="98" fill="#ff3d8b" />
            <text><textPath href="#c">VISIT THE STORE ✦ VISIT THE STORE ✦ VISIT THE STORE ✦</textPath></text>
            <text x="100" y="116" textAnchor="middle" className="badge-mid">NEW</text>
          </svg>
        </section>

        <div className="marquee" id="offers">
          <div className="track">
            {[...offers, ...offers, ...offers].map((o, i) => <span key={i}>{o} <b>✺</b></span>)}
          </div>
        </div>

        <section id="collections" className="section">
          <h2 className="reveal">Pick your <em>drip</em></h2>
          <div className="grid">
            {categories.map((c, i) => (
              <a key={c.name} className={`card c${(i % 6) + 1} reveal`} style={{ transitionDelay: `${i * 70}ms` }} href={wa} target="_blank" rel="noreferrer">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="card-name">{c.name}</span>
                <span className="card-desc">{c.desc}</span>
                <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section id="why" className="section why">
          <h2 className="reveal">Why <em>{first}</em>?</h2>
          <div className="perks">
            {perks.map(([n, t, d], i) => (
              <div key={n} className="perk reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <b>{n}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wabig reveal">
          <h2>Want it? <br />Just <em>text</em> us.</h2>
          <a className="btn y big" href={wa} target="_blank" rel="noreferrer">WhatsApp {shop.phone} →</a>
        </section>

        <section id="visit" className="section">
          <h2 className="reveal">Come <em>say hi</em></h2>
          <div className="visit">
            <div className="info reveal">
              <h3>Address</h3>
              <p>{shop.address}</p>
              <h3>Open</h3>
              <ul>{shop.hours.map(([d, t]) => <li key={d}><b>{d}</b> {t}</li>)}</ul>
              <h3>Reach us</h3>
              <div className="contacts">
                <a href={`tel:${shop.phone.replace(/\s/g, '')}`}>📞 {shop.phone}</a>
                <a href={wa} target="_blank" rel="noreferrer">💬 WhatsApp</a>
                <a href={ig} target="_blank" rel="noreferrer">📷 @{shop.instagram}</a>
                {shop.email && <a href={`mailto:${shop.email}`}>✉️ {shop.email}</a>}
              </div>
            </div>
            <iframe className="reveal" title="Shop location" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
      </main>

      <footer>
        <div className="giant">{first}{rest.length ? ' ' + rest.join(' ') : ''}</div>
        <span>© {new Date().getFullYear()} {shop.name}. Made in Puliampatti.</span>
      </footer>

      <nav className="dock" aria-label="Quick actions">
        <a href={`tel:${shop.phone.replace(/\s/g, '')}`}>📞<span>Call</span></a>
        <a href={wa} target="_blank" rel="noreferrer">💬<span>WhatsApp</span></a>
        <a href={mapLink} target="_blank" rel="noreferrer">📍<span>Map</span></a>
        <a href={ig} target="_blank" rel="noreferrer">📷<span>Insta</span></a>
      </nav>

      <a className="fab" href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">💬</a>
    </>
  )
}
