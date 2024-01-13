export default function NotFound() {
  return (
    <>
      <section className="bg-gray-900 flex flex-col w-full h-screen">
        <div className="my-auto mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-sky-400">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-sky-400 md:text-4xl">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-300">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.
            </p>
            <a
              href="/"
              className="inline-flex text-white bg-sky-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
