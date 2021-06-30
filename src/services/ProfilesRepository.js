import profiles from './profiles.json';


export default class ProfilesRepository {
    static searchAll() {
        return new Promise(resolve => {
            resolve(profiles);
        })
    }
}