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
    const data = await authaxios.get(`${api}/diagnosislist`)
    
    return {
        props: {
            DiagnosisList :data.data,
        }, // will be passed to the page component as props
    }
}

export default function AddMedicalRecord({DiagnosisList}) {
   const router = useRouter();
   const { mrn } = router.query
   const [PatientId, setPatientId] = useState(mrn)
   const [Blood_Pressure_BP_,setBlood_Pressure_BP_] = useState("")
   const [Pulse_Rate_PR_,setPulse_Rate_PR_] = useState("")
   const [HistoryNote,setHistoryNote] = useState("")
   const [Respiration_Rate_RR_,setRespiration_Rate_RR_] = useState("")
   const [Saturation_of_Oxygen_in_the_Blood_SPO2_,setSaturation_of_Oxygen_in_the_Blood_SPO2_] = useState("")
   const [Body_Temperature_BT_, setBody_Temperature_BT_] = useState("")
   const [Diagnosis, setDiagnosis] = useState("")
   const [Code, setCode] = useState("")
   const [GeneralAppearance, setGeneralAppearance] = useState("")
   const [HEENT, setHEENT] = useState("")
   const [RespiratorySystem, setRespiratorySystem] = useState("")
   const [CVS, setCVS] = useState("")
   const [Abdomen, setAbdomen] = useState("")
   const [GUS, setGUS] = useState("")
   const [MSS, setMSS] = useState("")
   const [Integumentary, setIntegumentary] = useState("")
   const [CNS, setCNS] = useState("")
   const [Obstetrics, setObstetrics] = useState("")
   const [Gynecological, setGynecological] = useState("")
   const [Neonatal,setNeonatal] = useState("")
   const [LGS,setLGS] = useState("")
   const [Weight,setWeight] = useState("")
   const [Height,setHeight] = useState("")
   const [Progress, setProgress] = useState("")
   const [Management, setManagement] = useState("")
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
    console.log(Diagnosis)
   const handleClear1 = ()=>{
      setBlood_Pressure_BP_("")
      setPulse_Rate_PR_("")
      setHistoryNote("")
      setRespiration_Rate_RR_("")
      setSaturation_of_Oxygen_in_the_Blood_SPO2_("")
      setBody_Temperature_BT_("")
      setDiagnosis("")
      setCode("")
      setGeneralAppearance("")
      setHEENT("")
      setRespiratorySystem("")
      setCVS("")
      setAbdomen("")
      setGUS("")
      setMSS("")
      setIntegumentary("")
      setCNS("")
      setObstetrics("")
      setGynecological("")
      setNeonatal("")
      setLGS("")
      setWeight("")
      setHeight("")
      setProgress("")
      setManagement("")
   }
   const handlesubmit = async (e)=>{
      e.preventDefault()
      await authaxios.post(`${api}/docdashboard/`,{
         PatientId:parseInt(PatientId),
         HistoryNote,
         Blood_Pressure_BP_,
         Pulse_Rate_PR_,
         Respiration_Rate_RR_,
         Saturation_of_Oxygen_in_the_Blood_SPO2_,
         Body_Temperature_BT_,
         GeneralAppearance,
         HEENT,
         RespiratorySystem,
         CVS,
         Abdomen,
         GUS,
         MSS,
         Integumentary,
         CNS,
         Obstetrics,
         Gynecological,
         Neonatal,
         LGS,
         Weight,
         Height,
         Diagnosis:parseInt(Diagnosis),
         Code,
         Progress,
         Management,
         clinic:parseInt(clinic),
      }).then(function (response) {
         console.log(response)
         handleShow()
         router.push(`/patient/${PatientId}`)
      }).catch(function (error) {
         console.log(error);
      });
   }
   return (
      <div className={styles.home}>
         <SideNavbar mrn={mrn}/>
         <div className={styles.homeContainer}>
            <Header />
            <form onSubmit={handlesubmit} className="pt-3">
               <Container className="px-4">
                     <Row className="my-3">
                        <Col sm>
                           <FloatingLabel controlId="floatingTextarea2" label="History">
                              <Form.Control
                                 as="textarea"
                                 required
                                 placeholder="History"
                                 style={{ height: '200px' }}
                                 value={HistoryNote}
                                 onChange={(e) => setHistoryNote(e.target.value)}
                              />
                           </FloatingLabel>
                        </Col>
                     </Row>

                     <Row className="my-3">
                        <FloatingLabel controlId="floatingSelect" label="Diagnosis">
                        <Form.Select 
                           aria-label="Floating label select example"
                           value = {Diagnosis}
                           onChange={(e) => setDiagnosis(e.target.value)}
                        >
                            <option></option>
                           {DiagnosisList.map((data)=>(
                              <option value={data.id}>{data.Diagnosis}</option>
                           ))}
                           
                        </Form.Select>
                     </FloatingLabel>
                     </Row>

                     <div className="p-3 border my-3 rounded">
                        <h5>Vitalsign</h5>
                        <Row className="mb-3">
                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Blood Pressure">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Blood Pressure" 
                                    value = {Blood_Pressure_BP_}
                                    onChange={(e) => setBlood_Pressure_BP_(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Pulse Rate">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Pulse_Rate_PR_" 
                                    value = {Pulse_Rate_PR_}
                                    onChange={(e) => setPulse_Rate_PR_(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Respiration Rate">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Respiration_Rate_RR_" 
                                    value = {Respiration_Rate_RR_}
                                    onChange={(e) => setRespiration_Rate_RR_(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>
                        </Row>
                        
                        <Row className="mb-3">
                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Saturation of Oxygen in the Blood">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Saturation of Oxygen in the Blood" 
                                    value = {Saturation_of_Oxygen_in_the_Blood_SPO2_}
                                    onChange={(e) => setSaturation_of_Oxygen_in_the_Blood_SPO2_(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Blood Tempreature">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Blood Tempreature" 
                                    value = {Body_Temperature_BT_}
                                    onChange={(e) => setBody_Temperature_BT_(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>
                        </Row>
                     </div>

                     <div className="p-3 border my-3 rounded">

                        <h5>Physical examination</h5>
                        <Row className="mb-3">
                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="GeneralAppearance">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="General Appearance" 
                                    value = {GeneralAppearance}
                                    onChange={(e) => setGeneralAppearance(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="HEENT">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="HEENT" 
                                    value = {HEENT}
                                    onChange={(e) => setHEENT(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Respiratory System">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="RespiratorySystem" 
                                    value = {RespiratorySystem}
                                    onChange={(e) => setRespiratorySystem(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                        </Row>

                        <Row className="mb-3">
                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="CVS">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="CVS" 
                                    value = {CVS}
                                    onChange={(e) => setCVS(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Abdomen">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Abdomen" 
                                    value = {Abdomen}
                                    onChange={(e) => setAbdomen(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="GUS">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="GUS" 
                                    value = {GUS}
                                    onChange={(e) => setGUS(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>
                        </Row>

                        <Row className="mb-3">
                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="MSS">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="MSS" 
                                    value = {MSS}
                                    onChange={(e) => setMSS(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Integumentary">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Integumentary" 
                                    value = {Integumentary}
                                    onChange={(e) => setIntegumentary(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="CNS">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="CNS" 
                                    value = {CNS}
                                    onChange={(e) => setCNS(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>
                        </Row>

                        <Row className="mb-3">
                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Obstetrics">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Obstetrics" 
                                    value = {Obstetrics}
                                    onChange={(e) => setObstetrics(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Gynecological">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Gynecological" 
                                    value = {Gynecological}
                                    onChange={(e) => setGynecological(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Neonatal">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Neonatal" 
                                    value = {Neonatal}
                                    onChange={(e) => setNeonatal(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>
                        </Row>

                        <Row className="mb-3">
                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="LGS">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="LGS" 
                                    value = {LGS}
                                    onChange={(e) => setLGS(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Weight">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Weight" 
                                    value = {Weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>

                           <Col sm>
                              <FloatingLabel controlId="floatingInput" label="Height">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Height" 
                                    value = {Height}
                                    onChange={(e) => setHeight(e.target.value)}
                                 />
                               </FloatingLabel>
                           </Col>
                        </Row>
                     </div>

                     <Row className="mb-3">
                        <Col sm>
                           <FloatingLabel controlId="floatingTextarea2" label="Progress">
                              <Form.Control
                                 as="textarea"
                                 placeholder="Progress"
                                 style={{ height: '200px' }}
                                 value = {Progress}
                                 onChange={(e) => setProgress(e.target.value)}
                              />
                           </FloatingLabel>
                        </Col>

                        <Col sm>
                           <FloatingLabel controlId="floatingTextarea2" label="Management">
                              <Form.Control
                                 as="textarea"
                                 placeholder="Management"
                                 style={{ height: '200px' }}
                                 value = {Management}
                                 onChange={(e) => setManagement(e.target.value)}
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
                                        <h5>Succefully add new record</h5>
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

