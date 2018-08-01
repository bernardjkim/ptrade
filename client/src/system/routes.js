import {
    Home, SignInForm, Register 
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
    {
        'path': '/register',
        'component': Register,
        'exact': false
    },
]

export default routes;