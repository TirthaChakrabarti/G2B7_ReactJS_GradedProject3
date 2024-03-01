import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd, faFireFlameCurved, faICursor, faStar } from "@fortawesome/free-solid-svg-icons";

type Props = {
    section: string,
    icon: string
}    

const sectionNamemodifier = (section: string) => {

    const sectionNameSplitted = section.split('-')

    const Capitalized = sectionNameSplitted.map(word => {
        return (word.charAt(0).toUpperCase() + word.slice(1))
    })
    
    const finalString = Capitalized.join(' ');

    return finalString;

}

const SectionHead = ({ section, icon } : Props) => {

    const sectionName = sectionNamemodifier(section);

    return (

        <h1 
            style={{color:'whitesmoke', marginTop:'50px', marginBottom:'50px', marginLeft:'10px'}}
        >
            {`${sectionName}`}

            {icon === "icon1" && <FontAwesomeIcon icon={faHourglassEnd} style={{color:'burlywood', marginLeft:'20px'}}/>}
            {icon === "icon2" && <FontAwesomeIcon icon={faFireFlameCurved} style={{color:'yellow', marginLeft:'20px'}}/>}
            {icon === "icon3" && <FontAwesomeIcon icon={faICursor} style={{color:'orange', marginLeft:'20px'}}/>}
            {icon === "icon4" && <FontAwesomeIcon icon={faStar} style={{color:'gold', marginLeft:'20px'}}/>}
        </h1>
    )
}

export default SectionHead