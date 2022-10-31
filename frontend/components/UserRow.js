import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useState } from 'react';
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import EditUser from './EditUser';
import { DELETE_USER } from "./mutations";
import { GET_USERS } from './queries';
export default function UserRow({user}){
    console.log(user)
    const [showModal,setShowModal]=useState(false);
    
    const handleClose=()=> setShowModal(false);
    const [deleteUser]= useMutation(DELETE_USER,{
        
        variables:{id:user.id},
        update(cache,{data:{deleteUser}}){
            const {users}=cache.readQuery({query:GET_USERS});
            cache.writeQuery({
                query:GET_USERS,
                data:{users:users.filter(user=>user.id!==deleteUser.id)}
            });
        }
    });
    
    return(
        
        <>
         
        <tr className="bg-black-50 text-center">
            <td className="px-16 py-2 text-sky-700">
                <span><Image src={user.image} alt="Preview" width={70} height={70} /></span>
            </td>
            <td className="px-16 py-2 text-sky-700">
                <span className="text-center ml-2 font-semibold">{user.name}</span>
            </td>
            <td className="px-16 py-2 text-sky-700">
                <span>{user.email}</span>
            </td>
            <td className="px-16 py-2 text-sky-700">
                <span>{user.phone}</span>
            </td>
            <td className="px-16 py-2 text-sky-700">
                <span>{user.gender}</span>
            </td>
            <td className="py-2 flex justify-between">
                <div> 
                <button onClick={()=>setShowModal(true)} className="pl-20 pt-5">
                    <BiEdit size={25} color={"rgb(0,204,0)"}></BiEdit>
                    
                </button>
                
                <EditUser onClose={handleClose} visible={showModal} {...user} />
                </div>

                <button onClick={deleteUser} className='pt-3 pr-20 pl-5'>
                    <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                </button>
            </td>
        </tr>
    </>
    )
}