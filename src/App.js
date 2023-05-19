import logo from './logo.svg';
import './App.scss';
import { AuthProvider } from './context/auth-context';
import { Routes, Route} from 'react-router-dom'
import SignUpPage from './components/Page/SignUpPage';
import SignInPage from './components/Page/SignInPage';
import HomePage from './components/Page/HomePage';
import PostDetailsPage from './components/Page/PostDetailsPage';
import DashBoardLayout from './components/module/DashBoard/DashBoardLayout';
import DashboardPage from './components/Page/DashboardPage';
import DashBoardPostPage from './components/Page/DashBoardPostPage';
import DashBoardCategoryPage from './components/Page/DashBoardCategoryPage';
import DashBoardCreateCategory from './components/Page/DashBoardCreateCategory';
import CategoryUpdate from './components/module/Category/CategoryUpdate';
import PostManage from './components/module/Post/PostManage';
import PostUpdate from './components/module/Post/PostUpdate';
import UserManage from './components/module/User/UserManage';
import UserProfile from './components/module/User/UserProfile';
import UserUpdate from './components/module/User/UserUpdate';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/home' element={<HomePage></HomePage>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/sign-up' element={<SignUpPage></SignUpPage>}></Route>
          <Route path='/sign-in' element={<SignInPage></SignInPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          
           <Route element={<DashBoardLayout></DashBoardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route path="/post" element={<DashBoardPostPage></DashBoardPostPage>}>
            </Route>
            <Route path='/manage' element={<PostManage></PostManage>}></Route>
            <Route path='/update-post' element={<PostUpdate></PostUpdate>}></Route>
            <Route path="/category" element={
              <DashBoardCategoryPage></DashBoardCategoryPage>
            }></Route>
            <Route path="/add-category" element={<DashBoardCreateCategory></DashBoardCreateCategory>}></Route>
            <Route path="/update-category" element= {<CategoryUpdate></CategoryUpdate>}></Route>


             {/* users */}
             <Route
                path="/users"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
              <Route
                path="/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
             {/* users */}
          </Route>
           
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
