import { useEffect, useState } from "react"
import { getDocs } from "firebase/firestore";
import { taskCollectionRef } from "../components/getHomeworks"

const HighPriority = () => {
    const [highPriority, setHighPriority] = useState([]);

    useEffect(() => {
    const HighPriorityTask = async () => {
       try {
        const data = await getDocs(taskCollectionRef);
        const highPriorityTasks = data.docs.filter(doc => doc.data().priority === "high");
        setHighPriority(highPriorityTasks.map((doc) => ({ ...doc.data(), id: doc.id })));
       } catch (err){
        console.log(err);
       }
    }

    HighPriorityTask();
    }, [])
    return (
        <div className="px-5 py-5 m-auto">
        <h1 class="mb-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Here your <span class="text-blue-600">High</span> priority</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
        {highPriority.map((high) => (
            <>
            <div className="block mx-auto mb-6 items-center max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="flex">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 mr-2">{high.name}</h1>
            <div className="w-9 h-9 rounded-full bg-yellow-500 border flex justify-center items-center shadow-lg">
               <h1 className="text-center text-white">H</h1>
            </div>
            </div>
                <div className="border-t">
                <p className="font-medium text-gray-700 mt-2">{high.description}</p>
            </div>
            </div>
              </>
        ))}
        </div>
        </div>
    )
}

export default HighPriority;