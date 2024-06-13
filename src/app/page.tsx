import Item from "./component/Item";

export default function Home() {
  return (
    <main className="bg-gray-800 h-screen w-screen flex flex-col items-center">
      <div className="mt-10 w-11/12 max-w-[800px]">
        <h1 className="text-5xl self-start m-6">Arpit's To-Do List</h1>

        <div className="bg-gray-700 p-4 rounded-lg shadow-lg rounded-b-none w-full">
          <ul className="flex flex-col items-center justify-center mt-4 gap-2">
            <Item />
            <Item />
            <Item />
          </ul>
        </div>

        <div className="flex justify-between items-center bg-slate-300 text-black bg-b rounded-t-none rounded-xl px-5 py-3 w-full hover:shadow-xl">
          <input className="bg-transparent text-xl focus:outline-none placeholder:text-gray-600" placeholder="Enter new Task"/>
        </div>
      </div>
    </main>
  );
}
