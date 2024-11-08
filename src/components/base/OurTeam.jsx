import { ChevronLeft, ChevronRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import React, { useState } from 'react'

const teamMembers = [
    {
      name: 'Sajid Hussain',
      position: 'FrontEnd Developer',
      image: 'https://avatars.githubusercontent.com/u/80850448?v=4',
      email: 's.khan9430319425@gmail.com',
      phone: '+91-8210175827',
    },
    {
      name: 'Kartik',
      position: 'Backend Developer',
      image: 'https://avatars.githubusercontent.com/u/80850448?v=4',
      email: 'kartik@example.com',
      phone: '+91-8210175827',
    },
  ];
const OurTeam = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
      );
    };
  return (
    <section className="py-12 p-8  "  id="team">
            <div className="container mx-auto px-4 ">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - About Team */}
                    <div className="lg:w-1/2  max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                            Meet Our Exceptional Team
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 mb-6"></div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            Our team brings together diverse talents and expertise to deliver outstanding results. 
                            With years of combined experience in both frontend and backend development, 
                            we're passionate about creating innovative solutions that make a difference.
                        </p>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Expertise in modern web technologies
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Committed to delivering high-quality solutions
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Focused on innovation and best practices
                            </li>
                        </ul>
                    </div>

                    {/* Right side - Team Carousel */}
                    <div className="lg:w-1/2   flex justify-center">
                        <div className="w-full max-w-md lg:max-w-xl relative px-4">
                            {/* Card Container */}
                            <div className="overflow-hidden">
                                <div 
                                    className="transition-transform duration-300 ease-in-out"
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`,
                                        width: `${teamMembers.length * 100}%`,
                                        display: 'flex',
                                    }}
                                >
                                    {teamMembers.map((member, index) => (
                                        <div 
                                            key={index}
                                            className="w-full flex-shrink-0 px-4"
                                        >
                                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full">
                                                <div className="flex items-center space-x-6">
                                                    <img
                                                        className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                                                        src={member.image}
                                                        alt={member.name}
                                                    />
                                                    <div>
                                                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                                                            {member.name}
                                                        </h3>
                                                        <p className="text-blue-500 dark:text-blue-400 font-medium text-lg">
                                                            {member.position}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 space-y-4">
                                                    <a 
                                                        href={`mailto:${member.email}`}
                                                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                                                    >
                                                        <Mail className="w-5 h-5 mr-3" />
                                                        <span className="text-base">{member.email}</span>
                                                    </a>
                                                    <a 
                                                        href={`tel:${member.phone}`}
                                                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                                                    >
                                                        <Phone className="w-5 h-5 mr-3" />
                                                        <span className="text-base">{member.phone}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            {/* <div className="flex justify-center mt-8 space-x-4">
                                <button
                                    onClick={prevSlide}
                                    className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div> */}

                            {/* Dots Indicator */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {teamMembers.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${
                                            index === currentIndex 
                                                ? 'bg-blue-500' 
                                                : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default OurTeam