import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import style from "./details.module.css";
import { GoTasklist } from 'react-icons/go';
import { IoMdArrowRoundBack } from 'react-icons/io';
export default function Details() {
      const {id}=useParams();
      const [error, setError] = useState(null);
        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);

          const getTaskDetails = async (id) => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/todos/${id}`);
      setData(data);
      console.log(data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskDetails(id);
  }, []);

  return (
  <>

    
    <div className='container'> 
      <Link to={`/all`} className={style.back}><IoMdArrowRoundBack/> Back to tasks</Link>
        <div  className={style.Taskdatils}>

        
           {error? <div className={style.error}>{error}</div> : ' '  }
             <h2 >
          <GoTasklist />  {data.todo}
        </h2>
        <p >
          task Id :  {data.id}
        </p>
       

          <p >
          Is Completed ?   {data.completed ? "Yes" : "No"}
        </p>
</div>
   
    </div>

  </>
 
 

 

  )
}
