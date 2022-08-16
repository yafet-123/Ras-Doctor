import {useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineSend } from 'react-icons/ai';
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Header from '../components/Header'
import SideNavbar from '../components/SideNavbar'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../components/api.js'
export default function AddSickLeave() {
	const router = useRouter();
  	const { mrn } = router.query
  	const [PatientId, setPatientId] = useState(mrn)
	const [Diagnosis,setDiagnosis] = useState("")
	const [Recommendation,setRecommendation] = useState("")
	const [TotalLeaveDays, setTotalLeaveDays] = useState("")
  	const cookies = new Cookies();
	const accesstoken = cookies.get('token')
	const getclinic = cookies.get('clinic')
  	const [clinic,setClinic] = useState(getclinic)
  	const authaxios = axios.create({
    baseURL : api,
    headers :{
      Authorization : `Bearer ${accesstoken} `
    }
  })
  	const [show, setShow] = useState(false);
  	const handleClose = () => { 
  		setShow(false)
  	}
  	const handleShow = () => setShow(true);
   const handleClear = ()=>{
    		
    }
   	const handlesubmit = async (e)=>{
      	e.preventDefault()
      	await authaxios.post(`${api}/sickleave/`,{
        	PatientId:parseInt(PatientId),
    			Diagnosis:Diagnosis,
    			Recommendation: Recommendation,
    			TotalLeaveDays: parseInt(TotalLeaveDays),
    			clinic: parseInt(clinic)
     	}).then(function (response) {
        		router.push(`/SickLeave/${PatientId}`)
      	}).catch(function (error) {
        	console.log(error);
     	});
   	}
	return(
		<div className={styles.home}>
      <SideNavbar mrn={mrn}/>
       <div className={styles.homeContainer}>
          <Header />
		  		<form onSubmit={handlesubmit} className="bg-light pt-3">
		  			<Container>
			  		 	<Row className="my-3">
	                     	<Col sm>
	                        	<FloatingLabel controlId="floatingTextarea2" label="Diagnosis">
	                           		<Form.Control
	                              		as="textarea"
	                              		placeholder="Diagnosis"
	                              		style={{ height: '200px' }}
	                              		value={Diagnosis}
	                              		required
	                              		onChange={(e) => setDiagnosis(e.target.value)}
	                           		/>
	                        	</FloatingLabel>
	                     	</Col>

	                     	<Col sm>
	                        	<FloatingLabel controlId="floatingTextarea2" label="Recommendation">
	                           		<Form.Control
	                              		as="textarea"
	                              		placeholder="Recommendation"
	                              		style={{ height: '200px' }}
	                              		value={Recommendation}
	                              		required
	                              		onChange={(e) => setRecommendation(e.target.value)}
	                           		/>
	                        	</FloatingLabel>
	                     	</Col>
	                  	</Row>

	                  	<Row className="my-3">
	                     	<Col sm>
	                           <FloatingLabel controlId="floatingInput" label="Total Leave Days">
	                               	<Form.Control 
	                                	type="text" 
	                                 	placeholder="Total Leave Days" 
	                                 	value = {TotalLeaveDays}
	                                 	onChange={(e) => setTotalLeaveDays(e.target.value)}
	                                 	required
	                              	/>
	                            </FloatingLabel>
	                        </Col>
	                  	</Row>

                  		<div className="d-flex justify-content-between mb-5">
                            <div>
                               <button type="button" className="btn btn-warning" onClick={handleClear}>Clear</button>
                               <Link href={{pathname: `/patient/${encodeURIComponent(mrn)}`}}  >   
                                  <a type="button" className="btn btn-danger mx-5">
                                     <span>Cancel</span> 
                                  </a>          
                               </Link>
                            </div>
                            <Button type="submit" variant="primary">Submit</Button>
                        </div>

                        <Modal size="lg" show={show} onHide={handleClose} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
									<Modal.Header closeButton>
										<Modal.Title>Modal title</Modal.Title>
									</Modal.Header>
									<Modal.Body>

									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose}>
											Close
										</Button>
									</Modal.Footer>
								</Modal>		  		 	
                  </Container>
		    	</form>
	    </div>
	  </div>
	)
}
