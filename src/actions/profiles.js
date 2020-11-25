import { createAction } from 'redux-actions';
import { api } from '../configs/networkConfig';


export const getProfilesRequest = createAction('REQUEST_PROFILES');
export const getProfilesSuccess = createAction('REQUEST_PROFILES_SUCCESS');
export const getProfilesFailed = createAction('REQUEST_PROFILES_FAILED');
export const sortProfilesAsc = createAction('SORT_PROFILES_ASC');
export const sortProfilesDesc = createAction('SORT_PROFILES_DESC');
export const sortProfilesDefault = createAction('SORT_PROFILES_DEFAULT');
export const filterProfilesAction = createAction('FILTER_PROFILES');
export const selectProfileAction = createAction('SELECT_PROFILE');
export const updateSelectedProfileAction = createAction('UPDATE_PROFILE_SELECTED');

export const getProfiles = () => async (dispatch) => {
    dispatch(getProfilesRequest());
    try {
        const response = await api.get('/api/?results=60');
        dispatch(getProfilesSuccess({ profiles: response.data.results, defaultProfiles: response.data.results }));
    }
    catch(err) {
        dispatch(getProfilesFailed({ errorMessage: err }));
    }
};

export const sortProfiles = (type) => async (dispatch) => {
    switch (type) {
        case 'asc':
            dispatch(sortProfilesAsc());
            break;
        case 'desc':
            dispatch(sortProfilesDesc());
            break;
        default:
            dispatch(sortProfilesDefault());
            break;
    }
};

export const filterProfiles = (value) => async (dispatch) => {
    dispatch(filterProfilesAction({ value }));
};

export const selectProfile = (profileSelected, indexSelected) => async (dispatch) => {
    dispatch(selectProfileAction( {
            profileSelected,
            indexSelected
    }));
};

export const updateSelectedProfile = (profileEdited) => async (dispatch) => {
    dispatch(updateSelectedProfileAction( {
        profileEdited
    }));
};
