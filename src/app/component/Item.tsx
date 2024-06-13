import React, { useState, useRef, useEffect } from "react";

export default function Item({ _id, title, description, marked, dueDate, deleteTask }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [titleInput, setTitleInput] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Focus the input field when entering edit mode
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleTaskInputKeyDown = async (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            updateTaskTitle();
        }
    };

    const updateTaskTitle = async () => {
        // Update the task title locally
        setTitleInput(titleInput);
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
        <li className="flex justify-between items-center bg-gray-900 rounded-xl px-5 py-3 w-full max-w-[700px] hover:shadow-xl">
            <div className="left flex items-center">
                {/* Menu Icon */}
                <svg width="24px" height="24px" className="mr-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                </svg>

                {/* Task title */}
                {isEditing ? (
                    <input 
                        type="text" 
                        className="bg-transparent inline-block text-white text-xl w-full focus:outline-none focus:border-b-2" 
                        ref={inputRef} 
                        value={titleInput} 
                        onChange={(e) => setTitleInput(e.target.value)} 
                        onKeyDown={handleTaskInputKeyDown}
                        onBlur={updateTaskTitle} 
                    />
                ) : (
                    <span className="text-xl">{titleInput || "untitled"}</span>
                )}
            </div>
            <div className="flex gap-2">
                {/* Down Icon */}
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M7 10L12 15L17 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                </svg>
                {/* Edit Icon */}
                <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" onClick={() => setIsEditing(true)} className="cursor-pointer">
                    <g id="SVGRepo_iconCarrier"> 
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#ffffff"></path> 
                    </g>
                </svg>

                {/* Delete Icon */}
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" onClick={() => deleteTask(_id)} className="cursor-pointer">
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M10 11V17" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                        <path d="M14 11V17" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                        <path d="M4 7H20" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                        <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                </svg>
            </div>
        </li>
    );
}
