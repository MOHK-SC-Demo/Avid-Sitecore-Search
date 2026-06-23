"use client"
import { useEffect, useState } from 'react';
import { getRfkUserId } from '@sitecore-search/data';
import { PageController } from '@sitecore-search/react';

export const DataBar = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const open = "M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z";
    const closed = "M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z";
    const context = PageController.getContext();

    useEffect(() => {
        setIsOpen(isOpen);
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='fixed top-0 right-[-400] h-full w-[450] z-[501]  transition-[right] delay-700 duration-700 ease-in-out { isOpen ? "open" : "closed" }'>
            <div title="Guest Data"  className="absolute left-[39] top-[160] w-[50] h-50] block text-white hover:left-[21] hover:duration-[300ms] bg-avid-purple">
                <button onClick={handleClick} type='button'>
                    <svg className="h-6 w-6 fill-current" viewBox='0 0 20 20'>
                        <path fillRule="evenodd" d={isOpen ? open : closed}/>
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="absolute top-0 left-[-400] w-[450] h-full bg-[#f7f7f7] pl-[20] pt-[20]">
                    <div className="text-black">
                        <h3 className='font-semibold text-lg'>Guest Data</h3>
                        <div>
                            <p>Identifier: { getRfkUserId() }</p>
                        </div>
                        <div className="absolute top-0 right-0">
                        <button onClick={handleClick} type='button'>
                            <svg className="h-6 w-6 fill-current" viewBox='0 0 20 20'>
                                <path fillRule="evenodd" d={isOpen ? open : closed}/>
                            </svg>
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataBar;