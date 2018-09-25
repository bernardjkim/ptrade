import SignInPage from './SigninPage/index';
import SignUpPage from './SignupPage/index';
import Dashboard from './Dashboard/index';
import ProfilePage from './ProfilePage/index';

const routes = [
    {
        'path': '/',
        'component': Dashboard,
        'exact': true
    },
    {
        'path': '/signin',
        'component': SignInPage,
        'exact': false
    },
    {
        'path': '/signup',
        'component': SignUpPage,
        'exact': false
    },
    {
        'path': '/dashboard',
        'component': Dashboard,
        'exact': false
    },
    {
        'path': '/profile',
        'component': ProfilePage,
        'exact': false
    },
]

export default routes;