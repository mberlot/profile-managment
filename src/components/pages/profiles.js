import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles, sortProfiles, selectProfile } from '../../actions/profiles';
import ProfileBox from "../profile";

import './profiles.scss';
import ProfileEditModal from "../modal/profileEdit";

//TODO: move this to a config file
const FetchState = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
};

const Profiles = props => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles.profiles );
    const fetchState = useSelector(state => state.profiles.fetchState );
    const errorMessage = useSelector(state => state.profiles.errorMessage );
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
                {fetchState !== FetchState.FETCHING && profiles && 
                <div data-testid="profiles">
                    {profiles.map((item, index) => {
                        return (<ProfileBox
                            key={index}
                            index={index}
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
                }
                {fetchState === FetchState.FETCHING &&
                <div>
                    {'Loading...'}
                </div>}
                {fetchState !== FetchState.FETCHING && errorMessage &&
                    <div>{'Error while loading, please refresh the page.'}</div>
                }
            </div>
            <ProfileEditModal
                open={openEdit}
                closeModal={() => { setOpenEdit(false) }}
            />
        </>
    );
}

export default Profiles;
