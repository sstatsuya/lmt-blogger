// src/layouts/MainLayout.tsx
import React from 'react';
import { IMAGES } from '../assets';

const MainLayout = ({ children }: { children: React.ReactNode }) => {

  const renderLogo = () => {
    return <div className=''>
      <a href='/'>
        <img src={IMAGES.LOGO} className='w-24 h-12' />
      </a>
    </div>
  }

  const renderUtilities = () => {
    return <div className='flex-between gap-4'>
      <div className='hover:bg-hover group transition-all duration-200 ease-in-out cursor-pointer min-w-36 flex-between px-2 py-1.5 border-1 border-border rounded-md'>
        <p className='text-plhd text-sm pl-2 group-hover:text-white transition-all ease-in-out duration-200'>Search...</p>
        <div className='bg-highlight flex-center text-xs rounded-sm p-0.5 group-hover:bg-transparent group-hover:text-white duration-200 transition-all ease-in-out'>
          ⌘K
        </div>
      </div>

      <UtilityBtn icon={<MoonOutlined style={{ fontSize: '18px' }} className='text-white' />} />
      <UtilityBtn icon={<GithubOutlined style={{ fontSize: '18px' }} className='text-white' />} />
    </div>
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="sticky top-0 bg-primary py-10 flex justify-between items-center w-full h-16 px-4">
        {renderLogo()}
        {renderUtilities()}
      </div>
      {children}
    </div>
  );
};

export default MainLayout;

import { GithubOutlined, MoonOutlined, SmileOutlined } from '@ant-design/icons';

const UtilityBtn = ({ icon }: { icon: any }) => {
  return <div className='p-2 cursor-pointer group rounded-md hover:bg-hover flex-center transition-all duration-200 '>
    {icon}
  </div>
}