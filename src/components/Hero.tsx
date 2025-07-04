import { Book, BookOpen, Clock, Users } from 'lucide-react'

export default function Hero({bookCount}:any) {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                            <Book className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Welcome to Your
                        <span className="mb-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                            {" "} Digital Library
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Discover, manage, and explore thousands of books. Your gateway to knowledge and adventure awaits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/90">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <span>1,000+ Active Readers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            <span>{bookCount || 0} Books Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span>24/7 Access</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
