import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isPageActive, setIsPageActive] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [buttonShineDirection, setButtonShineDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Single mouse listener for cursor-reactive ambient light
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });

      // Check button hover and determine shine direction
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        
        // If cursor is to the left of button center, shine goes left-to-right
        if (e.clientX < buttonCenterX) {
          setButtonShineDirection('ltr');
        } else {
          setButtonShineDirection('rtl');
        }
      }
    };

    const handleMouseEnter = () => setIsPageActive(true);
    const handleMouseLeave = () => setIsPageActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Use the name entered by user
    login(name);
    navigate('/home');
  };

  // Calculate ambient light position based on cursor
  const lightX = mousePos.x * 100;
  const lightY = mousePos.y * 100;

  return (
    <div className="login-container" ref={containerRef}>
      {/* Reactive Background with Ambient Light */}
      <div className="login-background">
        <div 
          className={`ambient-light ${isPageActive ? 'active' : ''}`}
          style={{
            '--light-x': `${lightX}%`,
            '--light-y': `${lightY}%`,
          } as React.CSSProperties}
        />
        <div className="background-gradient" />
      </div>

      {/* Cursor Light Field */}
      <div 
        className={`cursor-light ${isPageActive ? 'active' : ''}`}
        style={{
          left: `${lightX}%`,
          top: `${lightY}%`,
        }}
      />

      {/* Login Card */}
      <div 
        className={`login-card ${isCardHovered ? 'hovered' : ''} ${isPageActive ? 'awake' : ''}`}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <div className="card-glow" />
        <div className="login-card-inner">
          <h1 className="login-title">Welcome to Snowman</h1>
          <p className="login-subtitle">Sign in to start the journey</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="login-input"
                required
              />
              <label 
                htmlFor="name" 
                className={`floating-label ${name || focusedField === 'name' ? 'active' : ''}`}
              >
                Name
              </label>
            </div>

            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="login-input"
                required
              />
              <label 
                htmlFor="email" 
                className={`floating-label ${email || focusedField === 'email' ? 'active' : ''}`}
              >
                Email
              </label>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="login-input"
                required
              />
              <label 
                htmlFor="password" 
                className={`floating-label ${password || focusedField === 'password' ? 'active' : ''}`}
              >
                Password
              </label>
            </div>

            <button 
              type="submit" 
              className="login-button"
              ref={buttonRef}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span>Sign In</span>
              <div 
                className={`button-glow ${isButtonHovered ? 'active' : ''} ${buttonShineDirection === 'rtl' ? 'rtl' : 'ltr'}`}
              />
            </button>
          </form>

          <div className="login-footer">
            <a href="#" className="login-link">Forgot password?</a>
            <span className="login-divider">•</span>
            <a href="#" className="login-link">Create account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
