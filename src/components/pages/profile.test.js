import { render, waitFor, screen, wait } from '@testing-library/react';
import ProfilesRepository from '../../services/ProfilesRepository';
import { store } from '../../configs/store';
import { Provider } from 'react-redux';
import Profiles from './profiles';

const profilesMock = [{
    "gender":"male",
    "name":{
       "title":"Mr",
       "first":"Maxi",
       "last":"Berlot"
    },
    "location":{
       "street":{
          "number":8245,
          "name":"36th Ave"
       },
       "city":"Campbellton",
       "state":"Prince Edward Island",
       "country":"Canada",
       "postcode":"E2Z 6X8",
       "coordinates":{
          "latitude":"-58.7863",
          "longitude":"-164.7896"
       },
       "timezone":{
          "offset":"-1:00",
          "description":"Azores, Cape Verde Islands"
       }
    },
    "email":"charles.gagne@example.com",
    "login":{
       "uuid":"356d11be-d5b1-4aec-9c4b-06c53ad485fa",
       "username":"crazypanda103",
       "password":"rocker",
       "salt":"1vQfM5XJ",
       "md5":"f56f406213d5cf952aa267051f2526fd",
       "sha1":"162763a27f6ecf437c8b34bedd6045c479117a4a",
       "sha256":"4966b0fd2b143b00b8981b8d8f0481c0c4e58b71b82dcc7cd0dbf6cc521f301f"
    },
    "dob":{
       "date":"1968-04-15T00:33:46.607Z",
       "age":53
    },
    "registered":{
       "date":"2015-06-23T07:36:57.846Z",
       "age":6
    },
    "phone":"268-253-9699",
    "cell":"650-417-0177",
    "id":{
       "name":"",
       "value":null
    },
    "picture":{
       "large":"https://randomuser.me/api/portraits/men/34.jpg",
       "medium":"https://randomuser.me/api/portraits/med/men/34.jpg",
       "thumbnail":"https://randomuser.me/api/portraits/thumb/men/34.jpg"
    },
    "nat":"CA"
 }];

let Tree;
 beforeEach(
     () => {
        Tree = ({children}) => (
            <Provider store={store}>
                {children}
            </Provider>
        )
     }
 );


test('Check if user profile get rendered', async () => {
    ProfilesRepository.searchAll = jest.fn().mockResolvedValueOnce(profilesMock);
    const { getByTestId, getByText } = render(<Tree>
        <Profiles/>
    </Tree>);
    expect(getByText(/Loading/)).toBeDefined();
    await waitFor(() => getByTestId('profiles'));
    expect(getByTestId('profiles')).toBeDefined();
});