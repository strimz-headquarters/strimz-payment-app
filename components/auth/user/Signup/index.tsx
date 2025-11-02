/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { userSignupSchema, UserSignupInput } from '@/types/auth';
import AuthFormContainer from '@/components/auth/shared/AuthFormContainer';
import FormInput from '@/components/auth/shared/FormInput';
import PasswordInput from '@/components/auth/shared/PasswordInput';
import SubmitButton from '@/components/auth/shared/SubmitButton';
import SocialAuthButton from '@/components/auth/shared/SocialAuthButton';

/**
 * User signup form component
 */
const SignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm<UserSignupInput>({
    resolver: zodResolver(userSignupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: UserSignupInput) => {
    try {
      console.log('Signup data:', data);

      // TODO: Replace with actual API call
      // await signupUser(data);

      toast.success('Sign up successful', {
        position: 'top-right',
      });

      router.push('/auth/user/verify-email');
    } catch (error: any) {
      console.error('Failed to sign up:', error);
      toast.error(error?.message || 'Sign up failed. Please try again.', {
        position: 'top-right',
      });
    } finally {
      reset();
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    console.log('Google signup clicked');
  };

  return (
    <AuthFormContainer title="Welcome to Strimz">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 mt-6">
        <FormInput
          label="Username"
          id="username"
          type="text"
          placeholder="Adams"
          register={register('username')}
          error={errors.username?.message}
        />

        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Adams@example.com"
          register={register('email')}
          error={errors.email?.message}
        />

        <PasswordInput
          label="Password"
          id="password"
          placeholder="Password"
          register={register('password')}
          error={errors.password?.message}
        />

        <SubmitButton
          isSubmitting={isSubmitting}
          disabled={!isDirty || !isValid}
          text="Signup"
          className="mt-3"
        />

        <div className="w-full h-[1px] bg-[#E5E7EB]" />

        <SocialAuthButton provider="google" onClick={handleGoogleSignup} />

        <div className="w-full flex flex-col items-center gap-4 mt-8">
          <p className="font-poppins text-center font-[400] text-[14px] text-[#58556A] leading-[24px]">
            Have an account?{' '}
            <Link
              href="/auth/user/login"
              className="font-poppins font-[600] text-[14px] text-accent hover:underline leading-[24px]"
            >
              Login
            </Link>
          </p>

          <p className="md:w-[80%] w-[90%] text-center font-poppins font-[400] text-[12px] text-[#58556A]">
            By continuing you agree to{' '}
            <Link className="underline" href="/">
              Strimz Terms of Service
            </Link>{' '}
            and <Link href="/" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </form>
    </AuthFormContainer>
  );
};

export default SignupForm;
