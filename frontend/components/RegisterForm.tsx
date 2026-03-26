"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validation";
import { registerUser } from "@/lib/api/api_auth";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "buyer" }, 
  });

  const onSubmit = async (data: RegisterFormData) => {
    setFormError("");
    try {
      const res = await registerUser(data);
      if (res.userId) {
        router.push("/login");
      } else {
        setFormError(res.error || "Registration failed");
      }
    } catch (err) {
      setFormError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Register</h2>

        {/* Name Input */}
        <Input
          label="Name"
          placeholder="Enter your full name"
          {...register("name")}
          error={errors.name?.message}
          icon={<User size={18} />}
        />

        {/* Email Input */}
        <Input
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
          icon={<Mail size={18} />}
        />

        {/* Password Input with Lock + Eye */}
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium text-gray-300 dark:text-gray-200">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter password"
              className="w-full px-10 py-2 rounded-md border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary border-gray-700"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.password && (
            <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Buyer Role Radio Button */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm font-medium mb-2 block">Role</label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="buyer"
              {...register("role")}
              defaultChecked
              className="accent-primary"
            />
            <span className="text-gray-300 text-sm">Buyer</span>
          </div>
        </div>

        {formError && <p className="text-red-500 text-sm mb-2">{formError}</p>}

        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          className="w-full mt-4"
        >
          Register
        </Button>

        <p className="text-gray-400 mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}