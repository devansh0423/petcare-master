import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./PageLoader";
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Contact = lazy(() => import("./pages/Contact"));
const Policy = lazy(() => import("./pages/Policy"));
const Error = lazy(() => import("./pages/Error"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const PrivateRoute = lazy(() => import("./components/routes/PrivateRoute"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDasboard"));
const CreateCategory = lazy(() => import("./pages/admin/CreateCategory"));
const CreateProduct = lazy(() => import("./pages/admin/CreateProduct"));
const Products = lazy(() => import("./pages/admin/Products"));
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Search = lazy(() => import("./components/Search"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Profie = lazy(() => import("./pages/user/Profie"));
const Orders = lazy(() => import("./pages/user/Orders"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const ApplyDoctor = lazy(() => import("./pages/user/ApplyDoctor"));
const AllDoctors = lazy(() => import("./pages/user/AllDoctors"));
const Appointments = lazy(() => import("./pages/user/Appointments"));
const AllUsers = lazy(() => import("./pages/admin/AllUsers"));
const AllDoctorsAdmin = lazy(() => import("./pages/admin/AllDoctorsAdmin"));
const DoctorAppointmentBooking = lazy(() =>
  import("./pages/DoctorAppointmentBooking")
);
function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profie />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/my-appointments" element={<Appointments />} />
            <Route path="user/apply-doctor" element={<ApplyDoctor />} />
            <Route path="user/all-doctors" element={<AllDoctors />} />
            <Route
              path="user/book-appointment/:doctorId"
              element={<DoctorAppointmentBooking />}
            />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/orders" element={<AdminOrders />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/all-users" element={<AllUsers />} />
            <Route path="admin/all-doctors" element={<AllDoctorsAdmin />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
