import React from 'react';
import { FaReact } from "react-icons/fa";
import { useEffect, useState } from "react";
import FireImg from "../assets/media/firebase.png";
import ReactImg from "../assets/media/react.png";
import HtmlImg from "../assets/media/html.jpg";
import CssImg from "../assets/media/css.jpg";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";


const HomePages = () => {
    const [spon, SetSponsor] = useState(0);
    const sponsors = [{ img: FireImg }, { img: ReactImg }, { img: HtmlImg }, { img: CssImg }];

    useEffect(() => {
        const interval = setInterval(() => {
            SetSponsor((prev) => (prev + 1) % sponsors.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [sponsors.length]);

    const handleNext = () => SetSponsor((prev) => (prev + 1) % sponsors.length);
    const handlePrev = () => SetSponsor((prev) => (prev - 1 + sponsors.length) % sponsors.length);

    return (

        <div className="px-6 py-10 max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-mcdYellow mb-4">Home Page</h1>
            <h2 className="text-xl text-white mb-8">
                A smile with every bite. McDonald's: the taste that makes you happy.
            </h2>
            {/* Location and Hours */}
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start mb-12">
                <div className="lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-white mb-2">📍 We are located in...</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.775713199779!2d-80.1901597!3d25.7779708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69fa85f32a7%3A0x8a7e2d7a1d76004a!2sMcDonald&#39;s!5e0!3m2!1sit!2sit!4v1753447361533!5m2!1sit!2sit"
                        className="w-full h-64 rounded-md border-none"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mappa McDonald's San Vendemiano"
                    ></iframe>
                </div>

                <div className="lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-white mb-2">📆 Opening hours</h2>
                    <table className="w-full text-left text-white text-base">
                        <tbody>
                            {[
                                ["Monday", "06:00 AM to 11:00 PM"],
                                ["Tuesday", "06:00 AM to 11:00 PM"],
                                ["Wednesday", "06:00 AM to 11:00 PM"],
                                ["Thursday", "06:00 AM to 11:00 PM"],
                                ["Friday", "06:00 AM to 11:00 PM"],
                                ["Saturday", "06:00 AM to 11:00 PM"],
                                ["Sunday", "07:00 AM to 10:00 PM"],
                            ].map(([day, time]) => (
                                <tr key={day}>
                                    <td className="py-1 font-medium pr-4">{day}</td>
                                    <td className="py-1">{time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Technologies */}
            <h3 className="text-2xl font-semibold text-mcdYellow mb-6">Tecnologie usate</h3>

            <div className="flex items-center justify-center gap-6 mb-8">
                <button onClick={handlePrev} className="text-white text-3xl hover:text-mcdYellow">
                    <MdArrowBackIos />
                </button>

                <div className="w-[500px] h-[200px] flex items-center justify-center border border-white rounded-xl overflow-hidden shadow-lg bg-white">
                    <img
                        src={sponsors[spon].img}
                        alt={`Sponsor ${spon + 1}`}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                <button onClick={handleNext} className="text-white text-3xl hover:text-mcdYellow">
                    <MdArrowForwardIos />
                </button>
            </div>

        </div>
    );
};

export default HomePages;
