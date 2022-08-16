import { useRouter } from "next/router";
import axios from "axios";
import {useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Header from '../components/Header'
import SideNavbar from '../components/SideNavbar'
import styles from '../../styles/Home.module.css'
import api from '../components/api.js'

export async function getServerSideProps(context) {
	const {params,req,res,query} = context
	const {patient_id_Medical_Record} = params
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
	const data = await authaxios.get(`${api}/intrareferral/${patient_id_Medical_Record}`)
	
  	return {
    	props: {
	    	intrareferral :data.data,
	    }, // will be passed to the page component as props
	}
}

export default function DisplayIntrareferral({intrareferral}) {
	const mrn = intrareferral[0].PatientId
   	return (
      	<div className={styles.home}>
      		<SideNavbar mrn={mrn}/>
       		<div className={styles.homeContainer}>
        	  	<Header />
		        <Container>
		        	{intrareferral.map((data,index)=>(
		        		<div key={index} className="bg-white border my-3 rounded">
		        			<div className="bg-light border m-3 rounded">
				            	<Row className="p-3">
									<Col md={3} >
										<h5>Created By</h5>
										<p>{data.CreatedBy}</p>
									</Col>
									<Col md={3}>
										<h5>Created Date</h5>
										<p>{data.CreatedDate}</p>
									</Col>

									<Col md={3}>
										<h5>Clinic</h5>
										<p>{data.Clinic}</p>
									</Col>

									<Col md={3} >
										<h5>Clinic Refered To</h5>
										<p>{data.ClinicReferedTo}</p>
									</Col>
								</Row>

								<Row className="p-3">
									<Col md={12}>
										<h5>Note</h5>
										<p>{data.Note}</p>
									</Col>

								</Row>
							</div>
						</div>
		            ))}
		        </Container>
	      	</div>
	    </div>
  	)
}