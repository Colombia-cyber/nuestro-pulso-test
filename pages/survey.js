import Head from 'next/head';
import Link from 'next/link';
import StickyNavBar from '../components/StickyNavBar';

export default function Survey() {
  return (
    <>
      <Head>
        <title>Survey - Nuestro Pulso</title>
        <meta name="description" content="Share your opinion through civic surveys" />
      </Head>
      
      <main className="min-h-screen bg-gray-50 font-inter">
        <StickyNavBar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Survey Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Coming Soon - Share your opinions through civic surveys
            </p>
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}