import React from 'react';
import './profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit} from '@fortawesome/free-solid-svg-icons';

const ProfileBox = ({firstName, lastName, imgSource, email, phone, location, edit}) => {

    return (
        <div className='profile' data-testid="profile">
            <div className='profile-name'>
                <FontAwesomeIcon icon={faUserEdit} onClick={edit}/>
                <h3>{firstName + ' ' + lastName}</h3>
                <img src={imgSource}/>
            </div>
            <div className='profile-description'>
                <span>{email}</span>
                <span>{phone}</span>
                <span>{location.city + ', ' + location.state}</span>
            </div>

        </div>
    );
}

export default ProfileBox;
