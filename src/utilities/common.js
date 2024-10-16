import { toast } from 'react-toastify';
import { BASE_URL } from '../API';
import moment from 'moment';
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { useEffect } from 'react';

export const WarningModal = ({deleteModal, setDeleteModal, message, dataToBeDeleted, functionToUse}) => {
  
  useEffect(()=>{console.log("Modal 2", deleteModal)},[deleteModal])

  return(
    <>
    <Modal isOpen={deleteModal} centered={true} size="md" >
        <ModalHeader>Warning</ModalHeader>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            functionToUse(dataToBeDeleted)
            setDeleteModal(false)
          }}
        >
          <ModalBody>
            <Row >
              <Col xl="12" sm="12" className="p-2">
                {message}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" type="submit" >
              Delete
            </Button>
            <Button
              onClick={() => {
                setDeleteModal(false)
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      </>
  )
}


export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function showGradeNow(dateString) {
  const endDate = moment(dateString)
  const currentDate = moment()
  const differenceInMinutes = endDate.diff(currentDate, 'minutes')
  if(differenceInMinutes.toFixed(0) < 0 ){
      return true;
  }
  return false;
}

export function getMinutes(dateString) {
  // Create a Date object from the date string
  const date = new Date(dateString);

  // Extract the components
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
  const day = date.getUTCDate();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  
  return minutes;
}

export function generateRandomCode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }

export function getRandomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    );
  }
  
export function hasEmptyValues(obj) {
    
    if(typeof obj === 'object' && Object.keys(obj).length === 0){
      return "All fields are empty"; 
    }
    for (const key in obj) {
      if (isEmpty(obj[key])) {
        return { msg: " is empty", key }; 
      }
    }

    return { msg: false, key: false };
  }

export const formValidationHandler = (data) => {

  // Regular expression for validating an Email
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const hasUpperCase = /[A-Z]/;
    const regexGPA = /^(?!0\d)(?:[0-3](?:\.\d{0,2})?|4(?:\.0{0,2})?)$/;

    if(data.firstName == null || data.firstName == ""){
      return { key: "firstName", msg: "First name is empty"}
    }
    else if(data.lastName == null || data.lastName == ""){
      return { key: "lastName", msg: "Last name field is empty"}
    }
    else if(data.email == null || data.email == "" || !regex.test(data.email)){
      return { key: "email", msg: "Email field is empty"}
    }
    else if(data.password == null || data.password == "" ){
      return { key: "password", msg: "Password field is empty"}
    }
    else if(!hasUpperCase.test(data.password)){
      return { key: "password", msg: "Password should have atleast one capital letter"}
    }
    else if(data.confirmPassword == null || data.confirmPassword == ""){
      return { key: "confirmPassword", msg: "Confirm password field is empty"}
    }
    else if(data.confirmPassword !== data.password){
      return { key: "confirmPassword", msg: "Confirm password field does not match"}
    }
    else if(data.university == null || data.university == ""){ 
      return { key: "university", msg: "University field is empty"}
    }
    else if(data.gpaScore == null || data.gpaScore == ""){
      return { key: "gpaScore", msg: "GPA field is empty"}
    }
    else if(!regexGPA.test(data.gpaScore)){
      return { key: "gpaScore", msg: "Format is incorrect, ranges are 0.00 to 4.00"}
    }

    // else if(data.ethnicity == "Select Ethnicity"){
    //   return { key: "ethnicity", msg: "Please select Ethnicity field"}
    // }
    // else if(data.race == "Select the Race(s) You Identify With"){
    //   return { key: "race", msg:"Please select race field"}
    // }
    // else if(data.gender == "Select Gender"){
    //   return { key: "gender", msg: "Please select gender field"}
    // }
   
    return false

  }

export const updateFormValidationHandler = (data) => {

    // Regular expression for validating an Email
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regexGPA = /^(?!0\d)(?:[0-3](?:\.\d{0,2})?|4(?:\.0{0,2})?)$/;
    if(data.firstName == null || data.firstName == ""){
      return { key: "firstName", msg: "First name is empty"}
    }
    else if(data.lastName == null || data.lastName == ""){
      return { key: "lastName", msg: "Last name field is empty"}
    }
    else if(data.email == null || data.email == "" || !regex.test(data.email)){
      return { key: "email", msg: "Email field is empty"}
    }
    else if(data.university == null || data.university == ""){
      return { key: "university", msg: "University field is empty"}
    }
    else if(data.gradYear == null || data.gradYear == ""){
      return { key: "gradYear", msg: "Graduation year field is empty"}
    }
    else if(data.gpaScore == null || data.gpaScore == ""){
      return { key: "gpaScore", msg: "GPA field is empty"}
    }
    else if(!regexGPA.test(data.gpaScore)){
      return { key: "gpaScore", msg: "Format is incorrect, ranges are 0.00 to 4.00"}
    }
    // else if(data.ethnicity == "Select Ethnicity"){
    //   return { key: "ethnicity", msg: "Please select Ethnicity field"}
    // }
    // else if(data.race == "Select the Race(s) You Identify With"){
    //   return { key: "race", msg:"Please select race field"}
    // }
    // else if(data.gender == "Select Gender"){
    //   return { key: "gender", msg: "Please select gender field"}
    // }
    
    return false

}

export const updateAdminFormValidationHandler = (data) => {

    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const hasUpperCase = /[A-Z]/;
   
    if(data.firstName == null || data.firstName == ""){
      return { key: "firstName", msg: "First name is empty"}
    }
    else if(data.lastName == null || data.lastName == ""){
      return { key: "lastName", msg: "Last name field is empty"}
    }
    else if(data.email == null || data.email == "" || !regex.test(data.email)){
      return { key: "email", msg: "Email field is empty"}
    }
    else if(data.password == null || data.password == "" ){
      return { key: "password", msg: "Password field is empty"}
    }
    else if(!hasUpperCase.test(data.password)){
      return { key: "password", msg: "Password should have atleast one capital letter"}
    }
    else if(data.confirmPassword == null || data.confirmPassword == ""){
      return { key: "confirmPassword", msg: "Confirm password field is empty"}
    }
    else if(data.confirmPassword !== data.password){
      return { key: "confirmPassword", msg: "Confirm password field does not match"}
    }
    else if(data.gender == "Select Gender"){
      return { key: "gender", msg: "Please select gender field"}
    }
   
    return false
    
      }

export const loginFormValidationHandler = (data) => {

  // Regular expression for validating an Email
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /\d/;

    if(data.email == null || data.email == "" || !regex.test(data.email)){
      return { key: "email", msg: "Email field is empty"}
    }
    else if(data.password == null || data.password == "" ){
      return { key: "password", msg: "Password field is empty"}
    }
    // else if(!hasUpperCase.test(data.password)){
    //   return { key: "password", msg: "Password should have atleast one capital letter"}
    // }
    
    return false

  }

export const registerModalalidationHandler = (data) => {

  if(data.category == null || data.category == ""){
    return { key: "category", msg: "Category field is empty"}
  }
  else if(data.simulationName == null || data.simulationName == "" ){
    return { key: "simulationName", msg: "Simulation name field is empty"}
  }
  else if(data.organizationName == null || data.organizationName == "" ){
    return { key: "organizationName", msg: "Organization name field is empty"}
  }
  else if(data.startTime == null || data.startTime == "" ){
    return { key: "startTime", msg: "Start time field is empty"}
  }
  else if(data.endTime == null || data.endTime == "" ){
    return { key: "endTime", msg: "End time field is empty"}
  }
  
  return false

  }

  export const downloadFile = (id, simulationId = false) => {
    // Open a new window
    try {
      let downloadWindow;
      if(simulationId){
        downloadWindow = window.open(
          BASE_URL+"/student/downloadSimulationFile/"+id._id+","+id.fileId,
          "_blank"
        );
      }else{
        downloadWindow = window.open(
          BASE_URL+"/admin/downloadSimulationFile/"+id,
          "_blank"
        );
      }
  
      // Check if the window opened successfully
      if (downloadWindow) {
        // Poll the window for its 'closed' status
        const interval = setInterval(() => {
          // If the window is closed, clear the interval
          if (downloadWindow.closed) {
            clearInterval(interval);
          }
        }, 4000);
  
        // Close the window after a brief delay (assuming the download has started)
        setTimeout(() => {
          downloadWindow.close();
        }, 5000); // 3000ms (3 seconds) is usually enough time for the download to start
      } else {
        console.error("Failed to open the download window.");
      }
    } catch (error) {
      toast.error("Simulation is inactive")
    }

  };