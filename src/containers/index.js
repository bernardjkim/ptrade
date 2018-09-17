import SignInPage from './SigninPage/index'
import SignUpPage from './SignupPage/index'
import Dashboard from './Dashboard/index'

const routes = [
    // {
    //     'path': '/',
    //     'component': Home,
    //     'exact': true
    // },
    {
        'path': '/signin',
        'component': SignInPage,
        'exact': false
    },
    {
        'path': '/signup',
        'component':SignUpPage,
        'exact': false
    },
    {
        'path': '/dashboard',
        'component':Dashboard,
        'exact': false
    },
]

export default routes;