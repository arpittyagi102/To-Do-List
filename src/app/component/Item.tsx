export default function Item() {
    return (
        <li className="flex justify-between items-center bg-gray-900 rounded-xl px-5 py-3 w-full max-w-[700px] hover:shadow-xl">
            <span className="text-xl">Task 1</span>
            <div className="flex gap-2">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M7 10L12 15L17 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                    </g>
                </svg>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        </path> 
                    </g>
                </svg>
            </div>
        </li>
    )
}