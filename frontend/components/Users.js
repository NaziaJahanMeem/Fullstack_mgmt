import { useQuery } from "@apollo/client";
import {useState} from 'react'
import EditUser from "./EditUser";
import { GET_USERS } from "./queries";
import UserRow from "./UserRow";
import Pagination from "./pagination";
import { paginate } from "./paginate";
import Search from "./search";
export default function Users(){
    const [posts,setPosts]=useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const pageSize=3;
    const handlePageChange=page=>{
        setCurrentPage(page)
    }
    const {loading,error,data}=useQuery(GET_USERS)
    if(loading) return <p>Loading..</p>
    if(error) return <p>Something went wrong</p>
    const paginatePosts=paginate(data.users,currentPage,pageSize);
    return (
        <>
        <div>
            <Search />
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