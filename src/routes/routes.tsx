import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/DashboardPage";
import BikeList from "../components/Dashboard/Bikes";
import UserList from "../components/Dashboard/Users";
import Home from "../components/Dashboard/Home";
import Profile from "../components/Dashboard/Profile";
import AllBikesPage from "../pages/AllBikesPage";
import BikeDetailPage from "../pages/BikeDetailPage";
import Bookings from "../components/Dashboard/Bookings";
import Rentals from "../components/Dashboard/Rentals";
import Coupons from "../components/Dashboard/Coupons";
import ProtectedRoute from "../components/ProtectedRoute";
import ComparePage from "../pages/ComparePage";
import ContactPage from "../pages/ContactPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "all-bikes",
				element: <AllBikesPage />,
			},
			{
				path: "bike/:id",
				element: <BikeDetailPage />,
			},
			{
				path: "about",
				element: <AboutUsPage />,
			},
			{
				path: "contact",
				element: <ContactPage />,
			},
			{
				path: "compare",
				element: <ComparePage />,
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<ProtectedRoute role={{ admin: "admin", user: "user" }}>
				<DashboardPage />
			</ProtectedRoute>
		),
		children: [
			{
				path: "",
				element: (
					<ProtectedRoute role={{ admin: "admin", user: "user" }}>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: "profile",
				element: (
					<ProtectedRoute role={{ admin: "admin", user: "user" }}>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: "bikes",
				element: (
					<ProtectedRoute role={{ admin: "admin", user: null }}>
						<BikeList />
					</ProtectedRoute>
				),
			},
			{
				path: "users",
				element: (
					<ProtectedRoute role={{ admin: "admin", user: null }}>
						<UserList />
					</ProtectedRoute>
				),
			},
			{
				path: "bookings",
				element: (
					<ProtectedRoute role={{ admin: "admin", user: "user" }}>
						<Bookings />
					</ProtectedRoute>
				),
			},
			{
				path: "rentals",
				element: (
					<ProtectedRoute role={{ admin: "admin", user: null }}>
						<Rentals />
					</ProtectedRoute>
				),
			},
			{
				path: "coupons",
				element: (
					<ProtectedRoute role={{ admin: "admin", user: null }}>
						<Coupons />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: "/sign-in",
		element: <SignInPage />,
	},
	{
		path: "/sign-up",
		element: <SignUpPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default router;
