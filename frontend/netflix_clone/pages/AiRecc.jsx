import React from 'react';
import { useState } from 'react';
import {toast} from 'react-hot-toast';
import { getRecommendation } from '../lib/aimodel';
import Recommended from '../src/components/Recommended';
import { motion } from "framer-motion";

const text = "Here's some recommendations";

const steps = [
    {
        name: "genre",
        label: "What's your preferred genre?",
        options: [
            "Action",
            "Comedy",
            "Thriller",
            "Drama",
            "Romance",
            "Sci-fi",
            "Animation"
        ]
    },
    {
        name: "mood",
        label: "What's your current mood?",
        options: [
            "Excited",
            "Relaxed",
            "Thoughtful",
            "Inspired",
            "Romantic"
        ]
    },
    {
        name: "decade",
        label: "Preferred decade?",
        options: ["2020s", "2010s", "2000s", "1990s", "Older"]
    },
    {
        name: "language",
        label: "Preferred language?",
        options: ["English", "Korean", "Spanish", "French", "Other"]
    },
    {
        name: "length",
        label: "Preferred movie length?",
        options: ["Short (<90 min)", "Standard (90-120 min)", "Long (>120 min)"]   
    }
];

const initialState = steps.reduce((acc, step) => {
    acc[step.name] = "";
    return acc;
}, {});

const AiRecc = () => {

    const [inputs, setInputs] = useState(initialState);
    const [step, setStep] = useState(0);
    const [recommendation, setRecommendation] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleOption = (value) => {
        setInputs({...inputs, [steps[step].name] : value});
        console.log(inputs);
    };

    const handleNext = () => {
        if(step < steps.length - 1){
            setStep(step + 1)
        }
        else{
            console.log(inputs)
        }
    }

    const handleBack = () => {
        if(step > 0){
            setStep(step - 1)
        }
    }
    

    //gen ai recommendations
    const generateRecommendation = async () => {
        if(!inputs){
            toast("Please enter inputs.");
        }

        setLoading(true);

        const userPrompt = `Given the following user inputs:
        -Decade: ${inputs.decade}
        -Genre: ${inputs.genre}
        -Language: ${inputs.language}
        -Length: ${inputs.length}
        -Mood: ${inputs.mood}
        
        Recommend 10 ${inputs.mood.toLowerCase()}
        ${inputs.language} language ${inputs.genre.toLowerCase()} movies released in the ${inputs.decade} with a runtime between ${inputs.length}. Return the list as plain JSON array of movie titles only, no exttra text, no explanations, no code blocks, no markdown, just the JSON array. Example:
        [
            "Movie Title 1",
            "Movie Title 2",
            "Movie Title 3",
            "Movie Title 4",
            "Movie Title 5",
            "Movie Title 6",
            "Movie Title 7",
            "Movie Title 8",
            "Movie Title 9",
            "Movie Title 10",
            
        ]`;

        const result = await getRecommendation(userPrompt);

        setLoading(false);

        if(result){
            const cleanedResult = result.replace(/```json\n/i, '').replace(/\n```/i, '');
            
            try {
                const recommendationArray = JSON.parse(cleanedResult);
                setRecommendation(recommendationArray);
                console.log(recommendationArray);
            } catch (error) {
                console.log(error);
            }
        }

        else{
            toast.error("Failed to get recommendations..");
        }
    }

    return (
    <div>
        {recommendation && recommendation.length > 0 ? (
        <div className='mt-4 mx-4'>
            <motion.h2
                className='text-2xl font-bold mb-4 text-white drop-shadow-lg'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: index * 0.05,
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.h2>
            <Recommended movieTitles={recommendation}/>
        </div>) :

        <div className='relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border border-[#333] px-8 py-10 mt-4 flex flex-col items-center min-h-[480px]'> 
            <h2 className='text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg'>Movie Recommendations</h2>

            <div className='w-full flex items-center mb-8'>
                <div className='flex-1 h-2 bg-[#232323] rounded-full overflow-hidden'> 
                    <div className='h-full bg-[#4e4c4c] transition-all duration-300'
                    style={{ width: `${((step + 1)/steps.length) * 100}%` }}>
                    </div>
                </div>

                <span className='ml-4 text-white text-sm font-semibold'>{step + 1}/{steps.length}</span>
            </div>

            <div className='w-full flex flex-col'>
                <div className='mb-6 flex flex-col text-lg font-semibold justify-center text-center'>
                    <h3 className='text-white mb-4'>{steps[step].label}</h3>

                    <div className='grid grid-cols-1 gap-3'>
                        {steps[step].options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => handleOption(opt)} 
                                className={`w-full py-3 rounded-xl border-2 transition font-semibold text-base flex items-center justify-center gap-2 focus:outline-none focus:ring-2 active:scale-95 duration-150 focus:ring-[#e50914] shadow-sm ${inputs[steps[step].name] == opt
                            ? "bg-[#e50914] border-[#e50914] text-white shadow-lg"
                            : "bg-[#232323] border-[#444] text-white hover:bg-[#e50914]/80 hover:border-[#e50914]"
                                }`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className='flex justify-between items-center mt-6'>
                    <button 
                    onClick={handleBack}
                    type="button"
                    disabled={step === 0}
                    className='px-6 py-2 rounded-lg font-semibold transition border-2 border-[#444] text-white bg-[#181818] hover:bg-[#232323]'>Back</button>

                    <button 
                    onClick={step === steps.length - 1? generateRecommendation : handleNext}
                    type='button'
                    disabled={!inputs[steps[step].name] || loading}
                    className='px-6 py-2 rounded-lg font-semibold transition border-2 border-[#e50914] text-white bg-[#e50914] hover:bg-[#b0060f] ml-2'>{step === steps.length - 1? "Finish" : "Next"}</button>
                </div>
            </div>
        </div>}
    </div>
    )
};

export default AiRecc;