import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const HistoryCard = ({title,content}) => {
    return(
        <div className='border-black text-black'>
            <Accordion>
                <AccordionSummary id="panel-header" aria-controls="panel-content">
                    {title}
                </AccordionSummary>
                 <AccordionDetails>
                    {content}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default HistoryCard
