import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { 
  FiArrowRight, FiShield, FiTrendingUp, FiAward, 
  FiUsers, FiMapPin, FiClock, FiCheckCircle,
  FiChevronDown, FiSearch, FiPhoneCall, FiMenu, FiX
} from 'react-icons/fi';
import { TbSteeringWheel, TbManualGearbox, TbGasStation } from 'react-icons/tb';
import './App.css';

// Custom Cursor
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'tween',
        ease: 'backOut',
        duration: 0.15,
      }}
    />
  );
};

// Animated Aurora Background
const AuroraBackground = () => (
  <div className="aurora-bg">
    <div className="aurora-orb orb-1"></div>
    <div className="aurora-orb orb-2"></div>
    <div className="aurora-orb orb-3"></div>
  </div>
);

// Glass Card with Glowing Border (Light Mode adjustment)
const GlowingCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glowing-card ${className}`}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
      }}
    >
      <div className="glowing-card-content">{children}</div>
    </motion.div>
  );
};

// Cinematic Fade-in Wrapper
const FadeIn = ({ children, delay = 0, direction = "up", fullWidth = false }) => {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={fullWidth ? { width: '100%' } : {}}
    >
      {children}
    </motion.div>
  );
};

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX }}
    />
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Hero Parallax
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fleetData = [
    {
      category: "XE 4 CHỖ",
      icon: "🚗",
      items: [
        { name: "MAZDA 3", specs: "TỰ ĐỘNG XĂNG", image: "/MAZDA-3-Trang.jpg" },
        { name: "MAZDA 3 SPORT", specs: "", image: "/MAZDA-3-SPORT-2-2048x1353.jpg" },
        { name: "CITY", specs: "TỰ ĐỘNG XĂNG", image: "/CITY-2048x1353.jpg" },
        { name: "LUX A", specs: "TỰ ĐỘNG XĂNG", image: "/LUX-A-2048x1353.jpg" }
      ]
    },
    {
      category: "XE BÁN TẢI",
      icon: "🚙",
      items: [
        { name: "BÁN TẢI", specs: "TỰ ĐỘNG DẦU", image: "/ban-tai-cam-2048x1353.jpg" },
        { name: "BÁN TẢI", specs: "TỰ ĐỘNG DẦU", image: "/ban-tai-trang-2-cau-2048x1353.jpg" },
        { name: "BÁN TẢI", specs: "TỰ ĐỘNG DẦU", image: "/ban-tai-trang-2048x1353.jpg" },
        { name: "BÁN TẢI", specs: "TỰ ĐỘNG DẦU", image: "/ban-tai-cam-23-2048x1353.jpg" }
      ]
    },
    {
      category: "XE 7 CHỖ",
      icon: "🚐",
      items: [
        { name: "XPANDER", specs: "TỰ ĐỘNG XĂNG", image: "/XPANDER-TRANG-23-2048x1353.jpg" },
        { name: "XPANDER CROSS", specs: "", image: "/XP-CROSS-25-2048x1353.jpg" },
        { name: "OUTLANDER", specs: "AT XĂNG", image: "/OUTLANDER-2048x1353.jpg" },
        { name: "XPANDER", specs: "TỰ ĐỘNG XĂNG", image: "/XPANDER-CAM-2048x1353.jpg" }
      ]
    }
  ];

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <ScrollProgressBar />
      <CustomCursor />
      <AuroraBackground />

      {/* Floating Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo">
            <img src="/ibookcar.png" alt="IBOOKCAR" className="logo-img" />
          </a>

          {/* Hamburger Menu Icon */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <div className={`nav-item has-dropdown ${activeDropdown === 'gia-xe' ? 'active-dropdown' : ''}`}>
              <a href="#" onClick={(e) => { 
                if(window.innerWidth <= 768) {
                  e.preventDefault(); 
                  setActiveDropdown(activeDropdown === 'gia-xe' ? null : 'gia-xe');
                }
              }}>GIÁ XE TỰ LÁI <FiChevronDown /></a>
              <div className="dropdown-menu">
                <a href="#">700k đến 850k</a>
                <a href="#">900k đến 1000k</a>
                <a href="#">1100k đến 2000k</a>
              </div>
            </div>
            <div className="nav-item">
              <a href="#">KHOÁ HỌC NGHỀ</a>
            </div>
            <div className="nav-item">
              <a href="#">LIÊN HỆ ĐẶT XE</a>
            </div>
            <div className={`nav-item has-dropdown ${activeDropdown === 'cong-tac' ? 'active-dropdown' : ''}`}>
              <a href="#" onClick={(e) => { 
                if(window.innerWidth <= 768) {
                  e.preventDefault(); 
                  setActiveDropdown(activeDropdown === 'cong-tac' ? null : 'cong-tac');
                }
              }}>CỘNG TÁC VIÊN <FiChevronDown /></a>
              <div className="dropdown-menu">
                <a href="#">ĐĂNG KÝ CỘNG TÁC VIÊN</a>
                <a href="#">GỬI KHÁCH THUÊ XE</a>
                <a href="#">YÊU CẦU RÚT TIỀN</a>
              </div>
            </div>
            <div className="nav-item">
              <a href="#">TIN TỨC</a>
            </div>
          </div>
          <div className={`nav-right ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <div className="hotline">HOTLINE: 0868 713 318</div>
            <div className="search-box">
              <input type="text" placeholder="Nhập từ khóa tìm kiếm..." />
              <button className="search-btn"><FiSearch /></button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-bg">
            <video 
              src="/4K Cảnh Đẹp Việt Nam _ Ho Chi Minh City _ Con đường tấp nập người qua lại.mp4"
              autoPlay 
              muted 
              loop 
              playsInline
              className="hero-video-native"
            />
          </div>
          <div className="hero-overlay" />
          
          <motion.div 
            className="container hero-content"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <FadeIn delay={0.1}>
              <div className="hero-badge">
                <FiAward /> Dịch Vụ Cho Thuê Xe Số 1
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <h1 className="hero-title">
                Trải nghiệm <br />
                <span className="hero-highlight">Thuê Xe Tự Lái Đẳng Cấp</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="hero-desc">
                Chạm vô lăng – Chạm đẳng cấp. Dịch vụ thuê xe cao cấp với quy trình tối giản, nhanh chóng và an toàn tuyệt đối.
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="hero-buttons">
                <a href="#fleet" className="btn btn-copper-solid">
                  Thuê Xe Ngay <FiArrowRight style={{ marginLeft: '8px' }} />
                </a>
                <a href="#features" className="btn btn-copper-outline">
                  Tìm Hiểu Thêm
                </a>
              </div>
            </FadeIn>
          </motion.div>
        </section>

        {/* CEO Intro Section */}
        <section className="section ceo-section">
          <div className="container">
            <FadeIn>
              <div className="ceo-card">
                <div className="ceo-content">
                  <h2 className="ceo-greeting text-gradient-gold">XIN CHÀO QUÝ KHÁCH!</h2>
                  <p className="ceo-message">
                    Chào mừng quý anh chị đến với nền tảng cho thuê xe tự lái ibookcar. Xin giới thiệu bên dưới là danh sách các xe hiện tại chúng tôi đang kinh doanh cho thuê tự lái, mời quý anh chị tham khảo trước các xe cũng như giá cả sau đó liên hệ với chúng tôi để được tư vấn và lên lịch chốt xe ạ.
                  </p>
                  
                  <div className="ceo-signature">
                    <span className="ceo-role">GIÁM ĐỐC KINH DOANH</span>
                    <h3 className="ceo-name">CHU PHÁT ĐẠT</h3>
                    <a href="tel:0868713318" className="btn-copper-solid" style={{display: 'inline-block', padding: '1.2rem 3rem', borderRadius: '100px'}}>
                    <FiPhoneCall style={{ marginRight: '8px' }} /> Đặt Xe Ngay: 0868 713 318
                  </a>
                  </div>
                </div>
                <div className="ceo-image-wrapper">
                  <div className="ceo-image-circle">
                    <img src="/anhDat.jpg" alt="CEO Chu Phát Đạt" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2564&auto=format&fit=crop"; }} />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Fleet Section */}
        <section id="fleet" className="section">
          <div className="container">
            <FadeIn>
              <h2 className="section-title">Danh Sách <span className="text-gradient-gold">Xe Cao Cấp</span></h2>
              <p className="section-desc">
                Lựa chọn từ bộ sưu tập xe đa dạng, được bảo dưỡng chuẩn quốc tế và sẵn sàng cho mọi hành trình.
              </p>
            </FadeIn>

            <div className="fleet-container">
              {fleetData.map((category, idx) => (
                <div key={idx} className="fleet-category">
                  <FadeIn>
                    <div className="category-ribbon">
                      <span className="ribbon-icon">{category.icon}</span> {category.category}
                    </div>
                  </FadeIn>
                  
                  <div className="cars-grid">
                    {category.items.map((car, carIdx) => (
                      <FadeIn key={carIdx} delay={0.1 * carIdx}>
                        <div className="car-card">
                          <div className="car-image-container">
                            <img src={car.image} alt={car.name} />
                          </div>
                          
                          <button className="btn btn-copper-solid">
                            GỬI YÊU CẦU
                          </button>
                          
                          <button className="btn btn-copper-outline">
                            GIÁ LIÊN HỆ
                          </button>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="features" className="section">
          <div className="container">
            <FadeIn>
              <h2 className="section-title">Định Hình <span className="text-gradient">Tiêu Chuẩn Mới</span></h2>
              <p className="section-desc">
                Không chỉ là dịch vụ cho thuê xe, IBOOKCAR mang đến một hệ sinh thái di chuyển toàn diện và hoàn hảo.
              </p>
            </FadeIn>

            <div className="features-grid">
              {[
                {
                  icon: <FiMapPin />,
                  title: "Giao Xe Tận Nơi",
                  desc: "Nhận xe tại nhà, sân bay hoặc bất kỳ đâu bạn muốn. Tiện lợi tối đa."
                },
                {
                  icon: <FiShield />,
                  title: "Hợp Đồng Minh Bạch",
                  desc: "Cam kết không phí ẩn. Mọi điều khoản rõ ràng ngay từ khi đặt xe."
                },
                {
                  icon: <FiClock />,
                  title: "Hỗ Trợ 24/7",
                  desc: "Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn bất cứ lúc nào trên mọi cung đường."
                },
                {
                  icon: <FiCheckCircle />,
                  title: "Bảo Hiểm Đầy Đủ",
                  desc: "An tâm tuyệt đối với gói bảo hiểm toàn diện hai chiều cho mọi chuyến đi."
                }
              ].map((feature, idx) => (
                <FadeIn key={idx} delay={0.15 * idx}>
                  <GlowingCard className="feature-card">
                    <div className="feature-icon-wrapper">
                      {feature.icon}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </GlowingCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic Gallery */}
        <section id="gallery" className="section">
          <div className="container">
            <FadeIn>
              <h2 className="section-title">Phong Cách <span className="text-gradient-gold">Sống Đẳng Cấp</span></h2>
              <p className="section-desc">
                Mỗi chuyến đi là một trải nghiệm điện ảnh thực sự.
              </p>
            </FadeIn>

            <div className="gallery-grid">
              <FadeIn delay={0.1} fullWidth className="gallery-item gallery-item-1">
                <img src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2564&auto=format&fit=crop" alt="City Night Drive" />
                <div className="gallery-overlay">
                  <h3>City Night Drive</h3>
                </div>
              </FadeIn>

              <FadeIn delay={0.3} fullWidth className="gallery-item gallery-item-2">
                <img src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2715&auto=format&fit=crop" alt="Luxury Lifestyle" />
                <div className="gallery-overlay">
                  <h3>Luxury Lifestyle</h3>
                </div>
              </FadeIn>

              <FadeIn delay={0.5} fullWidth className="gallery-item gallery-item-3">
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2666&auto=format&fit=crop" alt="Cinematic Photography" />
                <div className="gallery-overlay">
                  <h3>Premium Focus</h3>
                </div>
              </FadeIn>

              <FadeIn delay={0.7} fullWidth className="gallery-item gallery-item-4">
                <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop" alt="Performance" />
                <div className="gallery-overlay">
                  <h3>Unleashed Performance</h3>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats">
          <div className="container">
            <div className="stats-grid">
              {[
                { number: "10K+", label: "Khách Hàng" },
                { number: "500+", label: "Xe Các Loại" },
                { number: "24/7", label: "Hỗ Trợ" },
                { number: "98%", label: "Hài Lòng" }
              ].map((stat, idx) => (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="footer">
          <div className="container">
            <div className="footer-top">
              <FadeIn className="footer-cta">
                <h2>Bắt Đầu<br/><span className="text-gradient-gold">Hành Trình Của Bạn</span></h2>
                <button className="btn btn-primary" style={{ marginTop: '2rem' }}>
                  Đặt Xe Hôm Nay <FiArrowRight style={{ marginLeft: '8px' }} />
                </button>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div style={{ display: 'flex', gap: '4rem', marginTop: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>Dịch Vụ</h4>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Thuê Xe Tự Lái</a>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Thuê Xe Có Tài Xế</a>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cho Thuê Theo Tháng</a>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>IBOOKCAR</h4>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Về Chúng Tôi</a>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Quy Chế Hoạt Động</a>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Liên Hệ</a>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="footer-bottom">
              <div>© 2026 IBOOKCAR. All rights reserved. Slogan: "Chạm vô lăng – Chạm đẳng cấp"</div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>Chính Sách Bảo Mật</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>Điều Khoản Sử Dụng</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </ReactLenis>
  );
}
