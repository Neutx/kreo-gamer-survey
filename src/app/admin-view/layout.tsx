'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

const ALLOWED_EMAILS = ['dlprwz@gmail.com', 'ishan@kreo-tech.com', 'admin@kreo-tech.com'];
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<typeof auth.currentUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      
      if (currentUser && ALLOWED_EMAILS.includes(currentUser.email || '')) {
        setUser(currentUser);
      } else if (pathname !== '/admin-view/login') {
        router.push('/admin-view/login');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/admin-view/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if Firebase signout fails, still redirect
      router.push('/admin-view/login');
    }
  };

  // Show only the children for the login page
  if (pathname === '/admin-view/login') {
    return <>{children}</>;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // If not authenticated and not on login page, the useEffect will redirect
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-purple-500">Kreo Admin</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link 
                    href="/admin-view/dashboard" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/admin-view/dashboard' 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Responses
                  </Link>
                  <Link 
                    href="/admin-view/analytics" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/admin-view/analytics' 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Analytics
                  </Link>
                  <Link 
                    href="/" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    View Survey
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-300">
                    {user?.email}
                  </div>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline" 
                    className="text-sm text-gray-300 border-gray-600 hover:bg-gray-700"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/admin-view/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/admin-view/dashboard'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Responses
            </Link>
            <Link
              href="/admin-view/analytics"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/admin-view/analytics'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Analytics
            </Link>
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              View Survey
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Admin User
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 