import { verifyEmailCode } from "@/api/apiUtils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { setStatus } from "@/store/AuthSlice";
import { useTypedDispatch } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounceCallback } from "usehooks-ts";

const VerifyEmail = () => {
  const { username } = useParams<{ username: string }>();
  const safeUsername = username || "";
  const [code, setCode] = useState("");
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const debounceCode = useDebounceCallback(setCode, 700);

  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    console.log("Verify email useEffect");
    const checkCodeIsCorrect = async () => {
      setIsCheckingCode(true);
      try {
        const { success, message } = await verifyEmailCode({
          username: safeUsername,
          verificationCode: code,
        });
        toast({
          title: "Success",
          description: message,
        });
        if (success) {
          dispatch(setStatus(true));
          navigate("/", { replace: true });
        }
      } finally {
        setIsCheckingCode(false);
      }
    };
    if (code.length == 6) {
      checkCodeIsCorrect();
    }
  }, [code, navigate, safeUsername, toast]);

  return (
    <div className="flex items-center justify-center  min-h-screen ">
      <>{console.log("Verify email div")}</>
      <div className="flex items-center justify-center  bg-black bg-opacity-40 backdrop-blur-md  p-8 max-w-xs md:max-w-[430px] w-full  rounded-lg border  border-gray-500 ">
        <div className="ml-8 pace-y-2">
          <InputOTP maxLength={6} onChange={(value) => debounceCode(value)}>
            <InputOTPGroup>
              <InputOTPSlot className="border  border-gray-500" index={0} />
              <InputOTPSlot className="border  border-gray-500" index={1} />
              <InputOTPSlot className="border  border-gray-500" index={2} />
              <InputOTPSlot className="border  border-gray-500" index={3} />
              <InputOTPSlot className="border  border-gray-500" index={4} />
              <InputOTPSlot className="border  border-gray-500" index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm -ml-2 mt-2 ">
            Enter the 6-digit code sent to your email.
          </div>
        </div>
        <div className="text-center text-sm px-2  -mt-6">
          {isCheckingCode ? (
            <>
              <Loader2 size={25} className=" animate-spin" />
            </>
          ) : (
            <div className="w-5 "></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
