'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Use form state with authenticate action
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  // Handle successful login redirect
  useEffect(() => {
    console.log('Error message changed:', errorMessage);
    
    if (errorMessage === 'SUCCESS') {
      console.log('✅ SUCCESS detected, starting redirect...');
      setIsRedirecting(true);
      
      // Small delay to show success message
      const timer = setTimeout(() => {
        console.log('Redirecting to:', callbackUrl);
        router.push(callbackUrl);
        router.refresh();
      }, 500); // 0.5 second delay
      
      return () => clearTimeout(timer);
    }
  }, [errorMessage, router, callbackUrl]);

  // Reset redirecting state when form resets
  const handleFormSubmit = async (formData: FormData) => {
    setIsRedirecting(false);
    return formAction(formData);
  };

  return (
    <form action={handleFormSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                defaultValue="user@nextmail.com"
                disabled={isRedirecting}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                defaultValue="123456"
                disabled={isRedirecting}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        
        <Button 
          className="mt-4 w-full relative"
          type="submit"
          disabled={isRedirecting}
        >
          <span className={`${isRedirecting ? 'opacity-0' : 'opacity-100'}`}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </span>
          
          {isRedirecting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Redirecting...</span>
              </div>
            </div>
          )}
        </Button>
        
        <div
          className="flex h-8 items-end space-x-1 min-h-[2rem]"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Error Messages */}
          {errorMessage && errorMessage !== 'SUCCESS' && (
            <div className="flex items-center space-x-1 animate-fade-in">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
          
          {/* Success Message */}
          {errorMessage === 'SUCCESS' && (
            <div className="flex items-center space-x-1 animate-fade-in">
              <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-green-600 font-medium">
                Login successful! Redirecting to dashboard...
              </p>
            </div>
          )}
          
          {/* Redirecting Message */}
          {isRedirecting && (
            <div className="flex items-center space-x-1">
              <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
              <p className="text-sm text-blue-600">
                Please wait, redirecting...
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}