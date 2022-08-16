import { useRouter } from "next/router";
import axios from "axios";
import {useEffect,useState,useRef } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Header from '../components/Header'
import SideNavbar from '../components/SideNavbar'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useReactToPrint} from "react-to-print";
import style from '../../styles/SickLeavePrint.module.css'
import moment from 'moment';
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
	const data = await authaxios.get(`${api}/sickleave/${patient_id_Medical_Record}`)
	
  	return {
    	props: {
	    	sickleave :data.data,
	    }, // will be passed to the page component as props
	}
}
export default function DisplaySickLeave({sickleave}) {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content:()=> componentRef.current
	})
	const [PrintData, setPrintData] = useState([])
	const mrn = sickleave[0].PatientId
	const [show, setShow] = useState(false);
  	const handleClose = () => { setShow(false); }
  	const handleShow = () => setShow(true);
  	const [fullscreen, setFullscreen] = useState(true);
   	return (
      	<div className={styles.home}>
            <SideNavbar mrn={mrn}/>
            <div className={styles.homeContainer}>
                <Header />
		        <Container>
		        	{sickleave.map((data,index)=>(
		        		<div key={index} className="bg-white border my-3 rounded">
		        			<div key={index} className="bg-light border m-3 rounded">
				            	<Row className="p-3">
									<Col md={3} >
										<h6>Created By</h6>
										<p>{data.CreatedBy}</p>
									</Col>
									<Col md={3}>
										<h6>Created Date</h6>
										<p>{data.CreatedDate}</p>
									</Col>

									<Col md={3}>
										<h6>Clinic</h6>
										<p>{data.Clinic}</p>
									</Col>

									<Col md={3}>
										<h6>Total Leave Days</h6>
										<p>{data.TotalLeaveDays}</p>
									</Col>
								</Row>

								<Row className="p-3">
									<Col md={6}>
										<h6>Diagnosis</h6>
										<p>{data.Diagnosis}</p>
									</Col>
									<Col md={6}>
										<h6>Recommendation</h6>
										<p>{data.Recommendation}</p>
									</Col>
								</Row>
							</div>

							<div className="">
                                <Button className="m-3"
									variant="primary" 
									onClick={(index)=>{
						        		handleShow()
						        		setPrintData(data)
						        	}}
						        >
						        	order SickLeave
     						 	</Button>
							</div>
						</div>
		            ))}

		            <Modal size="lg" show={show} onHide={handleClose} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
						<Modal.Header closeButton>
							<Modal.Title>Modal title</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className={style.Print} ref={componentRef}>
		        				<Container>
						            <h4 className="d-flex justify-content-center">
				            			<b>Ras Hospital Management System<br />ራስ ሆስፒታል ማኔጅመንት መተግበሪያ</b>
				          			</h4>

				          			<h5 className="d-flex justify-content-center">
				          				የሕክምና ምስክር ወረቀት<br/>Medical Certificate
				          			</h5>

				          			<div className="d-flex justify-content-between">
					          				<div className="d-flex flex-column">
										      	<h6>Address<br />አድራሻ</h6>
										      	<p>
										      		Addis Ababa, Ethiopia
										      	</p>
										    </div>
										    <div className="d-flex flex-column">
										        <h6>Phone<br />ስልክ</h6>
										        <p>
										          	+251-911-123-456
										        </p>
										    </div>

										    <div className="d-flex flex-column">
										        <h6>Email<br/>ኢሜል</h6>
										        <p>
													someone@gmail.com
										        </p>
										    </div>
										    <div className="d-flex flex-column">
										        <h6>Postal<br />ፖ.ሳ.ቁ</h6>
										        <p>
										          	01234
										        </p>
										    </div>
				      				</div>

					      			<div className="d-flex justify-content-between">
					          				<div md={3} className="d-flex flex-column">
										      	<h6>MRN<br />መ.ቁ</h6>
										      	<p>
										      		{PrintData.PatientId}
										      	</p>
										    </div>
										    <div md={3} className="d-flex flex-column">
										        <h6>Full Name<br />ሙሉ ስም</h6>
										        <p>
										          	{PrintData.Name}
										        </p>
										    </div>
										    <div md={3} className="d-flex flex-column">
										        <h6>Age<br />እድሜ</h6>
										        <p>
													age
										        </p>
										    </div>
										    <div md={3} className="d-flex flex-column">
										        <h6>Gender<br />ጾታ</h6>
										        <p>
										          	sex
										        </p>
										    </div>
					      			</div>

				      				<div className="d-flex flex-column">
									    <h6>Diagnosis | Injury<br />የበሽታው አይነት | የደረሰበት ጉዳት ልክ</h6>
									    <p className="fs-6">
									    	{PrintData.Diagnosis}
									    </p>
									</div>

									<div className="d-flex flex-column">
									    <h6>Dr's Recommendation <br />የሓኪሙ አስተያየት</h6>
									    <p id="address" name="address">
									    	{PrintData.Recommendation}
									    </p>
				      				</div>

				      				<div className="d-flex justify-content-between">
				      					 <div className="d-flex flex-column">
										        <h6>Date of Examination</h6>
										        <p>
													{PrintData.CreatedDate}
										        </p>
										    </div>

									    <div className="d-flex flex-column">
									        <h6>Doctor's Name<br />የሓኪሙ ሙሉ ስም</h6>
									        <p>
												{PrintData.CreatedBy}
									        </p>
									    </div>
				      				</div>
      							</Container>
        					</div>	
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" onClick={handlePrint}>
								Print
							</Button>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
		            
		        </Container>
      		</div>
  		</div>
  	)	
}