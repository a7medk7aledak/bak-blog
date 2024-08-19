import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { OAuth } from "../components/OAuth";

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-semibold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-purple-900 via-blue-800 to-slate-700 rounded-lg text-white">
              BAK
            </span>
            -Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome To BAK-Blog. You can sign up with your email and password or
            with Google.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="************"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              sign in
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>dont Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
