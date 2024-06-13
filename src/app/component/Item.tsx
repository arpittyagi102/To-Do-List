import React, { useState, useRef, useEffect } from "react";

export default function Item({ _id, title, description, marked, dueDate, deleteTask }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [titleInput, setTitleInput] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
    const [descriptionHeight, setDescriptionHeight] = useState("0px");


    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    useEffect(() => {
        // Focus the input field when entering edit mode
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        // Calculate the height of the description content
        if (isDescriptionOpen) {
            setDescriptionHeight(`${document.getElementById(`desc-${_id}`).scrollHeight}px`);
        } else {
            setDescriptionHeight("0px");
        }
    }, [isDescriptionOpen, _id]);

    const handleTaskInputKeyDown = async (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            updateTaskTitle();
        }
    };

    const updateTaskTitle = async () => {
        // Update the task title locally
        setTitleInput(titleInput);
        setIsEditing(false);
        // Update the task title on the server
        await fetch(window.location.origin + "/api/tasks", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id, title: titleInput })
        });
    };

    return (
        <li className="bg-gray-900 rounded-xl py-3 px-2 md:px-5 md:py-3 w-full max-w-[700px] hover:shadow-xl">
            <div className="task-title flex justify-between items-center ">
                <div className="left flex items-center grow">
                    {/* Menu Icon */}
                    <svg className="w-4 h-4 mr-1 md:mr-3 md:w-6 md:h-6 md:mr-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_iconCarrier"> 
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                        </g>
                    </svg>

                    {/* Task title */}
                    {isEditing ? (
                        <input 
                            type="text" 
                            className="bg-transparent inline-block text-red-300 text-sm md:text-xl w-full focus:outline-none" 
                            ref={inputRef} 
                            value={titleInput} 
                            onChange={(e) => setTitleInput(e.target.value)} 
                            onKeyDown={handleTaskInputKeyDown}
                            onBlur={updateTaskTitle} 
                        />
                    ) : (
                        <span className="text-sm md:text-xl">{titleInput || "untitled"}</span>
                    )}
                </div>
                <div className="right flex md:gap-2">
                    {/* Down Icon */}
                    <svg className="w-4 h-4 mr-1 md:mr-3 md:w-6 md:h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setIsDescriptionOpen((curr) => !curr)} >
                        <g id="SVGRepo_iconCarrier"> 
                            <path d="M7 10L12 15L17 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                        </g>
                    </svg>
                    {/* Edit Icon */}
                    <svg className="w-4 h-4 mr-1 md:mr-3 md:w-6 md:h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" onClick={() => setIsEditing(true)}>
                        <g id="SVGRepo_iconCarrier"> 
                            <path d="M18.3785 8.44975L8.9636 17.8648C8.6844 18.144 8.3288 18.3343 7.94161 18.4117L4.99988 19.0001L5.58823 16.0583C5.66566 15.6711 5.85597 15.3155 6.13517 15.0363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                            </path> 
                        </g>
                    </svg>

                    {/* Delete Icon */}
                    <svg className="w-4 h-4 mr-1 md:mr-3 md:w-6 md:h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" onClick={() => deleteTask(_id)}>
                        <g id="SVGRepo_iconCarrier"> 
                            <path d="M10 11V17" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                            <path d="M14 11V17" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                            <path d="M4 7H20" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                        </g>
                    </svg>
                </div>
            </div>
           {/* Task Description */}
           <div
                className="task-description overflow-hidden"
                id={`desc-${_id}`}
                style={{ maxHeight: descriptionHeight, transition: 'max-height 0.3s ease-out' }}
            >
                <div className="text-gray-400 mt-2">{description || "no description"}</div>
            </div>
        </li>   
    );
}
