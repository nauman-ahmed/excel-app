import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { generateRandomCode, hasEmptyValues } from '../../utilities/common';
import { Spin } from "antd";
import { toast } from 'react-toastify';
import { getSimulationClassCode, postSimulationClassCodeAndSimulation } from "../../API/Student";

const ModalRegister = ({ show, modalToggle }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [simulationDetail, setSimulationDetail] = useState(null);
    const [formData, setFormData] = useState({
        classCode: '',
      });

      useEffect(() => {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
          modalContent.style.width = '100% !important';
        }
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      
      const submitSearchHandler = async () => {
        setIsLoading(true)
        let requestData = {...formData}
    
        if(requestData.classCode == null || requestData.classCode == ""){
          setIsLoading(false)
          return toast.error("Please provide class code")
        }
        
        const response = await getSimulationClassCode(requestData)
        if(response.code == 201){
          toast.success(response.message)
          setSimulationDetail(response.data)
        }else{
          toast.error(response.message)
          setFormData({
            classCode: '',
          })       
          setSimulationDetail(null)
        }
    
        setIsLoading(false)
      }


      const submitSimulationHandler = async () => {
        setIsLoading(true)
        let requestData = {...formData}

        if(requestData.classCode == null || requestData.classCode == ""){
          setIsLoading(false)
          return toast.error("Please provide class code")
        }
        
        const response = await postSimulationClassCodeAndSimulation(requestData.classCode)
        if(response.code == 201){
          toast.success(response.message)
          setSimulationDetail(null)
          setFormData({
            classCode: '',
          })
          modalToggle(true)
        }else{
          setSimulationDetail(null)
          toast.error(response.message)
          // modalToggle()
        }
    
        setIsLoading(false)
      }


      return (
        <Modal show={show} onHide={modalToggle}>
            <Modal.Header closeButton>
                <Modal.Title>Select Simulation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="h-75 row">
                    <div className="col-12">
                        
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control mb-2"
                            id="classCode"
                            name="classCode"
                            value={formData.classCode}
                            placeholder="Enter class code"
                        />
                        <input
                            type="text"
                            disabled={true}
                            className="form-control mb-2"
                            id="simulation"
                            name="simulation"
                            placeholder="Simulation Name"
                            value={simulationDetail ? simulationDetail.simulationName: ""}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" className="border-raduis-zero" onClick={() => submitSearchHandler()}>
                    Search
                </Button> */}
                <Button variant="primary" className="border-raduis-zero" onClick={() => submitSimulationHandler()}>
                    Register
                </Button>
            </Modal.Footer>
        </Modal>
    );
  };
  
  export default ModalRegister;