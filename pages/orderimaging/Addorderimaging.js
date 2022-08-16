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
import Multiselect from 'multiselect-react-dropdown';
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
    const data = await authaxios.get(`${api}/radrequest`)
    
    return {
        props: {
            radrequest :data.data,
        }, // will be passed to the page component as props
    }
}

export default function Addorderimaging({radrequest}) {
    const router = useRouter();
    console.log(radrequest)
    const { mrn } = router.query
    const MRI = radrequest.mri
    const CT = radrequest.ct
    const XRAY = radrequest.xray
    const US = radrequest.us
    const [PatientId, setPatientId] = useState(mrn)
    const [RequestId,setRequestId] = useState([])
    const [AdditionalInformation,setAdditionalInformation] = useState("")
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

    const handleClear1=()=>{
        setRequestId([])
        setAdditionalInformation("")
    }
    const handlesubmit = async (e)=>{
        e.preventDefault()
        await authaxios.post(`${api}/orderimaging/`,{
            PatientId:parseInt(PatientId),
            RequestId,
            Clinic: parseInt(clinic),
            AdditionalInformation
        }).then(function (response) {
            handleShow()
            router.push({
                pathname: `/orderimaging/Display/`,
                query: { mrn: PatientId },
            })
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
                                <Col md="6">
                                   <Multiselect
                                      displayValue="Name"
                                      placeholder = "select MRI"
                                      required
                                      onKeyPressFn={function noRefCheck(){}}
                                      onRemove={function noRefCheck(){}}
                                      onSearch={function noRefCheck(){}}
                                      onSelect={(e)=>{
                                         e.map((data,index)=>(
                                            setRequestId([...RequestId, data.id])
                                         ))
                                      }}
                                      options={MRI}
                                   />
                                </Col>

                                <Col md="6">
                                   <Multiselect
                                      displayValue="Name"
                                      placeholder = "select CT"
                                      required
                                      onKeyPressFn={function noRefCheck(){}}
                                      onRemove={function noRefCheck(){}}
                                      onSearch={function noRefCheck(){}}
                                      onSelect={(e)=>{
                                         e.map((data,index)=>(
                                            setRequestId([...RequestId, data.id])
                                         ))
                                      }}
                                      options={CT}
                                   />
                                </Col>

                          </Row>
                          <Row>

                             <Col md="6">
                                <Multiselect
                                      displayValue="Name"
                                      onKeyPressFn={function noRefCheck(){}}
                                      onRemove={function noRefCheck(){}}
                                      onSearch={function noRefCheck(){}}
                                      placeholder = "select XRAY"
                                      required
                                      onSelect={(e)=>{
                                         e.map((data,index)=>(
                                            setRequestId([...RequestId, data.id])
                                         ))
                                      }}
                                      options={XRAY}
                                   />
                             </Col>

                             <Col md="6">
                                <Multiselect
                                      displayValue="Name"
                                      onKeyPressFn={function noRefCheck(){}}
                                      onRemove={function noRefCheck(){}}
                                      onSearch={function noRefCheck(){}}
                                      required
                                      placeholder = "select US"
                                      onSelect={(e)=>{
                                         e.map((data,index)=>(
                                            setRequestId([...RequestId, data.id])
                                         ))
                                      }}
                                      options={US}
                                   />
                             </Col>
                          </Row>
                          <Row className="my-3">
                             <Col sm>
                                <FloatingLabel controlId="floatingTextarea2" label="Additional Information">
                                   <Form.Control
                                      as="textarea"
                                      placeholder="Additional Information"
                                      style={{ height: '200px' }}
                                      required
                                      value = {AdditionalInformation}
                                      onChange={(e) => setAdditionalInformation(e.target.value)}
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
                                        <h5>Succefully add new Imaging</h5>
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

