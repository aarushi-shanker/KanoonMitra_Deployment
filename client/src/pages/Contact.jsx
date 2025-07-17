import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [btnMsg, setMsg]= useState('Submit');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();
        setMsg('Submitted')
        emailjs.sendForm('service_1bgkcsc', 'template_jv3qnhf', ev.target, 'bkhvwLgSKHkRNKtq9')
            .then((result) => {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
                setMsg('Submit');
            }, (error) => {
            });
    };

    return (
        <div className="min-h-screen bg-base-100 p-4 lg:p-8">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl text-red-900 font-bold text-center mb-6">Contact Us</h1>

                <p className="text-base text-center mb-8">
                    If you have any questions or need further information regarding law and order in India and could not find answer from <Link to={'/Assistant'} className="underline"> <strong>KanoonSakha</strong> (our AI Bot) </Link> and do not want to book an appointment online, please feel
                    free to contact us using the details below or by filling out the contact form.
                </p>

                <div className="flex flex-col lg:flex-row lg:gap-8 mb-10">
                    <div className="lg:w-1/2 mb-6 lg:mb-0">
                        <div className="bg-white p-6 lg:shadow-lg rounded-lg">
                            <h2 className="text-xl text-red-900 font-semibold mb-4">Contact Information</h2>
                            <p>
                                <strong>Address:</strong> Tilkamanjhi, Bhagalpur, Bihar, India
                            </p>
                            <p>
                                <strong>Phone:</strong> +91-9508582582
                            </p>
                            <p>
                                <strong>Email:</strong> info@lawandorderindia.com
                            </p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4 text-red-900">Location</h2>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.871275489204!2d87.00205731503288!3d25.244445983875275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1553141d23803%3A0x938b67561711934a!2sBhagalpur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1621399243983!5m2!1sen!2sin"
                                allowFullScreen=""
                                loading="lazy"
                                className="w-full h-80 rounded-lg"
                            ></iframe>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-xl text-red-900 font-semibold mb-4">Contact Form</h2>
                        <form
                            className="bg-white p-6 lg:shadow-lg rounded-lg"
                            onSubmit={onSubmitHandler}
                        >
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Name:</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                    className="w-full border-gray-300 border-2 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    name="email"
                                    onChange={handleChange}
                                    className="w-full border-gray-300 border-2 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone:</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    id="phone"
                                    name="phone"
                                    onChange={handleChange}
                                    className="w-full border-gray-300 border-2 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject:</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    id="subject"
                                    name="subject"
                                    onChange={handleChange}
                                    className="w-full border-gray-300 border-2 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Message:</label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    name="message"
                                    onChange={handleChange}
                                    className="w-full border-gray-300 border-2 rounded-lg p-2 h-28"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:gap-8 mb-10">
                    <div className="lg:w-1/2 mb-6 lg:mb-0">
                        <h2 className="text-xl font-semibold mb-4 text-red-900">Schedule of Service</h2>
                        <div className="bg-white p-6 lg:shadow-lg rounded-lg">
                            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p>Saturday: 10:00 AM - 5:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-xl font-semibold text-red-900">FAQ</h2>
                        <div className="bg-white my-6 shadow-lg rounded-lg join join-vertical">
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
                </div>

                <div className="text-center mb-10 text-red-900">
                    <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-900 hover:text-red-500 transition duration-300"
                        >
                            <FaFacebookF size={24} />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-900 hover:text-red-500 transition duration-300"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-900 hover:text-red-500 transition duration-300"
                        >
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-base font-medium">
                        <span className="font-semibold">Emergency Helpline: </span>
                        For any emergencies related to law and order, please call: +91-112-123-4567
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;