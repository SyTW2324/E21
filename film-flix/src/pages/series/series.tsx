import Navbar from "src/components/navbar"
import Footer from "src/components/footer"
import { Link } from "react-router-dom";

export default function Series() {
   
return (
    <>
    <div className="bg-gray-900">
        <Navbar/>
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            <button 
                type="button" 
                className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2 
                            border border-blue-900 text-blue-500 hover:text-white hover:bg-blue-500 bg-gray-900 focus:ring-blue-800">
                All genres
            </button>
            <button 
                type="button" 
                className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                            border border-gray-900 bg-gray-900 hover:border-gray-700 text-white focus:ring-gray-800">
                Action
            </button>
            <button 
                type="button" 
                className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                            border border-gray-900 bg-gray-900 hover:border-gray-700 text-white focus:ring-gray-800">
                Comedy
            </button>
            <button 
                type="button" 
                className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                            border border-gray-900 bg-gray-900 hover:border-gray-700 text-white focus:ring-gray-800">
                Fantasy
            </button>
            <button 
                type="button" 
                className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                            border border-gray-900 bg-gray-900 hover:border-gray-700 text-white focus:ring-gray-800">
                Horror
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4">
            <Link to="/movie-info">
                <div>
                    <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""/>
                </div>
            </Link>
            <div>
                <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt=""/>
            </div>
        </div>
        <Footer />
    </div>
    </>
)}