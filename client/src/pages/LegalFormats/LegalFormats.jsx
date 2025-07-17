import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import legalFormats from '../../assets/FormatsData'
import AnimatedComponent from '../../components/Animation';

const LegalFormats = () => {

    const [inputFormat, setInputFormat] = useState('');

    const handleInputChange = (e) => {
        setInputFormat(e.target.value);
    };

    return (
        <div className="p-6 bg-white">
            <h1 className="text-3xl text-center font-bold mb-4">Free Legal Formats</h1>
            <p className="mb-6 text-center">Download Free Legal Formats, We have listed some of the online Indian legal forms and formats for free download. For any requirement of drafting and vetting of legal formats <Link to='/contact' className='font-semibold hover:text-red-900 hover:underline'>Contact Us</Link>.</p>
            <div className="my-6 text-center w-full">
                <label htmlFor="desired-format" className="block mb-2 text-red-950">Do not find your desired Document Format name in the list? Enter the name below:</label>
                <div className='w-full flex md:flex-row flex-col gap-4'>
                    <input
                        type="text"
                        id="desired-format"
                        value={inputFormat}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900 w-full"
                        placeholder="Type your desired Document Name"
                    />
                    <Link to={`/documentInput/${inputFormat}`} className='hover:bg-amber-500 font-semibold text-sm text-red-950 btn btn-sm md:btn-md shadow-md bg-red-900 border-red-950 text-white dark:bg-gray-700  dark:border-gray-700 dark:hover:bg-gray-600'>
                        Generate
                    </Link>
                </div>
            </div>
            <AnimatedComponent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(legalFormats).map((key) => (
                        <div key={key} className="card bg-amber-100 shadow-lg text-red-950">
                            <div className="card-body">
                                <h2 className="card-title">{key}</h2>
                                <ul className="list-disc list-inside">
                                    {legalFormats[key].map((format, index) => (
                                        <li key={index}>
                                            <Link to={`/documentInput/${format}`}>
                                                {format}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedComponent>
        </div>
    );
};

export default LegalFormats;