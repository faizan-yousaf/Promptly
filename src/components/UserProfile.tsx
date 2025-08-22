'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';

interface UserProfileProps {
  className?: string;
}

export default function UserProfile({ className = '' }: UserProfileProps) {
  const { user, isLoaded } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-full flex items-center justify-center">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName || 'User'}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-4 h-4 text-black" />
          )}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-white">
            {user.fullName || user.emailAddresses[0]?.emailAddress}
          </p>
          <p className="text-xs text-gray-400">
            {user.emailAddresses[0]?.emailAddress}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-sm font-medium text-white">
                {user.fullName || 'User'}
              </p>
              <p className="text-xs text-gray-400">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
            
            <div className="py-1">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
              
              <SignOutButton>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
