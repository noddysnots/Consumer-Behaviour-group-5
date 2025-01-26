import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, MessageCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const SpeakerPresentation = () => {
 const [currentSlide, setCurrentSlide] = useState(0);
 
 const marketData = [
   { name: 'Sound Quality', value: 85 },
   { name: 'Battery Life', value: 75 },
   { name: 'Build Quality', value: 90 },
   { name: 'Price Point', value: 70 }
 ];

 const priceData = [
   { price: '$50-75', users: 25 },
   { price: '$75-100', users: 45 },
   { price: '$100-150', users: 20 },
   { price: '$150+', users: 10 }
 ];

 const COLORS = ['#4C51BF', '#48BB78', '#F6AD55', '#F56565'];

 const slides = [
   {
     title: "Understanding Consumer Preferences",
     subtitle: "Premium Bluetooth & Wired Speakers Market Analysis",
     layout: "title"
   },
   {
     title: "Market Overview",
     bullets: [
       "Global market size: $28.6B in 2024",
       "Premium segment growth: 12.4% YoY",
       "Bluetooth dominance: 72% market share",
       "Key drivers: Sound quality and portability"
     ],
     layout: "bullets"
   },
   {
     title: "Consumer Preferences",
     layout: "chart",
     chartType: "pie"
   },
   {
     title: "Price Sensitivity Analysis",
     layout: "chart",
     chartType: "bar"
   },
   {
     title: "Interview with Gaurav Siddharth",
     content: {
       role: "Audio Technology Expert",
       quote: "The $100 price point offers the perfect balance of features and quality",
       questions: [
         "What features attracted you to this speaker?",
         "How does it compare to other speakers in this range?",
         "Would you recommend it for audiophiles?"
       ]
     },
     layout: "interview"
   },
   {
     title: "Key Recommendations",
     bullets: [
       "Focus on premium features in $75-100 range",
       "Emphasize sound quality and build durability",
       "Invest in Bluetooth 5.0+ technology",
       "Target audiophile community with specialized models"
     ],
     layout: "bullets"
   },
   {
     title: "Thank You",
     subtitle: "Questions & Discussion",
     layout: "title"
   }
 ];

 const nextSlide = () => {
   if (currentSlide < slides.length - 1) {
     setCurrentSlide(currentSlide + 1);
   }
 };

 const prevSlide = () => {
   if (currentSlide > 0) {
     setCurrentSlide(currentSlide - 1);
   }
 };

 const renderSlide = (slide) => {
   if (slide.layout === "title") {
     return (
       <div className="flex flex-col items-center justify-center h-full">
         <h1 className="text-5xl font-bold mb-6 text-indigo-600">
           {slide.title}
         </h1>
         <p className="text-2xl text-gray-600">{slide.subtitle}</p>
         <Volume2 className="mt-8 text-indigo-500" size={48} />
       </div>
     );
   }
   
   if (slide.layout === "bullets") {
     return (
       <div className="h-full p-8">
         <h2 className="text-3xl font-bold mb-8 text-indigo-600">{slide.title}</h2>
         <ul className="space-y-6">
           {slide.bullets.map((bullet, index) => (
             <li key={index} className="text-xl flex items-center">
               <div className="w-4 h-4 rounded-full bg-indigo-500 mr-4"></div>
               {bullet}
             </li>
           ))}
         </ul>
       </div>
     );
   }

   if (slide.layout === "chart") {
     if (slide.chartType === "pie") {
       return (
         <div className="h-full p-8">
           <h2 className="text-3xl font-bold mb-8 text-indigo-600">{slide.title}</h2>
           <div className="w-full h-96">
             <ResponsiveContainer>
               <PieChart>
                 <Pie
                   data={marketData}
                   innerRadius={60}
                   outerRadius={120}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {marketData.map((entry, index) => (
                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
             <div className="flex justify-center gap-8 mt-8">
               {marketData.map((item, index) => (
                 <div key={index} className="flex items-center">
                   <div 
                     className="w-4 h-4 rounded-full mr-2"
                     style={{ backgroundColor: COLORS[index] }}
                   ></div>
                   <span>{item.name}: {item.value}%</span>
                 </div>
               ))}
             </div>
           </div>
         </div>
       );
     }
     
     return (
       <div className="h-full p-8">
         <h2 className="text-3xl font-bold mb-8 text-indigo-600">{slide.title}</h2>
         <div className="w-full h-96">
           <ResponsiveContainer>
             <BarChart data={priceData}>
               <XAxis dataKey="price" />
               <YAxis />
               <Tooltip />
               <Bar dataKey="users" fill="#4C51BF" />
             </BarChart>
           </ResponsiveContainer>
         </div>
       </div>
     );
   }

   if (slide.layout === "interview") {
     return (
       <div className="h-full p-8">
         <h2 className="text-3xl font-bold mb-8 text-indigo-600">{slide.title}</h2>
         <div className="flex gap-8">
           <div className="w-1/3">
             <div className="bg-gray-200 w-full aspect-square rounded-lg flex items-center justify-center">
               <img src="/api/placeholder/300/300" alt="Gaurav Siddharth" className="rounded-lg" />
             </div>
             <p className="text-center mt-4 font-semibold">{slide.content.role}</p>
           </div>
           <div className="w-2/3">
             <blockquote className="text-xl italic mb-6 text-gray-600">
               "{slide.content.quote}"
             </blockquote>
             <div className="space-y-4">
               {slide.content.questions.map((q, index) => (
                 <div key={index} className="flex items-start gap-4">
                   <MessageCircle className="text-indigo-500 mt-1" />
                   <p>{q}</p>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
     );
   }
 };

 return (
   <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-2xl">
     <div className="aspect-[16/9] bg-white p-12 relative overflow-hidden">
       {renderSlide(slides[currentSlide])}
       
       <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
         <button 
           onClick={prevSlide}
           disabled={currentSlide === 0}
           className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
         >
           <ChevronLeft size={24} />
         </button>
         
         <span className="text-sm">
           {currentSlide + 1} / {slides.length}
         </span>
         
         <button
           onClick={nextSlide}
           disabled={currentSlide === slides.length - 1}
           className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
         >
           <ChevronRight size={24} />
         </button>
       </div>
     </div>
   </div>
 );
};

ReactDOM.render(<SpeakerPresentation />, document.getElementById('root'));
