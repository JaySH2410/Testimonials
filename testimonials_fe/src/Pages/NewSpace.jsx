import React, { useEffect, useState } from 'react'
import NewSpaceForm from './NewSpaceForm'
import NewSpacePreview from './NewSpacePreview'
import { set, undefined } from 'zod'


const NewSpace = ({ setDashboardNavFlag }) => {
    const initialValues = {
        userId: undefined,
        sname: undefined,
        tname: undefined,
        tdescription: undefined,
        picture: undefined,
        isStarRating: false,
        que1: undefined,
        que2: undefined,
        que3: undefined,
    }
    const [formValue, setFormValue] = useState(initialValues);

    function handleChange(e) {
        console.log(e.target.id);
        
        if (e.target.id === "isStarRating") {
            setFormValue({
                ...formValue,
                [e.target.id]: !formValue.isStarRating
            })
        } else if (e.target.id === "picture") {
            console.log("clicked");
            console.log(e.target.files);

            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                setFormValue({
                    ...formValue,
                    picture: reader.result
                })
                console.log('RESULT', reader.result)
            }
            reader.readAsDataURL(file);
            // console.log(t);

        }
        else {
            setFormValue({
                ...formValue,
                [e.target.id]: e.target.value
            })
        }
    }

    return (
        <>
            <div className='grid grid-cols-2 gap-8 justify-center py-4'>
                <NewSpacePreview formValue={formValue} />
                <NewSpaceForm formValue={formValue} handleChange={handleChange} setDashboardNavFlag={setDashboardNavFlag} />
            </div>
        </>
    )
}

export default NewSpace