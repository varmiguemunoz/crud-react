const AddHomeWorks = ({setName, setDescription, setPriority, createTask, error}) => {
    return (
        <div className="px-4 py-4 w-full text-center">
        {error && <div className="border rounded-lg bg-red-300 px-3 py-3">
            <h1 className="text-lg font-bold text-white">{error}</h1>
        </div>}
            <input placeholder="Title" onChange={(event) => setName(event.target.value)} className="border rounded-md shadow-lg md:h-10 md:w-36 w-20  px-2 py-2 mr-2"/>
            <input placeholder="Description" onChange={(event) => setDescription(event.target.value)} className="border rounded-md shadow-lg md:h-10 md:w-36 w-20  px-2 py-2 mr-2"/>
            <select placeholder="Priority" onChange={(event) => setPriority(event.target.value)} className="border rounded-md shadow-lg md:h-10 md:w-36 w-20 px-2 py-2 mr-2">
            <option value="">Choose Priority...</option>
            <option value="Low">Low</option>
            <option value="high">High</option>
            </select>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createTask}>
            <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Icon description</span>
            </button>
        </div>
    )
}

export default AddHomeWorks;
