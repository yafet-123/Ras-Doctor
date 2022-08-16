import {useEffect,useState} from 'react'
import Link from 'next/link'
import styles from '../../styles/Sidebar.module.css'
import { FaGreaterThan } from 'react-icons/fa';

export default function SideNavbar({mrn}){
	return(
		<div className={styles.sidebar}>
            <div className={styles.top}>
                <h3>Doctor</h3>
            </div>
            <hr className={styles.horizontal}/>
            <div className={styles.center}>
                <ul className={styles.ullist}>
                   	<li className={styles.dropdown}>
                        <input id="drop1" type="checkbox"/>
                        <label htmlFor="drop1" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Medical Record</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link href={{pathname: `/patient/addMedicalRecord`, query:{ mrn: mrn }}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Add Medical Record</span> 
                                    </a>          
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href={{pathname: `/patient/${encodeURIComponent(mrn)}`}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display Medical Record</span> 
                                    </a>          
                                </Link>
                            </li>
                            
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop2" type="checkbox"/>
                        <label htmlFor="drop2" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Prescription</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link href={{ pathname: `/Prescription/AddPrescription`, query:{ mrn: mrn }}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Write Prescription</span> 
                                    </a>          
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href={{pathname: `/Prescription/${encodeURIComponent(mrn)}`}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display Prescription</span> 
                                    </a>          
                                </Link>
                            </li>      
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop3" type="checkbox"/>
                        <label htmlFor="drop3" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>SickLeave</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link href={{ pathname: `/SickLeave/MedicalCertificate`,query:{ mrn: mrn }}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}> Write sick leave</span> 
                                    </a>          
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href={{pathname: `/SickLeave/${encodeURIComponent(mrn)}`}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display sick leave</span> 
                                    </a>          
                                </Link>
                            </li>      
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop4" type="checkbox"/>
                        <label htmlFor="drop4" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Intrareferral</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link  href={{pathname: `/Intrareferral/addIntrareferral`, query:{ mrn: mrn } }} >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}> Write Intra referral</span> 
                                    </a>          
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href={{pathname: `/Intrareferral/${encodeURIComponent(mrn)}`}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Display Intra referral</span> 
                                    </a>          
                                </Link>
                            </li>      
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop5" type="checkbox"/>
                        <label htmlFor="drop5" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Imaging</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link  href={{ pathname: `/orderimaging/Addorderimaging`, query:{ mrn: mrn }}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}> Write Imaging</span> 
                                    </a>          
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href={{pathname: `/orderimaging/Display`, query:{ mrn: mrn }}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Imaging Order</span> 
                                    </a>          
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href={{pathname: `/orderimaging/result`, query:{ mrn: mrn }}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Imaging Result</span> 
                                    </a>          
                                </Link>
                            </li>      
                        </ul>
                    </li>

                    <li className={styles.dropdown}>
                        <input id="drop6" type="checkbox"/>
                        <label htmlFor="drop6" className="d-flex justify-content-between">
                            <span className={styles.spanstyle}>Laboratory</span>
                            <FaGreaterThan className={styles.icon} />
                        </label>
                        <ul className={styles.ullist}>
                            <li className={styles.dropdownlist}>
                                <Link  href={{ pathname: `/Lab/addLab`, query:{ mrn: mrn }}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Order Lab</span> 
                                    </a>          
                                </Link>
                            </li>

                            <li className={styles.dropdownlist}>
                                <Link href={{pathname: `/Lab/${encodeURIComponent(mrn)}`}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Lab Order</span> 
                                    </a>          
                                </Link>
                            </li> 

                            <li className={styles.dropdownlist}>
                                <Link  href={{ pathname: `/Lab/result`, query:{ mrn: mrn }}}  >   
                                    <a style={{ textDecoration: "none" }}>
                                        <span className={styles.spanstyle}>Lab Result</span> 
                                    </a>          
                                </Link>
                            </li>     
                        </ul>
                    </li>
                </ul>
            </div> 
        </div>
	)
}
