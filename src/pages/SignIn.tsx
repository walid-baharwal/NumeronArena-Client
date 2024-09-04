import { useState } from "react";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurIn from "@/components/magicui/blur-in";
import { userLogin } from "@/api/apiUtils";
import { signInSchema } from "@/schemas/signInSchema";
import { IUsername } from "@/types/ApiResponse";
import { setStatus } from "@/store/AuthSlice";
import { useTypedDispatch } from "@/store/store";

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const submit = async (credentials: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const { success, message, statusCode, data } = await userLogin(credentials);
      toast({
        title: "Sign In",
        description: message,
      });
      if (success) {
        if (statusCode === 203 && data ) {
          const username = (data as IUsername).username;
          navigate(`/auth/verify/${username}`, { replace: true });
        }
        if (statusCode === 200) {
          dispatch(setStatus(true));
          navigate(`/`, { replace: true });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-black bg-opacity-40 backdrop-blur-md  p-8 max-w-xs md:max-w-[420px] w-full  rounded-lg border  border-gray-600 ">
        <div className="text-center">
          <BlurIn
            duration={0.3}
            word="Numeron Arena"
            className="md:hidden  block bg-clip-text ltext-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20  font-bold pb-2 pointer-events-none text-center"
          />
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl mb-2 hidden md:block">
            Welcome Back!
          </h1>
          <p className=""> Ready for a 1v1?</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-6 mt-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-transparent border-gray-500"
                      placeholder="Email or username"
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
            <Button className="w-full" type="submit" disabled={isSubmitting} >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </>
              ) : (
                "SIGN IN"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-5">
          <p>
            Already a member?{" "}
            <Link to="/auth/signup" className="text-blue-700/80 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
