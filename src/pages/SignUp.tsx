import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurIn from "@/components/magicui/blur-in";
import { createUserAccount, isUsernameUnique } from "@/api/apiUtils";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const debounceUsername = useDebounceCallback(setUsername, 500);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const checkUniqueUsername = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const { message } = await isUsernameUnique(username);
          setUsernameMessage(message);
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUniqueUsername();
  }, [username]);

  const submit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const { success, message } = await createUserAccount(data);
      toast({
        title: "Sign Up",
        description: message,
      });
      if (success) {
        navigate(`/auth/verify/${username}`, { replace: true });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-black bg-opacity-40 backdrop-blur-md  p-8 max-w-xs md:max-w-[470px] w-full  rounded-lg border  border-gray-600 ">
        <div className="text-center">
          <BlurIn
            duration={0.3}
            word="Numeron Arena"
            className="md:hidden  block bg-clip-text ltext-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20  font-bold pb-2 pointer-events-none text-center"
          />
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl mb-2 hidden md:block">
            Ready for a 1v1?
          </h1>
          <p className="">
            Sign up today and relive childhood head-tail cricket memories with Numeron Arena!
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-6 mt-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-transparent border-gray-500"
                      placeholder="Username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounceUsername(e.target.value);
                      }}
                    />
                  </FormControl>
                  <div className="">
                    {isCheckingUsername && <Loader2 className="h-4 w-4 animate-spin" />}
                    {!isCheckingUsername && usernameMessage && username && (
                      <span
                        className={`text-sm ${
                          usernameMessage === "Username is unique"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {usernameMessage}
                      </span>
                    )}
                  </div>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-transparent border-gray-500"
                      placeholder="Full Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-transparent border-gray-500"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-transparent border-gray-500"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </>
              ) : (
                "SIGN UP"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-5">
          <p>
            Already a member?{" "}
            <Link to="/auth/signin" className="text-blue-700/80 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
