import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

function App() {
  const [pass, setPass] = useState("Pa$$w0rd")
  const [passLength, setPassLength] = useState(8)
  const [incNumbers, setIncNumbers] = useState(false)
  const [incSymbols, setIncSymbols] = useState(false)

  const generatePassword = useCallback(() => {
    console.log("Generating password...");
    // Character sets
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz"
    const numberChars = "0123456789"
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?/`~"

    let charSet = upperCaseChars + lowerCaseChars
    if (incNumbers) charSet += numberChars
    if (incSymbols) charSet += symbolChars

    let password = ""
    for (let i = 0; i < passLength; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length)
      password += charSet[randomIndex]
    }

    setPass(password)
  }, [passLength, incNumbers, incSymbols, setPass]);

  useEffect(() => {
    generatePassword();
  }, [passLength, incNumbers, incSymbols, generatePassword]);

  const passRef = useRef(null);
  const copyBtnRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyPasswordToClipBoard = useCallback(() => {
    console.log("Password copied to clipboard!");
    if(passRef.current){
      passRef.current?.select();
      window.navigator.clipboard.writeText(pass);
      setCopied(true);
      copyBtnRef.current.innerText = "Copied!";
      copyBtnRef.current.classList.add("bg-gray-600");
      copyBtnRef.current.classList.add("hover:bg-gray-600");

      // revert after 2 seconds
      setTimeout(() => {
        setCopied(false);
        copyBtnRef.current.innerText = "Copy";
        copyBtnRef.current.classList.remove("bg-gray-600");
        copyBtnRef.current.classList.remove("hover:bg-gray-600");
      }, 2000);
    }
  }, [pass]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            🔑 Extensive Password Generator
          </h1>

          {/* <!-- Generated Password Display --> */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              id="passwordOutput"
              readOnly
              value={pass}
              ref={passRef}
              className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
              placeholder="Your secure password will appear here"
            />
            <button
              id="copyBtn"
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition duration-200"
              onClick={copyPasswordToClipBoard}
              ref={copyBtnRef}
              disabled={copied}
            >
              { copied ? "Copied!" : "Copy" }
            </button>
          </div>

          {/* <!-- Password Length --> */}
          <div className="mb-4">
            <label htmlFor="length" className="block text-gray-700 font-medium mb-1">
              Password Length: <span id="lengthValue" className="font-bold">{passLength}</span>
            </label>
            <input
              type="range"
              id="length"
              min="8"
              max="64"
              value={passLength}
              onChange={(e) => setPassLength(e.target.value)}
              className="w-full accent-blue-600"
            />
          </div>

          {/* <!-- Character Options --> */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" id="includeNumbers" className="accent-blue-600" checked={incNumbers} onChange={() => { setIncNumbers(!incNumbers); }} />
              <span className="text-gray-700">Include Numbers</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="checkbox" id="includeSymbols" className="accent-blue-600" checked={incSymbols} onChange={() => { setIncSymbols(!incSymbols) }}/>
              <span className="text-gray-700">Include Symbols</span>
            </label>

            {/* <label className="flex items-center space-x-2">
              <input type="checkbox" id="avoidSimilar" className="accent-blue-600" />
              <span className="text-gray-700">Avoid Similar Characters</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="checkbox" id="includeSpaces" className="accent-blue-600" />
              <span className="text-gray-700">Allow Spaces</span>
            </label> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
