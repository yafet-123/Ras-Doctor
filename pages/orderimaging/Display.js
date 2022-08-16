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
	const patient_id_Medical_Record = query.mrn
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
	const data = await authaxios.get(`${api}/orderimaging/${patient_id_Medical_Record}`)
	
  	return {
    	props: {
	    	orderimaging:data.data,
	    }, // will be passed to the page component as props
	}
}

export default function Displayorderimaging({orderimaging}) {
	const router = useRouter();
	const { mrn } = router.query
	const [id, setid]= useState()
	const IdList = []
	orderimaging.map((data)=>(
		IdList.push(data.Id)
	))
	const withOutDuplicateId = [...new Set(IdList)];
	const groupBy = keys => array =>
  		array.reduce((objectsByKeyValue, obj) => {
    		const value = keys.map(key => obj[key]).join('-');
    		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    		return objectsByKeyValue;
  	}, {});

  	const groupById = groupBy(['Id']);
  	const orderimagingGroupById = groupById(orderimaging)
   	return (
      	<div className={styles.home}>
      		<SideNavbar mrn={mrn}/>
       		<div className={styles.homeContainer}>
          		<Header />
        		<Container>
        			{withOutDuplicateId.map((number,id)=>(
        				<div className="bg-white border my-5 rounded">
        					<div className="bg-light border m-3 rounded p-3">
			        			{orderimagingGroupById[number].map((data,index)=>(
			        				<div key={index} className="bg-white border my-3 rounded">
				            			<Row className="p-3">
												<Col md={4} >
													<h5>Created By</h5>
													<p>{data.CreatedBy}</p>
												</Col>
												<Col md={4}>
													<h5>Created Date</h5>
													<p>{data.CreatedDate}</p>
												</Col>

												<Col md={4}>
													<h5>Clinic</h5>
													<p>{data.Clinic}</p>
												</Col>
											</Row>

											<Row className="p-3">
												<Col md={12}>
													<h5>Request</h5>
													<p>{data.RequestName}</p>
												</Col>
											</Row>
									</div>
			          			))}
			          		</div>
			          	</div>
			        ))}
            	</Container>
      		</div>
      	</div>
    )
}