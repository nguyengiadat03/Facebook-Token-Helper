import React, { useState } from 'react';
import { FB_TOKEN_SCRIPT } from './constants';
import { ClipboardIcon } from './components/ClipboardIcon';
import { CheckIcon } from './components/CheckIcon';
import { InstructionStep } from './components/InstructionStep';
import { InfoIcon } from './components/InfoIcon';

const App: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [loginInitiated, setLoginInitiated] = useState(false);
  const [isDatPraise, setIsDatPraise] = useState(false); // New state for praise button

  const handleCopy = () => {
    if (!isDatPraise) {
      alert("Bạn phải khen 'Anh Đạt Đẹp Zai' trước khi được copy script nhé!");
      return;
    }
    navigator.clipboard.writeText(FB_TOKEN_SCRIPT.trim());
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleLoginClick = () => {
    window.open('https://www.facebook.com', '_blank', 'noopener,noreferrer');
    setLoginInitiated(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700 transition-all duration-500">
        
        <div className="logo-container">
            <img src="/assets/dat_logo.jpg" alt="Anh Đạt Đẹp Zai Logo" className="logo-image" />
            <h1 className="text-4xl font-extrabold text-red-500 mt-4">
                Dự Án Của Anh Đạt Đẹp Zai
            </h1>
            <p className="text-gray-400 mt-2 text-xl italic">
                Công cụ lấy Token Facebook - Phiên bản "Đẹp Zai"
            </p>
        </div>
        
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-400">Hướng Dẫn Lấy Token Thần Tốc</h2>
            <p className="text-gray-400 mt-2">
                Chỉ cần làm theo 3 bước đơn giản, nhanh hơn cả tốc độ "thả tim" của crush!
            </p>
        </div>

        {!loginInitiated ? (
            <div className="space-y-6">
                <div className="text-center">
                    <InstructionStep
                        stepNumber={1}
                        text={<>Click the button below to open Facebook in a new tab. Please log in if you haven't already.</>}
                    />
                    <button
                        onClick={handleLoginClick}
                        className="mt-4 humorous-button font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out text-lg w-full transform hover:scale-1.05"
                    >
                        Login to Facebook
                    </button>
                </div>
                 <div className="mt-8 text-left text-sm text-gray-400 p-5 bg-gray-900 rounded-lg border border-gray-700">
                    <h3 className="font-bold text-gray-300 mb-2 text-base flex items-center">
                        Why is this necessary?
                    </h3>
                    <p className="text-gray-400">
                        To generate a token, a script needs to run in the context of your logged-in Facebook session. Modern browser security policies (CORS) prevent us from doing this automatically. The safest method is for you to manually run the script in your own browser console, ensuring your credentials are never shared.
                    </p>
                </div>
            </div>
        ) : (
            <>
                <div className="space-y-6">
                    <div className="p-4 bg-green-900/50 border border-green-700 rounded-lg text-center">
                        <p className="font-semibold text-green-300">Great! Now that Facebook is open, follow the steps below in the Facebook tab.</p>
                    </div>
                    <InstructionStep
                        stepNumber={2}
                        text="Mở Console bằng cách nhấn F12 hoặc (Ctrl+Shift+I trên Windows/Linux, Cmd+Opt+I trên Mac)."
                    />
                    <InstructionStep
                        stepNumber={3}
                        text="Nhấn nút 'Copy Script' bên dưới để sao chép mã tạo token."
                    />
                    <InstructionStep
                        stepNumber={4}
                        text="Dán script vào Console, nhấn Enter, và làm theo hướng dẫn trên màn hình."
                    />
                </div>
                
                <div className={`mt-8 relative script-area ${isDatPraise ? 'unlocked' : ''}`}>
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 max-h-64 overflow-auto">
                        <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                            <code>{FB_TOKEN_SCRIPT.trim()}</code>
                        </pre>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                        aria-label="Copy script to clipboard"
                        disabled={!isDatPraise}
                    >
                        {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
                        <span className="text-sm">{isCopied ? 'Copied!' : 'Copy Script'}</span>
                    </button>
                    {!isDatPraise && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90 rounded-lg">
                            <p className="text-xl font-bold text-red-400 animate-pulse">
                                Script đang bị khóa!
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setIsDatPraise(true)}
                        className="praise-button"
                        disabled={isDatPraise}
                    >
                        {isDatPraise ? '✅ Anh Đạt Đẹp Zai (Đã Khen)' : '🌟 Nhấn vào đây để khen: "Anh Đạt Đẹp Zai"'}
                    </button>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="text-left text-sm text-gray-400 p-5 bg-gray-900 rounded-lg border border-yellow-600/50 h-full flex flex-col">
                       <h3 className="font-bold text-yellow-400 mb-3 text-base flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            Important Instructions & Notes
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>100% Secure:</strong> This script runs entirely within your browser. No data is sent to us or any third party.</li>
                            <li><strong>Technical Reason:</strong> Browser security policies (CORS) prevent this website from directly accessing Facebook's data. Running the script in the console is the only secure way.</li>
                            <li><strong>What is a Token?</strong> This token acts like a temporary key for applications. Protect it like a password and do not share it with anyone you don't trust.</li>
                        </ul>
                   </div>

                   <div className="text-left text-sm text-gray-400 p-5 bg-gray-900 rounded-lg border border-blue-600/50 h-full flex flex-col">
                       <h3 className="font-bold text-blue-300 mb-3 text-base flex items-center">
                            <InfoIcon />
                            How to Use Your Access Token
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>Paste the token into the application or tool that requires it.</li>
                            <li>This token can be used for developers testing apps, social media management tools, or data analysis scripts.</li>
                            <li>Remember, the token grants access to parts of your Facebook account. If you suspect it has been compromised, you should log out of all sessions in your Facebook security settings.</li>
                        </ul>
                   </div>
               </div>
            </>
        )}
      </div>
    </div>
  );
};

export default App;
