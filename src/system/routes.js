import {
    Home, SignInPage, SignUpPage 
} from 'components';

const routes = [
    {
        'path': '/',
        'component': Home,
        'exact': true
    },
    {
        'path': '/login',
        'component': SignInPage,
        'exact': false
    },
    {
        'path': '/register',
        'component':SignUpPage,
        'exact': false
    },
]

export default routes;