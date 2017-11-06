import normalizeUrl from 'normalize-url';
import cookies from 'cookiesjs';
import moment from 'moment';

let kBaseUrl = "https://sheltered-reef-20707.herokuapp.com/"
// let kBaseUrl = "http://localhost:1337/";

if (process.env.NODE_ENV === 'production') kBaseUrl = "https://sheltered-reef-20707.herokuapp.com/";


export const serverPath = (path) => {
    return normalizeUrl(`${kBaseUrl}/${path || ''}`);
};

export const setSession = (session) => cookies({ session });
export const getSession = () => cookies('session');

export const jsonHeader = { 'Content-Type': 'application/json' };

export const apiRequest = async (method, path, body, headers = {}) => {
    const tokenHeader = getSession() ? { Token: getSession().hash } : {};

    let requestObject = {
        method,
        headers: {
            ...jsonHeader,
            ...tokenHeader,
            ...headers
        }
    };

    if (body)
        requestObject.body = JSON.stringify(body);

    const response = await fetch(serverPath(path), requestObject);
    const json = await response.json();

    if (response.ok)
        return json;

    throw new Error(json.message || 'Unknown error');
};


export const session = async (username, password) => {
    const reqSession = await apiRequest("GET", `/users/session`, undefined, {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });
    setSession(reqSession);
    return reqSession;
};

export const status = async () => apiRequest("GET", `/`);

export const tasks = async () => {
    const tasks = await apiRequest("GET", `/tasks`);
    return tasks.map((task) => ({
        ...task,
        postpone_date: task.postpone_date ? moment(task.postpone_date) : undefined
    }));
};

export const postUser = async (user) => apiRequest("POST", `/users`, user);
export const putTask = async (task) => apiRequest("PUT", `/tasks/${task._id}`, task);
export const postTask = async (task) => apiRequest("POST", `/tasks`, task);
export const deleteTask = async (task) => apiRequest("DELETE", `/tasks/${task._id}`);
export const completeTask = async (task) => apiRequest("PATCH", `/tasks/${task._id}/actions/complete`);
export const uncompleteTask = async (task) => apiRequest("PUT", `/tasks/${task._id}`, { ...task, completed: false });

export const postponeTask   = async (task, date) => {
    if (!date) date = moment().add(120, 'minutes');
    return apiRequest("PATCH", `/tasks/${task._id}/actions/postpone`, { postpone_date: date.toISOString() });
};

export const unpostponeTask = async (task) => apiRequest("PATCH", `/tasks/${task._id}/actions/postpone`, { postpone_date: null });

export const logout = () => setSession(undefined);
