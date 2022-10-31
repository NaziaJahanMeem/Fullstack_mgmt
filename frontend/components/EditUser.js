import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_USER } from "./mutations";
import { GET_USERS } from "./queries";
export default function EditUser({visible,onClose,id,name,email,phone}){
    
    const [uname,setName]=useState(name);
    const [uemail,setEmail]=useState(email);
    const [uphone,setPhone]=useState(phone);
    const [egender,setGender]= useState('');
    const [updateUser]=useMutation(UPDATE_USER,{
        
        variables:{id:id,name:uname,email:uemail,phone:uphone,gender:egender},
        refetchQueries:[{query:GET_USERS}],
        
    })
    const handleonClose=()=>{
        onClose();
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        if(uname==='' || uemail===''||uphone===''|| egender===''){
            return alert('Please fill in all fields');
        }
        updateUser(id,uname,uemail,uphone,egender);
        return alert('Data is Updated Successfully');
    }
    if(!visible) return null;
    
    return (
         
        
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-gray-200 p-2 rounded w-90">
                    <button className="bg-black bg-opacity-60 hover:bg-gray-100 text-white-800 font-semibold py-2 px-4 right-0" onClick={onClose}>X</button>
                    <form onSubmit={onSubmit}>
                    <div className="input-type w-5/6">
                        <input type="text" id="name" placeholder="Enter Name" className="border w-full px-5 py-3 m-5 focus:outline-none rounded-md"
                        value={uname} onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="input-type w-5/6">
                        <input type="text" id="email" placeholder="Enter Email" className="border w-full px-5 py-3 m-5 focus:outline-none rounded-md" 
                        value={uemail} onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-type w-5/6">
                        <input type="text" id="phone" placeholder="Enter Phone" className="border w-full px-5 py-3 m-5 focus:outline-none rounded-md"
                        value={uphone} onChange={(e)=>setPhone(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-10 items-center">
                        <label htmlFor="gender" className="m-5 text-black font-semibold">Gender</label>
                        <div className="m-4 form-check">
                            <input type="radio" name="egender" id="radio-1" className="mr-2 form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left curson-pointer" 
                            value='Male' onChange={(e)=>setGender(e.target.value)}
                            />
                            <label htmlFor="radio-1" className="text-black">Male</label>

                        </div>
                        <div className="m-4 form-check">
                            <input type="radio" name="egender" id="radio-2" className="mr-2 form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left curson-pointer"
                            value='Female' onChange={(e)=>setGender(e.target.value)} 
                            />
                            <label htmlFor="radio-2" className="text-black">Female</label>

                        </div>
                    </div>
                    <button type='submit' className="mx-80 flex justify-center text-md w-1/6 bg-indigo-600 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Submit</button>
                    </form>
                
                </div>
                
            </div>
        
      );
}
