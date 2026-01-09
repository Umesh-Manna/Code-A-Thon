import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  // Left Panel - Sign Up State
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [signupConfirmError, setSignupConfirmError] = useState('');
  const [signupPasswordStrength, setSignupPasswordStrength] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  
  // Right Panel - Log In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Active panel for mobile toggle
  const [activePanel, setActivePanel] = useState('login'); // 'login' or 'signup'

  // Load registered users from localStorage
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  // Save user to localStorage
  const saveUser = (email, password) => {
    const users = getRegisteredUsers();
    users.push({ email, password });
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  // Check if user exists
  const userExists = (email) => {
    const users = getRegisteredUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  // Validate login credentials
  const validateLogin = (email, password) => {
    const users = getRegisteredUsers();
    return users.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password
    );
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'weak';
    if (password.length < 10) {
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      if ((hasNumber && hasSpecial) || (hasNumber && hasUpper) || (hasSpecial && hasUpper)) {
        return 'medium';
      }
      return 'weak';
    }
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    if (hasNumber && hasSpecial && hasUpper && hasLower) {
      return 'strong';
    }
    return 'medium';
  };

  // Get strength color and text
  const getStrengthColor = (strength) => {
    if (strength === 'weak') return '#FF4444';
    if (strength === 'medium') return '#FFA500';
    if (strength === 'strong') return '#44FF44';
    return 'transparent';
  };

  const getStrengthText = (strength) => {
    if (strength === 'weak') return 'Weak';
    if (strength === 'medium') return 'Medium';
    if (strength === 'strong') return 'Strong';
    return '';
  };

  // SIGN UP HANDLERS
  const handleSignupEmailChange = (e) => {
    const value = e.target.value;
    setSignupEmail(value);
    setSignupSuccess('');
    if (value && !validateEmail(value)) {
      setSignupEmailError('Please enter a valid email address');
    } else if (value && userExists(value)) {
      setSignupEmailError('This email is already registered. Please login.');
    } else {
      setSignupEmailError('');
    }
  };

  const handleSignupPasswordChange = (e) => {
    const value = e.target.value;
    setSignupPassword(value);
    setSignupSuccess('');
    const strength = checkPasswordStrength(value);
    setSignupPasswordStrength(strength);
    
    if (value && value.length < 6) {
      setSignupPasswordError('Password must be at least 6 characters');
    } else {
      setSignupPasswordError('');
    }

    // Revalidate confirm password if it exists
    if (signupConfirmPassword) {
      if (value !== signupConfirmPassword) {
        setSignupConfirmError('Passwords do not match');
      } else {
        setSignupConfirmError('');
      }
    }
  };

  const handleSignupConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setSignupConfirmPassword(value);
    setSignupSuccess('');
    
    if (value && value !== signupPassword) {
      setSignupConfirmError('Passwords do not match');
    } else {
      setSignupConfirmError('');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    // Reset messages
    setSignupSuccess('');
    
    // Validation
    if (!signupEmail) {
      setSignupEmailError('Email is required');
      return;
    }
    if (!validateEmail(signupEmail)) {
      setSignupEmailError('Please enter a valid email address');
      return;
    }
    if (userExists(signupEmail)) {
      setSignupEmailError('This email is already registered. Please login.');
      return;
    }
    if (!signupPassword) {
      setSignupPasswordError('Password is required');
      return;
    }
    if (signupPassword.length < 6) {
      setSignupPasswordError('Password must be at least 6 characters');
      return;
    }
    if (!signupConfirmPassword) {
      setSignupConfirmError('Please confirm your password');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupConfirmError('Passwords do not match');
      return;
    }

    // Save user
    saveUser(signupEmail, signupPassword);
    
    // Success message
    setSignupSuccess('Account created successfully! You can now login.');
    
    // Clear form
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setSignupPasswordStrength('');
    
    // Auto-switch to login panel after 2 seconds
    setTimeout(() => {
      setActivePanel('login');
    }, 2000);
  };

  // LOGIN HANDLERS
  const handleLoginEmailChange = (e) => {
    const value = e.target.value;
    setLoginEmail(value);
    setLoginError('');
    setLoginSuccess('');
    if (value && !validateEmail(value)) {
      setLoginEmailError('Please enter a valid email address');
    } else {
      setLoginEmailError('');
    }
  };

  const handleLoginPasswordChange = (e) => {
    const value = e.target.value;
    setLoginPassword(value);
    setLoginError('');
    setLoginSuccess('');
    
    if (value && value.length < 6) {
      setLoginPasswordError('Password must be at least 6 characters');
    } else {
      setLoginPasswordError('');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Reset messages
    setLoginError('');
    setLoginSuccess('');
    
    // Validation
    if (!loginEmail) {
      setLoginEmailError('Email is required');
      return;
    }
    if (!validateEmail(loginEmail)) {
      setLoginEmailError('Please enter a valid email address');
      return;
    }
    if (!loginPassword) {
      setLoginPasswordError('Password is required');
      return;
    }
    if (loginPassword.length < 6) {
      setLoginPasswordError('Password must be at least 6 characters');
      return;
    }

    // Check if user is registered
    if (!userExists(loginEmail)) {
      setLoginError('No account found with this email. Please sign up first.');
      return;
    }

    // Validate credentials
    const user = validateLogin(loginEmail, loginPassword);
    if (!user) {
      setLoginError('Incorrect password. Please try again.');
      return;
    }

    // Success
    setLoginSuccess(`Welcome back! Login successful.`);
    
    // Here you would typically redirect to dashboard or home
    setTimeout(() => {
      alert(`Login successful!\nEmail: ${loginEmail}`);
      navigate('/Events'); // Redirect to home
    }, 1000);
  };

  // Social Login Handlers
  const handleGoogleAuth = (type) => {
    alert(`${type === 'signup' ? 'Sign Up' : 'Login'} with Google - Integration would go here`);
  };

  const handleFacebookAuth = (type) => {
    alert(`${type === 'signup' ? 'Sign Up' : 'Login'} with Facebook - Integration would go here`);
  };

  // Back button handler
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div 
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(109deg, #A799FF -1.2%, #251053 96.86%)' }}
    >
      {/* Main Container - Responsive with proper scaling */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-6 lg:p-8">
        
        {/* Inner wrapper - NO GAPS between panels */}
        <div className="relative flex items-stretch h-full max-h-[95vh] w-full max-w-[95vw]">
          
          {/* LEFT PANEL - SIGN UP */}
          <div 
            className={`relative flex-shrink-0 rounded-[19px] overflow-hidden ${
              activePanel === 'signup' ? 'flex' : 'hidden lg:flex'
            }`}
            style={{ 
              background: 'linear-gradient(149deg, #212636 0%, #0E1120 34.75%)',
              width: 'clamp(260px, 20vw, 378px)',
              minHeight: '100%'
            }}
          >
            {/* Planet Image */}
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a6317cb54e660d4cd01360465d522606fff6c1e5?width=769"
              alt="Space Planet"
              className="absolute pointer-events-none opacity-90"
              style={{
                width: 'clamp(300px, 100%, 385px)',
                height: 'auto',
                left: '-2px',
                top: '8px',
                maxWidth: 'none'
              }}
            />
            
            {/* Top Right - TO CREATE AN ACCOUNT Text */}
            <div className="absolute top-2 right-2 px-4 py-3 z-10">
              <button 
                onClick={() => setActivePanel('login')}
                className="font-poppins text-[10px] lg:text-[10px] font-bold tracking-[0.113px] text-right hover:opacity-80 transition-opacity"
              >
                <span className="text-[#667592]">TO CREATE AN ACCOUNT? </span>
                <span className="text-white">SIGN UP</span>
              </button>
            </div>

            {/* Main Form Content - No scroll, all content visible */}
            <div className="relative w-full h-full flex items-center justify-center px-4 pt-20 pb-4 z-10">
              <form onSubmit={handleSignupSubmit} className="w-full max-w-[90%] flex flex-col justify-between" style={{ minHeight: '85%' }}>
                <div className="flex flex-col gap-3">
                  {/* Header - Shifted down with more space from top text */}
                  <div className="mb-0.5 mt-12">
                    <h1 className="font-poppins text-[40px] lg:text-[50px] xl:text-[30px] font-bold tracking-[3.684px] text-white leading-none mb-2 mt-25">
                      SIGN UP
                    </h1>
                    <p className="font-poppins text-[10px] lg:text-[9px] font-semibold tracking-[0.453px] text-white">
                      Sign In with email address
                    </p>
                  </div>

                  {/* Email Input */}
                  <div className="mb-0.01">
                    <div 
                      className="flex items-center px-2.5 py-2.5 rounded-[7.558px] bg-[#0D0F1C]" 
                      style={{ boxShadow: '0 3.023px 3.023px 0 rgba(0, 0, 0, 0.25) inset' }}
                    >
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={handleSignupEmailChange}
                        placeholder="Umesh.design@gmail.com"
                        className="w-full bg-transparent font-poppins text-[10px] lg:text-[9px] font-semibold tracking-[0.453px] text-white outline-none placeholder:text-[#51617A]"
                      />
                    </div>
                    {signupEmailError && (
                      <p className="mt-1 text-[9px] lg:text-[10px] font-poppins font-semibold text-red-400">
                        {signupEmailError}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="mb-0.01">
                    <div 
                      className="flex items-center px-2.5 py-2.5 rounded-[7.558px] bg-[#0D0F1C]" 
                      style={{ boxShadow: '0 3.023px 3.023px 0 rgba(0, 0, 0, 0.25) inset' }}
                    >
                      <input
                        type="password"
                        value={signupPassword}
                        onChange={handleSignupPasswordChange}
                        placeholder="create your password"
                        className="w-full bg-transparent font-poppins text-[10px] lg:text-[9px] font-semibold tracking-[0.453px] text-white outline-none placeholder:text-[#51617A]"
                      />
                    </div>
                    {signupPasswordError && (
                      <p className="mt-1 text-[9px] lg:text-[10px] font-poppins font-semibold text-red-400">
                        {signupPasswordError}
                      </p>
                    )}
                    {signupPasswordStrength && !signupPasswordError && (
                      <div className="mt-1.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-[#171E32] rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-300"
                              style={{ 
                                width: signupPasswordStrength === 'weak' ? '33%' : signupPasswordStrength === 'medium' ? '66%' : '100%',
                                backgroundColor: getStrengthColor(signupPasswordStrength)
                              }}
                            ></div>
                          </div>
                          <span 
                            className="text-[9px] lg:text-[10px] font-poppins font-bold"
                            style={{ color: getStrengthColor(signupPasswordStrength) }}
                          >
                            {getStrengthText(signupPasswordStrength)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div className="mb-0.01">
                    <div 
                      className="flex items-center px-2.5 py-2.5 rounded-[7.558px] bg-[#0D0F1C]" 
                      style={{ boxShadow: '0 3.023px 3.023px 0 rgba(0, 0, 0, 0.25) inset' }}
                    >
                      <input
                        type="password"
                        value={signupConfirmPassword}
                        onChange={handleSignupConfirmPasswordChange}
                        placeholder="confirm your password"
                        className="w-full bg-transparent font-poppins text-[10px] lg:text-[9px] font-semibold tracking-[0.453px] text-white outline-none placeholder:text-[#51617A]"
                      />
                    </div>
                    {signupConfirmError && (
                      <p className="mt-1 text-[9px] lg:text-[10px] font-poppins font-semibold text-red-400">
                        {signupConfirmError}
                      </p>
                    )}
                    {signupSuccess && (
                      <p className="mt-1 text-[9px] lg:text-[10px] font-poppins font-semibold text-green-400">
                        {signupSuccess}
                      </p>
                    )}
                  </div>
                  
                  {/* Continue Button */}
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center py-2.5 lg:py-1.5 rounded-[7.558px] border-[1.512px] border-[#81B0F6] transition-transform hover:scale-105 cursor-pointer mb-0" 
                    style={{ background: 'radial-gradient(75.58% 72.88% at 50.5% 0%, #6796FC 0%, #1C57F1 100%)' }}
                  >
                    <span className="font-red-rose text-[10px] lg:text-[11.336px] font-bold text-white">
                      CONTINUE
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-[#171E32] my-0"></div>
                  
                  {/* Or continue with */}
                  <p className="font-red-rose text-[11px] lg:text-[11px] font-bold text-white mb-0">
                    Or  continue with open  account
                  </p>
                  
                  {/* Social Buttons */}
                  <div className="flex gap-2 mb-0">
                    <button 
                      type="button"
                      onClick={() => handleGoogleAuth('signup')}
                      className="flex-1 flex items-center justify-center py-0.5 lg:py-1 rounded-[7.558px] bg-[#252B4D] transition-transform hover:scale-105 cursor-pointer"
                    >
                      <span className="font-inter text-[9px] lg:text-[10.581px] font-bold text-white">
                        GOOGLE
                      </span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleFacebookAuth('signup')}
                      className="flex-1 flex items-center justify-center py-2 lg:py-2.5 rounded-[7.558px] bg-[#252B4D] transition-transform hover:scale-105 cursor-pointer"
                    >
                      <span className="font-inter text-[9px] lg:text-[10.581px] font-bold text-white">
                        FACEBOOK
                      </span>
                    </button>
                  </div>
                  
                  {/* Terms & Conditions */}
                  <p className="font-inter text-[9px] lg:text-[9px] font-bold">
                    <span className="text-[#58697D]">By registering you agree with our </span>
                    <span className="text-[#3366F3] cursor-pointer hover:underline">Terms & Conditions</span>
                  </p>
                </div>
                
                {/* Copyright */}
                <div className="flex items-center justify-center pt-3 mt-0">
                  <span className="font-inter text-[9px] lg:text-[8px] font-extrabold text-[#63728F]">
                    COPYRIGHT (C) 2026 ONFLOW DESIGN
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* CENTER - COSMOS BACKGROUND IMAGE */}
          <div
            className="hidden lg:block relative flex-1 overflow-hidden relative h-[602px] "
            style={{ 
              minHeight: '100%',
              boxShadow: '0 15.115px 26.451px 0 rgba(0, 0, 0, 0)'
            }}
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/befac4d565db86b57302b66fd8c32e2e2cf7f315?width=2618"
              alt="Welcome to the cosmos"
              className="absolute inset-1 w-full h-full object-cover object-[-10%] object-contain scale-110 rounded-m"

            />

            {/* Make the existing back button in image functional with clickable overlay */}
            <button
              onClick={handleBack}
              className="absolute bottom-[6%] left-[4%] w-[120px] h-[50px] cursor-pointer z-20 hover:opacity-80 transition-opacity"
              aria-label="Back to home"
              style={{ background: 'transparent' }}
            >
              {/* Invisible clickable area over the back button in the image */}
            </button>
          </div>

          {/* RIGHT PANEL - LOGIN (Adjacent to cosmos, NO GAP) */}
          <div 
            className={`relative flex-shrink-0 rounded-r-[19px] overflow-hidden ${
              activePanel === 'login' ? 'flex' : 'hidden lg:flex'
            }`}
            style={{ 
              background: 'linear-gradient(149deg, #212636 0%, #0E1120 34.75%)',
              width: 'clamp(320px, 24vw, 455px)',
              minHeight: '100%'
            }}
          >
            {/* Top Right - Don't Have Account */}
            <div className="absolute top-2 right-2 px-4 py-3 z-10">
              <button 
                onClick={() => setActivePanel('signup')}
                className="font-poppins text-[10px] lg:text-[11.336px] font-bold tracking-[0.113px] text-right hover:opacity-80 transition-opacity"
              >
                <span className="text-[#667592]">DON'T HAVE AN ACCOUNT? </span>
                <span className="text-white">Sign Up</span>
              </button>
            </div>

            {/* Main Login Form - No scroll, all content visible */}
            <div className="relative w-full h-full flex items-center justify-center px-4 pt-16 pb-4">
              <form onSubmit={handleLoginSubmit} className="w-full max-w-[90%] flex flex-col justify-between" style={{ minHeight: '75%' }}>
                <div className="flex flex-col gap-3">
                  {/* LOG IN Title */}
                  <h1 className="font-poppins text-[40px] lg:text-[50px] xl:text-[56.681px] font-bold tracking-[3.684px] text-white leading-none mb-3">
                    LOG IN
                  </h1>

                  {/* Email Input */}
                  <div className="mb-2">
                    <div 
                      className="flex items-center px-2.5 py-2.5 rounded-[7.558px] bg-[#0D0F1C]" 
                      style={{ boxShadow: '0 3.023px 3.023px 0 rgba(0, 0, 0, 0.25) inset' }}
                    >
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={handleLoginEmailChange}
                        placeholder="enter your email address"
                        className="w-full bg-transparent font-poppins text-[10px] lg:text-[11.336px] font-semibold tracking-[0.453px] text-white outline-none placeholder:text-[#51617A]"
                      />
                    </div>
                    {loginEmailError && (
                      <p className="mt-1 text-[9px] lg:text-[10px] font-poppins font-semibold text-red-400">
                        {loginEmailError}
                      </p>
                    )}
                  </div>

                  {/* Password Input - NO STRENGTH INDICATOR */}
                  <div className="mb-2">
                    <div 
                      className="flex items-center px-2.5 py-2.5 rounded-[7.558px] bg-[#0D0F1C]" 
                      style={{ boxShadow: '0 3.023px 3.023px 0 rgba(0, 0, 0, 0.25) inset' }}
                    >
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={handleLoginPasswordChange}
                        placeholder="enter your  password"
                        className="w-full bg-transparent font-poppins text-[10px] lg:text-[11.336px] font-semibold tracking-[0.453px] text-white outline-none placeholder:text-[#51617A]"
                      />
                    </div>
                    {loginPasswordError && (
                      <p className="mt-1 text-[9px] lg:text-[10px] font-poppins font-semibold text-red-400">
                        {loginPasswordError}
                      </p>
                    )}
                    {loginError && (
                      <p className="mt-1 text-[9px] lg:text-[10px] font-poppins font-semibold text-red-400">
                        {loginError}
                      </p>
                    )}
                    {loginSuccess && (
                      <p className="mt-1 text-[9px] lg:text-[10px] font-poppins font-semibold text-green-400">
                        {loginSuccess}
                      </p>
                    )}
                  </div>
                  
                  {/* Continue Button */}
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center py-2.5 lg:py-3 rounded-[7.558px] border-[1.512px] border-[#81B0F6] transition-transform hover:scale-105 cursor-pointer mb-3" 
                    style={{ background: 'radial-gradient(75.58% 72.88% at 50.5% 0%, #6796FC 0%, #1C57F1 100%)' }}
                  >
                    <span className="font-red-rose text-[10px] lg:text-[11.336px] font-bold text-white">
                      CONTINUE
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="w-full h-[1.512px] bg-[#171E32] my-2"></div>

                  {/* Or continue with */}
                  <p className="font-red-rose text-[11px] lg:text-[12.092px] font-bold text-white mb-2">
                    Or  continue with open  acoount
                  </p>
                  
                  {/* Social Buttons */}
                  <div className="flex gap-2 mb-2">
                    <button 
                      type="button"
                      onClick={() => handleGoogleAuth('login')}
                      className="flex-1 flex items-center justify-center py-2 lg:py-2.5 rounded-[7.558px] bg-[#252B4D] transition-transform hover:scale-105 cursor-pointer"
                    >
                      <span className="font-inter text-[9px] lg:text-[10.581px] font-bold text-white">
                        GOOGLE
                      </span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleFacebookAuth('login')}
                      className="flex-1 flex items-center justify-center py-2 lg:py-2.5 rounded-[7.558px] bg-[#252B4D] transition-transform hover:scale-105 cursor-pointer"
                    >
                      <span className="font-inter text-[9px] lg:text-[10.581px] font-bold text-white">
                        FACEBOOK
                      </span>
                    </button>
                  </div>

                  {/* Terms & Conditions */}
                  <p className="font-inter text-[9px] lg:text-[10.581px] font-bold">
                    <span className="text-[#58697D]">By registering you agree with our </span>
                    <span className="text-[#3366F3] cursor-pointer hover:underline">Terms & Conditions</span>
                  </p>
                </div>

                {/* Copyright */}
                <div className="flex items-center justify-center pt-3 mt-2">
                  <span className="font-inter text-[9px] lg:text-[10.581px] font-bold text-[#63728F]">
                    © Small Bytes 2025-2026
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Panel Toggle (Only visible on mobile) */}
      <div className="lg:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 bg-[#0E1120] rounded-full px-6 py-3 shadow-lg z-50">
        <button
          onClick={() => setActivePanel('signup')}
          className={`px-6 py-2 rounded-full font-poppins text-[11px] font-bold transition-all ${
            activePanel === 'signup' 
              ? 'bg-gradient-to-r from-[#6796FC] to-[#1C57F1] text-white' 
              : 'text-[#667592] hover:text-white'
          }`}
        >
          SIGN UP
        </button>
        <button
          onClick={() => setActivePanel('login')}
          className={`px-6 py-2 rounded-full font-poppins text-[11px] font-bold transition-all ${
            activePanel === 'login' 
              ? 'bg-gradient-to-r from-[#6796FC] to-[#1C57F1] text-white' 
              : 'text-[#667592] hover:text-white'
          }`}
        >
          LOG IN
        </button>
      </div>
    </div>
  );
}
