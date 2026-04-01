import { ShieldCheck, Truck, RefreshCcw, Globe, Zap, Users, Award, Star } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Founded', value: '2020', icon: <Award className="text-warning" /> },
    { label: 'Happy Customers', value: '50k+', icon: <Users className="text-primary" /> },
    { label: 'Stores Worldwide', value: '12', icon: <Globe className="text-info" /> },
    { label: 'Customer Rating', value: '4.8/5', icon: <Star className="text-warning" /> }
  ];

  const coreValues = [
    { 
      title: 'Performance Ready', 
      desc: 'Our footwear is engineered for the highest performance levels, ensuring athletes and enthusiasts alike can reach their full potential.', 
      icon: <Zap size={32} className="text-warning" /> 
    },
    { 
      title: 'Authenticity First', 
      desc: 'We guarantee the authenticity of every single item we list. No replicas, only genuine, high-quality gear from trusted sources.', 
      icon: <ShieldCheck size={32} className="text-success" /> 
    },
    { 
      title: 'Sustainable Gear', 
      desc: "Innovation doesn't stop at performance. We prioritize sustainable practices and eco-friendly materials in our latest limited collections.", 
      icon: <RefreshCcw size={32} className="text-info" /> 
    },
    { 
      title: 'Reliable Shipping', 
      desc: 'We shipping worldwide with fast, tracked, and insured delivery options, making sure your favorite kicks reach you safely.', 
      icon: <Truck size={32} className="text-primary" /> 
    }
  ];

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div 
        className="py-5 position-relative text-center overflow-hidden" 
        style={{ 
          background: 'linear-gradient(135deg, #0a1128 0%, #1c212e 100%)', 
          minHeight: '60vh', 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <div className="container position-relative z-1 py-5">
           <h1 className="display-2 fw-bolder text-white mb-4 animate-fade-in">Step Into <span className="text-warning"> Excellence.</span></h1>
           <p className="lead text-white-50 mx-auto" style={{ maxWidth: '700px', fontSize: '1.25rem' }}>
             ADRINO is a leading premium sneaker marketplace, bringing you the most exclusive and performant footwear on the planet.
             Our mission is to redefine how the world shops for limited edition kicks.
           </p>
        </div>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{ background: 'url(https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1920) center/cover' }}></div>
      </div>

      <div className="container py-5" style={{ marginTop: '-80px' }}>
         <div className="row g-4 mb-5">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-6 col-md-3">
                 <div className="p-4 rounded-4 shadow-lg text-center h-100 border border-secondary border-opacity-10" style={{ backgroundColor: 'var(--tv-bg)' }}>
                    <div className="mb-3 d-inline-flex p-3 rounded-pill" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>{stat.icon}</div>
                    <h3 className="fw-bolder mb-1" style={{ color: 'var(--tv-text)' }}>{stat.value}</h3>
                    <p className="text-muted small text-uppercase mb-0">{stat.label}</p>
                 </div>
              </div>
            ))}
         </div>

         {/* Mission Statement */}
         <div className="row align-items-center py-5 my-5 g-5">
            <div className="col-lg-6">
               <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--tv-text)' }}>More than <span className="text-warning"> just footwear.</span></h2>
               <p className="mb-4" style={{ color: 'var(--tv-text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                 Born in 2020, ADRINO started as a small community of sneaker enthusiasts. Today, we are a global destination for limited edition products and high-performance performance gear.
                 We believe your choice of footwear says something about your journey, and we're here to make that journey legendary.
               </p>
               <div className="p-4 rounded-3 border-start border-warning border-4" style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)' }}>
                  <p className="mb-0 fw-italic" style={{ color: 'var(--tv-text)', fontStyle: 'italic' }}>
                    "Our goal isn't just to sell shoes; it's to elevate the culture and ensure every step you take is a statement of authenticity and excellence."
                  </p>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="position-relative p-2 rounded-4" style={{ backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border)' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
                    className="img-fluid rounded-3 shadow-lg" 
                    alt="The ADRINO Mission" 
                  />
               </div>
            </div>
         </div>

         {/* Core Values Section */}
         <div className="py-5 mb-5 text-center">
            <h2 className="display-6 fw-bold mb-5" style={{ color: 'var(--tv-text)' }}>The <span className="text-warning">&bull;</span> ADRINO Standard</h2>
            <div className="row g-4 text-start">
               {coreValues.map((value, idx) => (
                  <div key={idx} className="col-md-6 col-lg-3">
                     <div className="p-4 rounded-4 h-100 border border-secondary border-opacity-10 shadow-sm" style={{ backgroundColor: 'var(--tv-panel)' }}>
                        <div className="mb-4">{value.icon}</div>
                        <h5 className="fw-bold mb-3" style={{ color: 'var(--tv-text)' }}>{value.title}</h5>
                        <p className="small mb-0" style={{ color: 'var(--tv-text-muted)', lineHeight: '1.7' }}>{value.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
