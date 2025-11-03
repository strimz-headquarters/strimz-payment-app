/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useMemo, useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import baseIcon from '@/public/networks/base.webp';
import Image from 'next/image';

/**
 * User-specific header content showing username and wallet address.
 */
const UserHeaderContent = () => {
  const [user, setUser] = useState<{ username?: string; address?: string }>({});

  useEffect(() => {
    const data = window.localStorage.getItem('strimzUser');
    const parsedUser = data
      ? JSON.parse(data)
      : { username: 'Andrew', address: '0xbe03CE9d6001D27BE41fc87e3E3f777d04e70Fe2' };
    setUser(parsedUser);
  }, []);

  const shortenAddress = useMemo(() => {
    return user?.address
      ? `${user?.address.slice(0, 8)}...${user?.address.slice(-6)}`
      : '';
  }, [user?.address]);

  // async function clipboard copy
  const copyTextToClipboard = async (text: any) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  //handle copy to clipboard
  const handleCopy = () => {
    copyTextToClipboard(user?.address)
      .then(() => {
        toast.success('Wallet address copied to clipboard', {
          position: 'top-right',
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to copy wallet address', {
          position: 'top-right',
        });
      });
  };

  return (
    <>
      <h4 className="text-primary capitalize font-sora font-[500] text-base">
        Welcome Back, {user?.username}
      </h4>
      <div className="flex gap-1 items-center">
        <Image
          src={baseIcon}
          alt="Base Icon"
          className="w-4 h-4"
          width={16}
          height={16}
          quality={100}
          priority
        />
        <p className="text-sm capitalize text-[#58556A] font-poppins font-[400]">
          {shortenAddress}
        </p>
        <button type="button" onClick={handleCopy} className="text-[#58556A]">
          <IoCopyOutline className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default UserHeaderContent;
