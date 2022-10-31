import { useMutation } from "@apollo/client";
import { useState } from "react";
import FileBase from 'react-file-base64';
import { ADD_USER } from './mutations';
import { GET_USERS } from './queries';
export default function AddUser(){
    const [image,setImage]=useState('');
    const [name,setName]=useState('');
    const [email,setEmail]= useState('');
    const [phone,setPhone]=useState('');
    const [gender,setGender]=useState('');
    const [addUser]=useMutation(ADD_USER,{
        variables:{name,email,phone,gender,image},
        
        update(cache,{data:{addUser}}){
            const {users} = cache.readQuery({query: GET_USERS});
            cache.writeQuery({
                query:GET_USERS,
                data:{users:[...users,addUser]}
            });
        }
    });
    
    const onSubmit=(e)=>{
        e.preventDefault();
        
        
        if( name==='' || email===''||phone===''|| gender==='' || image===''){
            return alert('Please fill in all fields');
        }
        console.log(name,email,phone,gender,image)
        addUser(name,email,phone,gender,image);
        setName('');
        setEmail('');
        setPhone('');
        setGender('');
        setImage('');
        e.target.reset()
        
    }
    return(

        <form className="ml-40" onSubmit={onSubmit}>
            <div className="input-type w-3/6">
                <input type="text" id="name" placeholder="Enter Name" className="border w-full px-5 py-3 m-5 focus:outline-none rounded-md"
                value={name} onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className="input-type w-3/6">
                <input type="text" id="email" placeholder="Enter Email" className="border w-full px-5 py-3 m-5 focus:outline-none rounded-md" 
                value={email} onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="input-type w-3/6">
                <input type="text" id="phone" placeholder="Enter Phone" className="border w-full px-5 py-3 m-5 focus:outline-none rounded-md"
                value={phone} onChange={(e)=>setPhone(e.target.value)}
                />
            </div>
            <div className="flex gap-10 items-center">
                <label htmlFor="gender" className="m-5 font-semibold text-black">GENDER</label>
                <div className="m-4 form-check">
                    <input type="radio" name="gender" id="radio-1" className="mr-2 form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-black checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left curson-pointer" 
                    value='Male' onChange={(e)=>setGender(e.target.value)}/>
                    <label htmlFor="radio-1" className="text-black">Male</label>

                </div>
                <div className="m-4 form-check">
                    <input type="radio" name="gender" id="radio-2" className="mr-2 form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-black checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left curson-pointer"
                    value='Female' onChange={(e)=>setGender(e.target.value)} />
                    <label htmlFor="radio-2" className="text-black">Female</label>

                </div>
            </div>
            <div className="ml-5">
                <FileBase 
                    type="file" multiple={false} onDone={({base64}) =>setImage(base64)}
                />
            </div>
            <button className="mx-80 flex justify-center text-md w-1/6 bg-green-600 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Submit</button>
        </form>
    )
}