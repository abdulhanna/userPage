import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import "./user.css";


function UserPage() {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const getData = async()=>{
        const res = await axios.get("https://reqres.in/api/users?page=2");
        console.log(res.data.data);
        setData(res.data.data);
    }

    useEffect(()=>{
        getData();
    },[])

    

    const userPerPage = 1
    const pagesVisited = pageNumber * userPerPage

    const displayUsers = data.slice(pagesVisited, pagesVisited + userPerPage).map((cur) => {
        return (<div className="col-lg-12 mb-3">
            <div className="card">
                <div className="card-body">
                    <h3>{cur.id}</h3> 
                    <img src={cur.avatar} className="image" alt="img" />
                   
                    <h4> First Name:-<span className="detail">{cur.first_name}</span></h4>
                    <h4> Last Name:-<span className="detail">{cur.last_name}</span></h4>
                    <h4> Email :- <span className="detail">{cur.email}</span></h4> 

                </div>
            </div>
        </div>)
    })

    const pageCount = Math.ceil(data.length / userPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);

    };

    return (
        <div className="container py-4">
            <div className="row">
                {
                    displayUsers
                }
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />


            </div>

        </div>
    )
}

export default UserPage
