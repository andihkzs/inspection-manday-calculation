/**
 * PasswordLogin.tsx - Simple password authentication component
 * Exports: PasswordLogin component
 * Side effects: updates session storage on successful login
 */

import { useState } from 'react';
import { Lock, QrCode, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface PasswordLoginProps {
  onLogin: (isAdmin: boolean) => void;
}

const ADMIN_PASSWORD = 'ms2024';
const USER_PASSWORD = 'cei2024';

export function PasswordLogin({ onLogin }: PasswordLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userRole', 'admin');
      onLogin(true);
    } else if (password === USER_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userRole', 'user');
      onLogin(false);
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-3 rounded-full">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
          Mega Step Inspection Time Calc
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter password to access the calculator
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter password"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setShowQR(!showQR)}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors py-2"
          >
            <QrCode className="w-5 h-5" />
            <span className="text-sm font-medium">
              {showQR ? 'Hide QR Code' : 'Show QR Code for Mobile Access'}
            </span>
          </button>

          {showQR && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <QRCodeSVG
                    value="https://mscalcapp.bolt.host/"
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-600 text-center">
                Scan this QR code with your mobile device to access the calculator
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
