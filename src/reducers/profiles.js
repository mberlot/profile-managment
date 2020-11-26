import { handleActions } from 'redux-actions';
import {
    getProfilesRequest,
    getProfilesSuccess,
    getProfilesFailed,
    sortProfilesAsc,
    sortProfilesDesc,
    sortProfilesDefault,
    filterProfilesAction,
    selectProfileAction,
    updateSelectedProfileAction
} from '../actions/profiles';

const FetchState = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
};

const initialState = {
    fetchState: FetchState.NOT_FETCHED,
    profiles: [],
    defaultProfiles: [],
    profileSelected: {},
    indexSelected: 0,
    errorMessage: ''
};

export default handleActions({
        [getProfilesRequest]: state => ({ ...state, fetchState: FetchState.FETCHING }),
        [getProfilesSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
            fetchState: FetchState.FETCHED,
            errorMessage: initialState.error,
        }),
        [getProfilesFailed]: (state, action) => ({
            ...state,
            fetchState: FetchState.FETCHED,
            errorMessage: action.payload,
        }),
        [sortProfilesAsc]: state => ({
            ...state,
            //Creating a shadow copy using slide(), in order to don't mutate state directly.
            profiles: state.profiles.slice().sort((a, b) => a.name.first.localeCompare(b.name.first)),
            errorMessage: initialState.error,
        }),
        [sortProfilesDesc]: state => ({
            ...state,
            profiles: state.profiles.slice().sort((a, b) => b.name.first.localeCompare(a.name.first)),
            errorMessage: initialState.error,
        }),
        [sortProfilesDefault]: state => ({
            ...state,
            profiles: state.defaultProfiles,
            errorMessage: initialState.error,
        }),
        [filterProfilesAction]: (state, action) => ({
            ...state,
            profiles: state.defaultProfiles.slice().filter(item => item.name.first.indexOf(action.payload.value) >= 0 || item.name.last.indexOf(action.payload.value) >= 0),
            errorMessage: initialState.error,
        }),
        [selectProfileAction]: (state, action) => ({
            ...state,
            ...action.payload,
            fetchState: FetchState.FETCHED,
            errorMessage: initialState.error,
        }),
        [updateSelectedProfileAction]: (state, action) => ({
            ...state,
            profiles: [...state.profiles.slice(0,state.indexSelected), action.payload.profileEdited, ...state.profiles.slice(state.indexSelected+1)],
            defaultProfiles: [...state.defaultProfiles.slice(0,state.indexSelected), action.payload.profileEdited, ...state.profiles.slice(state.indexSelected+1)],
            errorMessage: initialState.error,
        }),
    },
    initialState);
