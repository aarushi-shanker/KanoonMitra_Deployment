import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Assistant = () => {
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        const injectScript = document.createElement("script");
        injectScript.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
        injectScript.async = true;
        injectScript.setAttribute("data-botpress-container", "botpress-assistant-container");
        document.body.appendChild(injectScript);

        const configScript = document.createElement("script");
        configScript.src = "https://mediafiles.botpress.cloud/fbfa8fda-98b2-4f6a-8fe5-84c03219fdd1/webchat/config.js";
        configScript.defer = true;
        configScript.setAttribute("data-botpress-container", "botpress-assistant-container");
        document.body.appendChild(configScript);

        // Log bot session
        const logBotSession = async () => {
            try {
                await fetch("/api/logs/bot-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user?._id || "Unregistered User",
                        message: "Opened Assistant",
                        metadata: {
                            userAgent: navigator.userAgent,
                            referrer: document.referrer,
                        },
                    }),
                });
            } catch (err) {
                console.error("Bot session logging failed", err);
            }
        };

        logBotSession();

        return () => {
            document.body.removeChild(injectScript);
            document.body.removeChild(configScript);
        };
    }, []);

    return (
        <div id="botpress-assistant-container" className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
            <div className="hero-content flex flex-col items-center">
                <div className="bg-red-900 w-full">
                    <h1 className='text-2xl font-bold text-center text-white p-2.5'>
                        Support Center
                    </h1>
                </div>
                <p className="my-4 text-center text-gray-700">
                    Explore the sections below to learn more about what we offer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card p-6 shadow-lg bg-white border-l-4 border-red-900">
                        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                            <h2 className='font-bold'>KanoonMitra's Mission-</h2>
                            <p className='font-bold'>To be your Trusted Legal Friend</p>
                            <div style={{ marginTop: '20px' }}>
                                <p>
                                    Kanoon Mitra is a comprehensive legal platform designed to provide
                                    easy access to legal resources, guidance, and services. As a "Legal
                                    Friend," Kanoon Mitra aims to simplify the complexities of the law and
                                    make legal information accessible to everyone.
                                </p>
                                <p>
                                    Kanoon Mitra's mission is to empower individuals with the knowledge
                                    they need to navigate the legal landscape confidently and
                                    effectively. Whether you're seeking information, advice, or legal
                                    representation, Kanoon Mitra is your trusted partner in all things
                                    legal.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card p-6 shadow-lg bg-white border-l-4 border-red-900">
                        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                            <h2 className='font-bold'>Features to explore</h2>
                            <ul style={{ marginTop: '20px' }} className='flex flex-col gap-1'>
                                <li>
                                    <strong>Expert Legal Advice:</strong>
                                </li>
                                <li>    Access to experienced legal
                                    professionals for personalized advice and assistance on a wide range
                                    of legal issues.
                                </li>
                                <li>
                                    <strong>Document Assistance:</strong>
                                </li>
                                <li> Templates and guidance for
                                    creating legal documents, contracts, and agreements available for lawyers.
                                </li>
                                <li>
                                    <strong>Interactive Assistant Bot:</strong>
                                </li>
                                <li>  Digital bot to help
                                    users understand legal processes and prepare for legal proceedings.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
            <div className='fixed bottom-5 right-5 font-semibold animate-bounce text-xs md:text-sm'>
                Click here to interact with our AI Assistant <span className='text-amber-600'>FOR FREE</span>
            </div>
            {/* The assistant icon will be injected here */}
        </div >
    );
}

export default Assistant;

{/**import React from 'react';

const GettingStarted = () => {
  return (
    1. Account Setup
To start using Kanoon Mitra, you first need to create an account. Simply click on the 'Sign Up' button, fill in your details, and verify your email address. This account will give you access to all our features and services.

2. Initial Configuration
After setting up your account, you can personalize your profile. This includes adding personal details, selecting your areas of interest, and setting up notifications. This initial configuration helps us tailor the content and services to your specific needs.

3. Finding a Lawyer
Our platform makes it easy to find a lawyer suited to your legal needs. Use our search tool to filter by area of law, location, and expertise. You can view profiles, read reviews, and select the best match for your situation.

4. Booking Appointments
Once you've selected a lawyer, you can book an appointment through our platform. Choose a convenient date and time, and receive a confirmation along with the option to add the appointment to your calendar.

5. Registering as a Lawyer
If you're a legal professional looking to offer your services, you can register as a lawyer on Kanoon Mitra. Create a professional profile, showcase your expertise, and connect with potential clients. Our platform provides you with tools to manage appointments, client communications, and more.


  );
};

export default GettingStarted; */}