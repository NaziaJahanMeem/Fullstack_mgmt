import { useQuery } from "@apollo/client";
import { useState } from 'react';
import { USERQUERY } from "./mutations";
import { paginate } from "./paginate";
import Pagination from "./pagination";
import { GET_USERS } from "./queries";
import UserRow from "./UserRow";
export default function Users(){
    const [searchName, setSearchName] = useState("");
    const [posts,setPosts]=useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const pageSize=3;
    const handlePageChange=page=>{
        setCurrentPage(page)
    }
    const { name } = useQuery(USERQUERY, {
        variables: { name:searchName },
    });
    const createSearch = (e) => {
        e.preventDefault();
        setSearchName(e.target.value);
        console.log(searchName)
      };
      
    const {loading,error,data}=useQuery(GET_USERS)
    if(loading) return <p>Loading..</p>
    if(error) return <p>Something went wrong</p>
    let paginatePosts=paginate(data.users,currentPage,pageSize);
    return (
        <>
        <div className='ml-auto w-4/6 scrollbar-hide mt-6'>   
            <label for="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <input type="search" id="default-search" placeholder="Search"onChange={createSearch}  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                 
            </div>
        </div>
        {!loading && !error && (
            
            <table className="min-w-full table-auto mt-10">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Image</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Email</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Phone</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Gender</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Action</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
               
                {paginatePosts.map(user=>(
                     
                    <UserRow key={user.id} user={user} />
                    
                ))}
            </tbody>
            <Pagination items={data.users.length} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
        </table>
        )}
        </>
    )
}