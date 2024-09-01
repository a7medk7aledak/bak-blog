export const About = () => {
  return (
    <div className="flex justify-center mt-28">
      <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              About <span className="text-indigo-600">BAK-TECH</span>
            </h2>
            <p className="text-gray-700">
              We are a leading provider of comprehensive digital solutions,
              specializing in front-end development, back-end development, and
              machine learning services. Our mission is to empower businesses by
              transforming their digital presence and optimizing their
              operations through cutting-edge technology.
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
