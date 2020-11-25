import React, { useEffect, useState } from 'react';
import Modal from "./modal";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { updateSelectedProfile } from "../../actions/profiles";

const ProfileEditModal = props => {

    const { register, handleSubmit, errors } = useForm();
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName ] = useState('');
    const [email, setEmail ] = useState('');
    const [phone, setPhone ] = useState('');
    const [city, setCity ] = useState('');
    const [state, setState ] = useState('');

    const dispatch = useDispatch();

    const profileSelected = useSelector(state => state.profiles.profileSelected );

    useEffect(() => {
        if(profileSelected && profileSelected.name) {

            setFirstName(profileSelected.name.first);
            setLastName(profileSelected.name.last);
            setEmail(profileSelected.email);
            setPhone(profileSelected.phone);
            setCity(profileSelected.location.city);
            setState(profileSelected.location.state);
        }
    }, [profileSelected]);

    const onSubmit = data => {
        let profileEdited = {
            ...profileSelected,
            name : {
                ...profileSelected.name,
                first: data.firstName,
                last: data.lastName
            },
            email,
            phone,
            location: {
                ...profileSelected.location,
                city,
                state
            }
        };

        dispatch(updateSelectedProfile(profileEdited));
        props.closeModal();
    }

    return (<Modal
        open={props.open}
        closeModal={props.closeModal}
    >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='field'>
                <label>{'First name: '}</label>
                <input type='text' ref={register({ required: true })} name='firstName' value={firstName} onChange={(event) => { setFirstName(event.target.value) }}/>
                {errors.firstName && <span>This field is required</span>}
            </div>
            <div className='field'>
                <label>{'Last name: '}</label>
                <input type='text' ref={register({ required: true })} name='lastName' value={lastName} onChange={(event) => { setLastName(event.target.value) }}/>
                {errors.lastName && <span>This field is required</span>}
            </div>
            <div className='field'>
                <label>{'Email: '}</label>
                <input type='text' ref={register({ required: true })} name='email' value={email} onChange={(event) => { setEmail(event.target.value) }}/>
                {errors.email && <span>This field is required</span>}
            </div>
            <div className='field'>
                <label>{'Phone: '}</label>
                <input type='text' ref={register({ required: true })} name='phone' value={phone} onChange={(event) => { setPhone(event.target.value) }}/>
                {errors.phone && <span>This field is required</span>}
            </div>
            <div className='field'>
                <label>{'City: '}</label>
                <input type='text' ref={register({ required: true })} name='city' value={city} onChange={(event) => { setCity(event.target.value) }}/>
                {errors.city && <span>This field is required</span>}
            </div>
            <div className='field'>
                <label>{'State: '}</label>
                <input type='text' ref={register({ required: true })} name='state' value={state} onChange={(event) => { setState(event.target.value) }}/>
                {errors.state && <span>This field is required</span>}
            </div>
            <input type="submit" value='edit'/>
        </form>
    </Modal>);
}

export default ProfileEditModal;
