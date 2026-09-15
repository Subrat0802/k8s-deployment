import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState([]);

  const getTodos = async () => {
    try{
      const response = await fetch("/api/v1/todo");
      const data = await response.json();
      setCount(data.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className='bg-black w-full h-screen'>
        <p className='text-white font-bold text-4xl'>Subrat Mishra</p>
        <p className='text-white flex justify-center items-center h-screen'>
          {count.map((todo) => (
            <div key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
          ))}
        </p>
      </div>
    </>
  )
}

export default App
