'use client';
import { useRouter } from 'next/navigation';

/**
 * User sidebar footer with upgrade prompt.
 */
const UserSidebarFooter = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col pb-8">
      <div className="w-full flex flex-col justify-between h-[120px] alertGradient rounded-[12px] p-4">
        <p className="text-[#F9FAFB] font-[500] font-sora text-sm">
          Unlock more with a plan upgrade ⚡
        </p>
        <button
          type="button"
          onClick={() => router.push('/user/account/plan')}
          className="w-full h-[32px] flex justify-center items-center rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] text-primary text-xs"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default UserSidebarFooter;
