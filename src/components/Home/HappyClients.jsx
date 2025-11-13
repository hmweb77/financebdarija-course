import React from 'react';
import CountUp from 'react-countup';

const workDetails = [
    { title: 'عدد المشتركين', number: 542, id: 1, color: 'bg-green-600', shadow: 'shadow-[0_2px_15px_rgba(2,158,118,0.5)]' },
    { title: 'عدد بودكاست', number: 1007 , id: 2, color: 'bg-yellow-500', shadow: 'shadow-[0_2px_15px_rgba(255,168,8,0.5)]' },
    { title: ' ساعات البث المباشر ', number: 1634, id: 3, color: 'bg-indigo-700', shadow: 'shadow-[0_2px_15px_rgba(85,67,209,0.5)]' },
    { title: 'عدد المتتبعين', number: 201586, id: 4, color: 'bg-red-500', shadow: 'shadow-[0_2px_15px_rgba(255,88,110,0.5)]' }
];

const HappyClient = () => {
    return (
        <section className="bg-blue-200 py-8">
            <div className="flex flex-wrap justify-center gap-4">
                {
                    workDetails.map(({ title, number, id, color, shadow }) => (
                        <div className="w-full md:w-1/2 lg:w-1/5 " key={id}>
                            <div className="bg-white rounded-lg shadow-lg p-5 text-center transition-all duration-1000">
                                <span className={`p-2 text-3xl text-white rounded ${color} ${shadow}`}>
                                    {/* Icon component could be added here */}
                                </span>
                                <div>
                                    <p className="text-gray-500 text-lg my-6 font-medium">{title}</p>
                                    <h4 className="text-purple-600 text-4xl font-bold">
                                        <CountUp end={number} start={0} duration={9} />
                                    </h4>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default HappyClient;
