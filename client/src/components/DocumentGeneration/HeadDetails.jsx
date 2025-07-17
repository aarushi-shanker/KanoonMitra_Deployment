import React from 'react'
import { useSelector } from 'react-redux';

const HeadDetails = () => {
    const title = useSelector((state) => state.legalFormat.selectedFormat);
    const partyOne = useSelector((state) => state.form.partyOne);
    const partyTwo = useSelector((state) => state.form.partyTwo);
    const partyOneAddress = useSelector((state) => state.form.partyOneAddress);
    const partyTwoAddress = useSelector((state) => state.form.setPartyTwoAddress);
    const date = useSelector((state) => state.form.date);

    return (
        <div className='p-4 mt-6'>
            <div className='mb-4'><h2 className="md:text-2xl text-lg text-center font-bold">{title}</h2></div>
            {title?.toLowerCase().includes('employ') ?
                <p>
                    {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })} <br /> 
                    <br />
                    Dear {partyTwo}, <br />
                    {partyTwoAddress} <br />
                    <br />
                    Subject: <span className='underline'>{title}</span>
                </p>
                : (title?.toLowerCase().includes('agreement') || title?.toLowerCase().includes('settlement') || title?.toLowerCase().includes('compromise')) ?
                    <p>
                        This Agreement is made on this day {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })} at ( Specify the Place) <br />
                        BETWEEN<br />
                        {partyOne}<br />
                        resident of {partyOneAddress}<br />
                        AND<br />
                        {partyTwo}<br />
                        resident of {partyTwoAddress} <br />
                        <br />
                        NOW THEREFORE THIS {title.toUpperCase()} IS EXECUTED AS FOLLOWS:
                    </p>
                    : (title?.toLowerCase().includes('court') || title?.toLowerCase().includes('bail')) ?
                        <p>
                            BEFORE THE (COURT NAME) AT
                            <br /><br />
                            IN THE MATTER OF:<br />
                            {partyOne}
                            <br />
                            VERSUS
                            {partyTwo}
                            <br />
                            <br />
                            FILED BY
                            {partyOne}
                            <br />
                            Dated:{new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </p>
                        : <p>
                            This {title} on {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })} is by {partyOne},
                            resident of {partyOneAddress}.
                        </p>
            }
        </div>
    )
}

export default HeadDetails