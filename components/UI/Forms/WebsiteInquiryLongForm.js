"use client";

import React, { useState } from "react";
import Input from './InputFields/Input'
import { websiteEnquiryFieldsData } from "@/utlis/websiteEnquiryFieldsData";
import { getAttributionForDataLayer, getAttributionSummary } from "@/utlis/marketingAttribution";
import { trackMetaLead } from "@/utlis/metaCapi";
import LoadingBtn from "../Buttons/LoadingBtn";
import Box from '@mui/material/Box';

import axios from "axios";
import Alert from '@mui/material/Alert';

import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation'
import styles from "./WebsiteInquiryLongForm.module.scss";

export default function WebsiteInquiryLongForm({ className, formName = "Website Enquiry Form" }) {
    const router = useRouter()

    const [formData, setFormData] = useState({
        firstname: '',   // Default empty string to make it controlled
        email: '',
    
   
        type_of_property: '',
        number_of_rooms:'',
          service_frequency:'',
           focus_areas: [],
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)
console.log(formData)
    const handleChange = (id, value, isSelectMultiple) => {
        let updatedValue = value;


        setFormData({ ...formData, [id]: updatedValue });
        // Reset errors on change
        if (errors[id]) {
            setErrors({ ...errors, [id]: false });
        }
    };

    const handleBlur = (id, validationFunction) => {
        if (!validationFunction(formData[id])) {
            setErrors({ ...errors, [id]: true });
        }
    };

    // submit handler 
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission if using form tag

        let allFieldsValid = true;
        const newErrors = {};

        // Loop through each field to check if it's required and valid
        websiteEnquiryFieldsData.forEach(field => {
            if (field.required && !formData[field.id]) {
                // Set field as invalid if it's required but empty or invalid
                newErrors[field.id] = true;
                allFieldsValid = false;
                return
            }
        });

        setErrors(newErrors);
        // If any required field is invalid, stop and don't make API calls
        if (!allFieldsValid) {
            return; // Stop the function if any field is invalid or empty
        }

        const dataPayload = {
            email: formData.email,
            formName: formName,
            message: [`First Name: ${formData.firstname} \n Email: ${formData.email} \n Type of property?: ${formData['type_of_property']} \n Number of rooms: ${formData['number_of_rooms']} \n Preferred Cleaning Frequency: ${formData['service_frequency']} \n Specific Areas to Focus On: ${formData['focus_areas']}  \n Message: ${formData['message']} `, getAttributionSummary()].filter(Boolean).join("\n"),
            portalID: "47120588",
            hubspotFormID: "53928c0c-9a8f-4b57-8b19-91f0ecffd8ae",
            hubspotFormObject: [
                {
                    name: "firstname",
                    value: formData.firstname
                },
                {
                    name: "email",
                    value: formData.email
                }, {
                    name: "type_of_property",
                    value: formData['type_of_property']
                },
                {
                    name: "number_of_rooms",
                    value: formData['number_of_rooms']
                },
                {
                    name: "service_frequency",
                    value: formData['service_frequency']
                },
                {
                    name: "focus_areas",
                    value: formData['focus_areas'].join(", ")
                },
             
                {
                    name: "message",
                    value: formData.message
                },

            ]
        }
        console.log(dataPayload)
        setIsLoading(true)

        // Send an event to GA4 manually
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'quote_form_submission', // The custom event name you configured in GTM
                'event_category': 'form_submit',
                'event_label': 'Instant Quote From Submission',
                'marketing': getAttributionForDataLayer()
            });
        }
        // hubspot config
        var configHubspot = {
            method: 'post',
            url: '/api/submit-hubspot-form',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };
        // mailgun config
        var configSendMail = {
            method: 'post',
            url: '/api/sendmail',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };

        Promise.all([axios(configHubspot), axios(configSendMail)])
            .then(function (response) {
                if (response[1].status === 200) {
                    trackMetaLead({ formData, eventName: "Lead" })
                    console.log("testing form",response )
                    setIsLoading(false)
                    setIsSuccess(true)
                    setNewSubmission(false)
                    setError(false)
                    // set initial state to empty string 
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    router.push('/form/thank-you')
                }
                else {
                    console.log(response)
                    setIsLoading(false)
                    setIsSuccess(false)
                    setError(true)
                    setNewSubmission(true)

                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setIsSuccess(false)
                setError(true)
                setNewSubmission(true)

            });
    }


    const formInputs = websiteEnquiryFieldsData.map((field, index) => {
        const isSelectMultiple = field.type === "select" && field.multiple; // Example condition

        return <Input
            lightTheme={true}
            key={index}
            label={field.label}
            type={field.type}
            value={isSelectMultiple ? formData[field.id] || [] : formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value, isSelectMultiple)}
            onBlur={field.required ? () => handleBlur(field.id, field.validation) : null} //check if the field is required then call the function 
            required={field.required}
            autoComplete={field.autoComplete}
            isInvalid={errors[field.id]}
            errorMessage={field.errorMessage}
            options={field.options}
            multipleValue={field.multiple}

        />
    })
    return (
        <Container variant="div" className={`${styles.container} ${className || ""} py-8`} maxWidth="xl">

            <Box sx={{ width: '100%' }}>


                <React.Fragment>
                    <div className={`${styles.inputWrapper} p-6`}>
                        {formInputs}
                        <LoadingBtn newSubmission={newSubmission} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess} >Get a Fixed Price Quote</LoadingBtn>

                        {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}
                    </div>
                </React.Fragment>

            </Box>

        </Container>
    )
}
