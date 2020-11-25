import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles, sortProfiles, selectProfile } from '../../actions/profiles';
import ProfileBox from "../profile";

import './profiles.scss';
import ProfileEditModal from "../modal/profileEdit";

const Profiles = props => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles.profiles );
    const [order, setOrder] = useState('none');
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch]);

    const orderItems = (event) => {
        setOrder(event.target.value);
        dispatch(sortProfiles(event.target.value));
    }

    return (
        <>
            <div>
                <span>
                    <b>Sort by: </b>
                    <select name="select" onChange={orderItems} value={order}>
                        <option value="none">-NONE-</option>
                        <option value="asc">Name - ASC</option>
                        <option value="desc">Name - DESC</option>
                    </select>
                </span>
            </div>
            <div className='profiles'>
                {profiles && profiles.map((item, index) => {
                    return (<ProfileBox
                        key={index}
                        firstName={item.name.first}
                        lastName={item.name.last}
                        imgSource={item.picture.large}
                        email={item.email}
                        phone={item.phone}
                        location={item.location}
                        edit={() => {
                            dispatch(selectProfile(item, index));
                            setOpenEdit(true);
                        }}
                    />)
                })}
            </div>
            <ProfileEditModal
                open={openEdit}
                closeModal={() => { setOpenEdit(false) }}
            />
        </>
    );
}

export default Profiles;
