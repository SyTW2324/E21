import Footer from "src/components/footer"
import Navbar from "src/components/navbar"

export default function MovieInfo() {
    return (
        <>
            <Navbar/>
            <div className="bg-gray-900">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <img className="h-80 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""/>
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-white text-4xl font-bold">Movie Title</h1>
                                <h2 className="text-white text-2xl font-bold">Movie Genre</h2>
                                <h2 className="text-white text-2xl font-bold">Movie Release Date</h2>
                                <h2 className="text-white text-2xl font-bold">Movie Rating</h2>
                                <h2 className="text-white text-2xl font-bold">Movie Runtime</h2>
                                <h2 className="text-white text-2xl font-bold">Movie Plot</h2>
                                <h2 className="text-white text-2xl font-bold">Movie Cast</h2>
                                <h2 className="text-white text-2xl font-bold">Movie Director</h2>
                                <h2 className="text-white text-2xl font-bold">Movie Writer</h2>
                                <h2 className="text-white text-2xl font-bold">Movie Awards</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}