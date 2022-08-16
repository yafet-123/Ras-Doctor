import {useState, useEffect} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie';
import Header from '../components/Header'
import SideNavbar from '../components/SideNavbar'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import api from '../components/api.js'
import Modal from 'react-bootstrap/Modal';

export async function getServerSideProps(context) {
    const {params,req,res,query} = context
    const {patient_id_Medical_Record} = query.mrn
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
            clinic :data.data,
        }, // will be passed to the page component as props
    }
}

export default function AddIntrareferral({clinic}) {
    const router = useRouter();
    const { mrn } = router.query
    const [PatientId, setPatientId] = useState(mrn)
    const [ClinicReferTo,setClinicReferTo] = useState("")
    const [Note,setNote] = useState("")
    const cookies = new Cookies();
    const accesstoken = cookies.get('token')
    const getclinic = cookies.get('clinic')
    const [Clinic,setClinic] = useState(getclinic)
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
        setClinicReferTo("")
        setNote("")
    }
    const handlesubmit = async (e)=>{
        e.preventDefault()
        await authaxios.post(`${api}/intrareferral/`,{
            PatientId:parseInt(PatientId),
            Clinic: parseInt(Clinic),
            ClinicReferTo:parseInt(ClinicReferTo),
            Note
        }).then(function (response) {
            handleShow()
            router.push(`/Intrareferral/${PatientId}`)
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div className={styles.home}>
            <SideNavbar mrn={mrn}/>
            <div className={styles.homeContainer}>
                <Header />
                <form onSubmit={handlesubmit} className="bg-light pt-3">
                    <Container>
                          <Row className="my-3">
                             <Col sm>
                                <FloatingLabel controlId="floatingSelect" label="Clinic Refer To">
                                   <Form.Select 
                                      aria-label="Floating label select example"
                                      value = {ClinicReferTo}
                                      onChange={(e) => setClinicReferTo(e.target.value)}
                                      required
                                   >
                                      <option></option>
                                      {clinic.map((data,index)=>(
                                         <option key={index} value={data.id}>{data.ClinicName}</option>
                                      ))}
                                   </Form.Select>
                             </FloatingLabel>
                             </Col>
                          </Row>

                          <Row className="my-3">
                             <Col sm>
                                <FloatingLabel controlId="floatingTextarea2" label="Note">
                                   <Form.Control
                                      as="textarea"
                                      required
                                      placeholder="Note"
                                      style={{ height: '200px' }}
                                      value = {Note}
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
                            <Button type="submit" variant="primary">Submit</Button>
                        </div>
                    </Container>
                    <Modal size="lg" show={show} onHide={handleClose} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                                    <Modal.Header closeButton>
                                        
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h5>Succefully add new Intrareferral</h5>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                </form >
            </div>
        </div>
    )
}

