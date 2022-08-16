import {useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { AiOutlineSend } from 'react-icons/ai';
import axios from "axios";
import Header from '../components/Header'
import SideNavbar from '../components/SideNavbar'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import api from '../components/api.js'
import Modal from 'react-bootstrap/Modal';

export default function AddPrescription(){
	const router = useRouter();
    const { mrn } = router.query
   	const [PatientId, setPatientId] = useState(mrn)
	const [Medication,setMedication] = useState("")
	const [Strength,setStrength] = useState("")
	const [AmountToBeTaken, setAmountToBeTaken] = useState("")
	const [Frequency,setFrequency]= useState("")
	const [Route,setRoute] = useState("")
	const [HowMuch, setHowMuch] = useState("")
	const [Refills,setRefills]= useState("")
	const [Note, setNote] = useState("")
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
    const handleClear1 = ()=>{
        setMedication("")
        setStrength("")
        setAmountToBeTaken("")
        setFrequency("")
        setRoute("")
        setHowMuch("")
        setRefills("")
        setNote("")
    }

	const handlesubmit = async (e)=>{
      	e.preventDefault()
      	await authaxios.post(`${api}/prescription/`,{
        	PatientId:parseInt(PatientId),
    		Medication: Medication,
    		Strength: Strength,
    		AmountToBeTaken: AmountToBeTaken,
    		Frequency: Frequency,
    		Route: Route,
    		HowMuch: HowMuch,
    		Refills: Refills,
    		Note: Note,
    		clinic: parseInt(clinic)
     	}).then(function (response) {
        	handleShow()
         	router.push(`/Prescription/${PatientId}`)
      	}).catch(function (error) {
        	console.log(error);
     	});
   	}
	return(
		<div className={styles.home}>
            <SideNavbar mrn={mrn}/>
            <div className={styles.homeContainer}>
                <Header />
    			<form onSubmit={handlesubmit} className="pt-3">
    			  	<Container>
    			  		<Row className="my-3">
    			  			<Col sm>
                               <FloatingLabel controlId="floatingInput" label="Medication">
                                   <Form.Control 
                                     type="text" 
                                     placeholder="Medication" 
                                     value = {Medication}
                                     required
                                     onChange={(e) => setMedication(e.target.value)}
                                  />
                                </FloatingLabel>
                            </Col>

                            <Col sm>
                               <FloatingLabel controlId="floatingInput" label="Strength">
                                   <Form.Control 
                                     type="text" 
                                     placeholder="Strength" 
                                     value = {Strength}
                                     required
                                     onChange={(e) => setStrength(e.target.value)}
                                  />
                                </FloatingLabel>
                            </Col>

                            <Col sm>
                               <FloatingLabel controlId="floatingInput" label="Amount To Be Taken">
                                   <Form.Control 
                                     type="text" 
                                     placeholder="Amount To Be Taken" 
                                     value = {AmountToBeTaken}
                                     required
                                     onChange={(e) => setAmountToBeTaken(e.target.value)}
                                  />
                                </FloatingLabel>
                            </Col>
    			  		</Row>

    			  		<Row className="my-3">
    			  			<Col sm>
                               <FloatingLabel controlId="floatingInput" label="Frequency">
                                   <Form.Control 
                                     type="text" 
                                     placeholder="Frequency" 
                                     value = {Frequency}
                                     required
                                     onChange={(e) => setFrequency(e.target.value)}
                                  />
                                </FloatingLabel>
                            </Col>

                            <Col sm>
                               <FloatingLabel controlId="floatingInput" label="Route">
                                   <Form.Control 
                                     type="text" 
                                     placeholder="Route" 
                                     value = {Route}
                                     required
                                     onChange={(e) => setRoute(e.target.value)}
                                  />
                                </FloatingLabel>
                            </Col>

                            <Col sm>
                               <FloatingLabel controlId="floatingInput" label="How Much">
                                   <Form.Control 
                                     type="text" 
                                     placeholder="How Much" 
                                     value = {HowMuch}
                                     required
                                     onChange={(e) => setHowMuch(e.target.value)}
                                  />
                                </FloatingLabel>
                            </Col>

                            <Col sm>
                               <FloatingLabel controlId="floatingInput" label="Refills">
                                   <Form.Control 
                                     type="text" 
                                     placeholder="Refills" 
                                     value = {Refills}
                                     required
                                     onChange={(e) => setRefills(e.target.value)}
                                  />
                                </FloatingLabel>
                            </Col>
    			  		</Row>

    			  		<Row className="my-3">
    			  			<Col sm>
                            	<FloatingLabel controlId="floatingTextarea2" label="Note">
                               		<Form.Control
                                  		as="textarea"
                                  		placeholder="Note"
                                  		style={{ height: '200px' }}
                                  		value={Note}
                                        required
                                  		onChange={(e) => setNote(e.target.value)}
                               		/>
                            	</FloatingLabel>
                         	</Col>
    			  		</Row>

    			  		<div className="d-flex justify-content-between mb-5">
                            <div>
                               <button type="button" className="btn btn-warning" onClick={handleClear1}>Clear</button>
                               <Link href={{pathname: `/patient/${encodeURIComponent(mrn)}`}}  >   
                                  <a type="button" className="btn btn-danger mx-5">
                                     <span>Cancel</span> 
                                  </a>          
                               </Link>
                            </div>
                            <Button type="submit" variant="primary">Prescribe</Button>
                         </div>
    			    </Container>

                    <Modal size="lg" show={show} onHide={handleClose} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                        <Modal.Header closeButton>
                                        
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Succefully add new Prescription</h5>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>    
    			</form>
            </div>
		</div>

	)
}
