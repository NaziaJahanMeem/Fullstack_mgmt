import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BiUserPlus } from 'react-icons/bi';
import Users from '../components/Users';
import AddUser from '../components/AddUser';

import { useState } from 'react';

const cache = new InMemoryCache({
  typePolicies: {
    Query:{
      fields:{
        users:{
          merge(existing,incoming){
            return incoming;
          }
        }
      }
    }
  }
});
const user= new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache,
})
export default function Home() {
  const [visible,setVisible] = useState(false)
  const handler=()=>{
    setVisible(visible? false:true)
  }
  return (
    <>
    <ApolloProvider client={user}>
    <section>
      <main className='py-5'>
          <h1 className='text-xl md:text-5xl text-center font-bold py-5 text-black'>User Management</h1>
          <div className="mx-40 justify-between py-5 border-b">
            <div className="left flex gap-3">
              <button onClick={handler} className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800">
                Add User <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
              </button>
              
            </div>
          </div>
          <div>
            
            {visible? <AddUser />: <></>}
          </div>
          
          <div className='mx-40'>
            
            <Users />
          </div>
        </main>
      
    </section>
    </ApolloProvider>
    </>
  )
}