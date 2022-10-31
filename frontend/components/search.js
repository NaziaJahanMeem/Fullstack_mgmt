import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_USERS } from "./queries";
export default function Search(){
    const [filteredData,setFilteredData] = useState([]);
    const handleFilter=(e)=>{
        const searchWord = e.target.value
        const newFilter= data.users.filter((value)=>{
            return (value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.gender.toLowerCase().includes(searchWord.toLowerCase()))
        });
        setFilteredData(newFilter)
    }
    const {loading,error,data}=useQuery(GET_USERS)
    return (
        <>
        <div className='ml-auto w-4/6 scrollbar-hide mt-6'>   
                <label for="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-gray-300">Search</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    
                    <input type="search" id="default-search" placeholder="Search" onChange={handleFilter} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                     
                </div>
                <div className="scrollbar-hide mt-5 w-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden overflow-y-auto">
                   
                    {filteredData.map((user)=>{
                        return(
        
                            <>
                             
                            <tr className="text-center">
                                
                                <td className="px-10 py-2 items-center">
                                    <span className="text-gray-900 text-center ml-2">{user.name}</span>
                                </td>
                                <td className="px-10 py-2 text-black-400">
                                    <span className="text-gray-900">{user.email}</span>
                                </td>
                                <td className="px-10 py-2 text-black-400">
                                    <span className="text-gray-900">{user.phone}</span>
                                </td>
                                <td className="px-10 py-2 text-sky-400">
                                    <span className="text-gray-900">{user.gender}</span>
                                </td>
                                
                            </tr>
                        </>
                        )
                        
                    })}
                </div>
        </div>
        </>
    )
}