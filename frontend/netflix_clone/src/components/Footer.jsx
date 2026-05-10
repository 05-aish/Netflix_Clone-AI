import React from 'react';

const Footer = () => {
  return (
    <div className="text-[#737373] md:px-10">
        <div className='py-20'> 
            <p>Developed by Aish</p>
            <p>Personal Project</p>
        </div>
        <div className="grid grid-cols-2 pb-10 md:grid-cols-4 text-sm max-w-5xl">
            <ul className='flex flex-col space-y-2'>
                <li >FAQ</li>
                <li>Investor Relations</li>
                <li>Terms of Use</li>
                <li>Gift Cards</li>
            </ul>
            <ul className='flex flex-col space-y-2'>
                <li>Help Centre</li>
                <li>Media Centre</li>
                <li>Jobs</li>
                <li>Privacy</li>
            </ul>

        </div>
    </div>
    
  );
}

export default Footer;