

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
          Welcome to SXV Website
        </h1>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <a 
            href="/contactUs" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Contact Us
          </a>
          <a 
            href="/events" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Events
          </a>
          <a 
            href="/committees" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Committees
          </a>
          <a 
            href="/team" 
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Go to Team
          </a>
        </div>
      </div>
    </div>
  );
}
