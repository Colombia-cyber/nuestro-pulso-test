import Head from 'next/head';
import Link from 'next/link';
import StickyNavBar from '../components/StickyNavBar';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In - Nuestro Pulso</title>
        <meta name="description" content="Sign in to your Nuestro Pulso account" />
      </Head>
      
      <main className="min-h-screen bg-gray-50 font-inter">
        <StickyNavBar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Sign In
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Coming Soon - Authentication system in development
            </p>
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}