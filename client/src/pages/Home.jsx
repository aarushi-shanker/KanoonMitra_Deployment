import React from 'react';
import HeroImg from '../assets/hero-image.png';
import aboutCardImg from '../assets/aboutcard.png';
import aboutImg from '../assets/images/lawyer-1.jpg';
import chatImg from '../assets/chat_icon.png';
import docImg from '../assets/doc_icon.webp';
import expertImg from '../assets/expertload.webp';
import regImg from '../assets/lawyer_reg_icon.png';
import { Link } from 'react-router-dom';
import AnimatedComponent from '../components/Animation';

const Home = () => {
  return (
    <div className="min-h-screen lg:ms-4 md:shadow-md bg-base-100">
      <div className="flex flex-col lg:flex-row">
        {/* Hero Section */}
        <div className='hero-section lg:w-[570px] px-4 pt-4 pb-8'>
          <AnimatedComponent>
            <h1 className='text-4xl leading-[46px] text-red-950 font-[800] md:text-[60px] md:leading-[70px]'>
              Empowering You with Legal Expertise for a Just and Fair Life.
            </h1>
          </AnimatedComponent>

          <AnimatedComponent>
            <div className='flex flex-col justify-start gap-2'>
              <p className='text-sm leading-[30px] font-[400] text-red-900 mt-[18px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quis fugiat quas commodi a tempora tempore consequatur maxime laborum aperiam quidem voluptatem ea sunt, enim quibusdam omnis eos deleniti sit.
              </p>
              <a href='#start' className="hover:bg-red-700 font-semibold text-sm btn shadow-md bg-red-900 border-red-950 text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600"> Get started </a>
            </div>
          </AnimatedComponent>
          <div className="flex flex-col md:flex-row items-center gap-5 lg:gap-6 mt-6">
            <AnimatedComponent>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-red-950'>
                  3+
                </h2>
                <span className='w-[100px] h-2 bg-yellow-400 rounded-full block mt-[-5px]'></span>
                <p className='text-[18px] leading-[30px] font-[400] text-red-900 mt-[10px]'>Legal Advisers</p>
              </div>
            </AnimatedComponent>
            <AnimatedComponent>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-red-950'>
                  30+
                </h2>
                <span className='w-[100px] h-2 bg-purple-600 rounded-full block mt-[-5px]'></span>
                <p className='text-[18px] leading-[30px] font-[400] text-red-900 mt-[10px]'>Happy Users </p>
              </div>
            </AnimatedComponent>
            <AnimatedComponent>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-red-950'>
                  10+
                </h2>
                <span className='w-[100px] h-2 bg-green-600 rounded-full block mt-[-5px]'></span>
                <p className='text-[18px] leading-[30px] font-[400] text-red-900 mt-[10px]'>Templates</p>
              </div>
            </AnimatedComponent>
          </div>
        </div>
        {/* Hero Image */}
        <AnimatedComponent>
          <div className='flex lg:justify-end hero-image lg:w-[calc(100% - 570px)] gap-6'>
            <img src={HeroImg} alt='' />
          </div>
        </AnimatedComponent>
      </div>
      <section className='md:flex md:flex-col md:items-center'>
        <div className="container p-4">
          <div className="mx-auto lg:w-[500px]">
            <AnimatedComponent>
              <h2 className='text-lg leading-[36px] text-center text-red-950 font-[800] md:text-4xl md:leading-[55px]'>
                Delivering Premier Legal Services to Protect Your Rights and Interests
              </h2>
              <p className='text-sm leading-[30px] font-[400] text-red-900 mt-[18px] text-center'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quis fugiat quas commodi a tempora tempore consequatur maxime laborum aperiam quidem voluptatem ea sunt, enim quibusdam omnis eos deleniti sit.
              </p>
            </AnimatedComponent>
          </div>
        </div>
      </section>
      <div id='start' className='flex justify-center p-4'>
        <div className="flex flex-col md:flex-row md:items-center gap-5 lg:gap-6 mt-6 overflow-x-auto btn-container">
          <AnimatedComponent>
            <Link to='/Assistant'>
              <div className="card card-compact bg-red-900 w-64 shadow-lg hover:bg-red-700 border-red-950 text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                <figure className='border border-red-900'>
                  <img src={chatImg} alt='AI Assistant' className='w-full h-41 object-cover hover:scale-125 transition-all duration-500' />
                </figure>
                <div className="card-body">
                  <p className="font-semibold text-center">Talk to our AI Assistant <span className='text-amber-400 dark:text-white'>FOR FREE</span></p>
                </div>
              </div>
            </Link>
          </AnimatedComponent >
          <AnimatedComponent>
            <Link to='/legalFormats'>
              <div className="card card-compact bg-red-900 w-64 shadow-lg hover:bg-red-700 border-red-950 text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                <figure className='border border-red-900 hover:border-red-700'>
                  <img src={docImg} alt='Legal Document Template' className='w-fit h-60 object-cover hover:scale-125 transition-all duration-500' />
                </figure>
                <div className="card-body">
                  <p className='font-semibold text-center'>Generate Legal Document Template <span className='text-amber-400 dark:text-white'>FOR FREE</span></p>
                </div>
              </div>
            </Link>
          </AnimatedComponent >
          <AnimatedComponent>
            <Link to='/lawyers'>
              <div className="card card-compact bg-red-900 w-64 shadow-lg hover:bg-red-700 border-red-950 text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                <figure className='border border-red-900'>
                  <img src={expertImg} alt='Find Lawyer' className='w-fit h-64 object-cover hover:scale-125 transition-all duration-500' />
                </figure>
                <div className="card-body">
                  <p className="font-semibold text-center">Find your Lawyer</p>
                </div>
              </div>
            </Link>
          </AnimatedComponent >
          <AnimatedComponent>
            <Link to='/lawyerApply'>
              <div className="card card-compact bg-red-900 w-64 shadow-lg hover:bg-red-700 border-red-950 text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                <figure className='border border-red-900'>
                  <img src={regImg} alt='Register as Lawyer' className='w-fit h-64 object-cover hover:scale-125 transition-all duration-500' />
                </figure>
                <div className="card-body">
                  <p className='font-semibold text-center'>Register as Lawyer</p>
                </div>
              </div>
            </Link>
          </AnimatedComponent >
        </div>
      </div>
      {/* About Section */}
      < section >
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row justify-between gap-4 bg-red-900 container mt-20">
            {/* About Img */}
            <div className="relative lg:w-1/2 xl:w-[770px] z-10 order-1 lg:order-2 px-4 py-2 flex justify-center">
              <AnimatedComponent>
                <img src={aboutImg} alt='' className='rounded-lg h-80 object-cover' />
              </AnimatedComponent>
              <div className="absolute z-20 bottom-4 w-56 right-[22%] md:right-[-22%] lg:right-[8%] mx-8">
                <AnimatedComponent>
                  <img src={aboutCardImg} alt='' />
                </AnimatedComponent>
              </div>
            </div>
            {/* About Content */}
            <div className="order-2 md:order-1 p-4 md:w-1/2 xl:w-[670px] flex flex-col justify-center">
              <AnimatedComponent>
                <h2 className='font-bold text-2xl text-amber-400 text-center lg:text-right'>
                  One of Nation's Best on Our Platform!
                </h2>
              <div className="flex flex-col md:flex-row items-start gap-5 md:gap-6 mt-6 md:justify-end">
                  <div>
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-white'>
                      37+
                    </h2>
                    <span className='w-[100px] h-2 bg-yellow-400 rounded-full block mt-[-5px]'></span>
                    <p className='text-sm leading-[30px] font-[400] text-white mt-[10px]'>Years of Experience</p>
                  </div>
                  <div>
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-white'>
                      175+
                    </h2>
                    <span className='w-[100px] h-2 bg-purple-600 rounded-full block mt-[-5px]'></span>
                    <p className='text-sm leading-[30px] font-[400] text-white mt-[10px]'>Convictions Under <br className="hidden" /> POCSO Act and others</p>
                  </div>
              </div>
                <div className='py-4 md:px-4 md:text-right'>
                  <Link to='/lawyers/66a7839fe74ac77500d1eadf' className="hover:bg-yellow-500 font-semibold text-sm text-red-900 btn shadow-md bg-white-900 border-red-900 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600"> Learn More </Link>
                </div>
              </AnimatedComponent>
            </div>
          </div>
        </div>
      </section >
      {/*FAQ Section*/}
      < AnimatedComponent >
        <div className="p-4 mt-20">
          <h2 className="text-xl md:text-2xl font-bold text-red-900 m-2 text-center">Frequently Asked Questions</h2>
          <div className="bg-white my-4 shadow-lg rounded-lg join join-vertical">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="faq" defaultChecked />
              <div className="collapse-title text-sm font-medium">How can I report a crime?</div>
              <div className="collapse-content">
                <p>To report a crime, you can contact your local police station or use the online portal provided by the government for lodging complaints. In case of emergencies, dial 112 for immediate assistance.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="faq" />
              <div className="collapse-title text-sm font-medium">What should I do if I’m a victim of cybercrime?</div>
              <div className="collapse-content">
                <p>If you’re a victim of cybercrime, report the incident to your local police station and file a complaint with the Cyber Crime Cell. You can also use online platforms like the National Cyber Crime Reporting Portal to register your complaint.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="faq" />
              <div className="collapse-title text-sm font-medium">How can I get a police clearance certificate?</div>
              <div className="collapse-content">
                <p>To obtain a police clearance certificate, you need to apply at your local police station or the designated authority. Provide necessary documents such as proof of identity, address, and any other required forms.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="faq" />
              <div className="collapse-title text-sm font-medium">What is the procedure for filing a First Information Report (FIR)?</div>
              <div className="collapse-content">
                <p>To file an FIR, visit the nearest police station and provide details of the incident you are reporting. An FIR is a formal document that records the details of a crime and initiates the investigation process.</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedComponent >
      {/* Footer */}
      < AnimatedComponent >
        <footer className="bg-red-900 text-white py-8">
          <div className="container mx-auto flex justify-evenly px-4">
            <div>
              <h2 className="font-bold mb-4">Products</h2>
              <ul className='text-xs md:text-sm'>
                <li className='hover:opacity-70'><Link to="/legalFormats">Legal Formats</Link></li>
                <li className='hover:opacity-70'><Link to="/Assistant">AI Assistant</Link></li>
                <li className='hover:opacity-70'><Link to="/lawyers">Legal Advisers</Link></li>
                <li className='hover:opacity-70'><Link to="/lawyerApply">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold mb-4">Support</h2>
              <ul className='text-xs md:text-sm'>
                <li className='hover:opacity-70'><Link to="/Assistant">Support Center</Link></li>
                <li className='hover:opacity-70'><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto flex flex-col items-center text-center mt-8 px-4">
            <p className="text-xs md:text-sm">*AI-generated content can contain mistakes. Consider checking important information.</p>
            <p className="text-xs md:text-sm mt-4">&copy; 2024 KanoonMitra. All rights reserved.</p>
            <div className="flex justify-center mt-4 space-x-4">
              <p className="text-xs md:text-sm underline">Terms and Conditions</p>
              <p href="#" className="text-xs md:text-sm underline">Privacy Policy</p>
            </div>
          </div>
        </footer>
      </AnimatedComponent >
    </div >
  );
}

export default Home;