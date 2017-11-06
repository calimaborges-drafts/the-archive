import store from '../store';

export default (field) => {
    return (e) => {
        store.store = { ...store.store, [field]: e.target.value };
    };
};