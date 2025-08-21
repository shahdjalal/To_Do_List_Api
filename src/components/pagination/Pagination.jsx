import React from 'react'
import style from "./pagination.module.css";
export default function Pagination({totalTasks , tasksPerPage,setCurrentPage ,currentPage}) {

    let pages =[ ];

    for(let i = 1 ; i<= Math.ceil(totalTasks/tasksPerPage)  ; i++){
pages.push(i)
    }
  return (
    <div className={style.pagination}>
        {pages.map((page , index)=>{
return <button key={index} onClick={()=>setCurrentPage(page)} className={page === currentPage ? style.active : ""}>{page}</button>
        })}
    </div>
  )
}
