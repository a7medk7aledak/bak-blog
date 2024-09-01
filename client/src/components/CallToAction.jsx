import { Button } from "flowbite-react";

export const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about bak-tech?</h2>
        <p className="text-gray-500 my-2">work with us</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a href="https://bak-technology.web.app/" target="_blank" rel="">
            bak-tech
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1 ">
        <img src="../../public/Capture.JPG" className="rounded-md" />
      </div>
    </div>
  );
};
