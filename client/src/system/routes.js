import {
    Home, SignInForm, 
} from '../components';

const routes = [
    {
        'path': '/',
        'component': Home,
        'exact': true
    },
    {
        'path': '/login',
        'component': SignInForm,
        'exact': false
    },
]

export default routes;