import store from '../store';

export default (e) => {
    e.preventDefault();
    alert(store.store.username + " " + store.store.password);
};