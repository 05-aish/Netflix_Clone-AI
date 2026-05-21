import React from 'react';

const AiRecc = () => {
    return (
    <div className='relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border border-[#333] px-8 py-10 mt-4 flex flex-col items-center min-h-[480px]'>
        <h2 className='text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg'>Movie Recommendations</h2>

        <div className='w-full flex items-center mb-8'>
            <div className='flex-1 h-2 bg-[#232323] rounded-full overflow-hidden'> 
                <div className='h-full bg-[#4e4c4c] transition-all duration-300'
                style={{ width: "70%" }}>
                </div>
            </div>

            <span className='ml-4 text-white text-sm font-semibold'>4/5</span>
        </div>

        <div className='w-full flex flex-col'>
            <div className='mb-6 flex flex-col text-lg font-semibold justify-center text-center'>
                <h3 className='text-white mb-4'>What is your preferred genre?</h3>

                <div className='grid grid-cols-1 gap-3'>
                    <button className='w-full font-semibold text-base text-white py-3 rounded-xl border border-gray-400 shadow-sm bg-[#232323]'>
                    Option 1
                    </button>
                    <button className='w-full  font-semibold text-base text-white py-3 rounded-xl border border-gray-400 shadow-sm bg-[#232323] '>
                        Option 2
                    </button>
                    <button className='w-full font-semibold text-base text-white py-3 rounded-xl border border-gray-400 shadow-sm bg-[#232323]'>
                        Option 3
                    </button>
                    <button className='w-full font-semibold text-base text-white py-3 rounded-xl border border-gray-400 shadow-sm bg-[#232323]'>
                        Option 3
                    </button>
                </div>
            </div>

            <button className='px-2 py-4 border'>Back</button>
            <button className='px-2 py-4 border'>Next</button>
        </div>
    </div>
    )
};

export default AiRecc;