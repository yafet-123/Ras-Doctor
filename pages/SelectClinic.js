import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Image from "next/image"
import {useAuth} from './context/AuthContext'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'
import api from './components/api.js'

export async function getServerSideProps(context) {
    const {params,req,res,query} = context
    const token = req.cookies.token
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    const accesstoken = token
    const authaxios = axios.create({
        baseURL : api,
        headers :{
            Authorization : `Bearer ${accesstoken} `
        }
    })
    const data = await authaxios.get(`${api}/clinic`)
    
    return {
        props: {
            Clinic:data.data,
        }, // will be passed to the page component as props
    }
}

export default function SelectClinic({Clinic}) {
    const router = useRouter()
    const [getSearchValue,setgetSearchValue] = useState("")
    const {currentUser} = useAuth()
    const [clinic, setclinic] = useState()
    useEffect(()=>{
        if(!currentUser){
            router.push('/login')
        }
    },[currentUser, router])
    const cookies = new Cookies();

    const selectedClinic = async () => {
        cookies.set('clinic', clinic,{path:'/'})
        router.push('/')
    }
    return (
        <div className={styles.home}>
            <div 
                className="position-absolute top-50 start-50 w-50 h-50 translate-middle border rounded px-5 pt-2 pb-5 d-flex flex-column justify-content-between">
                <InputGroup className="p-3">
                    <Form.Control
                        placeholder="Search By Name"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        className="w-25"
                        valiue={getSearchValue}
                        onChange={(e) => setgetSearchValue(e.target.value)}
                    />      
                </InputGroup>
                <div className="d-flex flex-column w-100 h-100 overflow-auto">
                    {Clinic.filter((val)=>{
                        if(getSearchValue == ""){
                            return val
                        }else if(val.ClinicName.toLowerCase().includes(getSearchValue.toLowerCase())){
                            return val
                        }
                    }).map((data,index)=>(
                        <a className={styles.ClinicButton} key={index} onClick={()=>{
                            setclinic(data.id)
                        }}>{data.ClinicName}</a>
                    ))}
                </div>
                <button type="button" onClick={()=>{selectedClinic()}} className="btn btn-primary">Confirm</button>
            </div>
        </div>
    );
}
