import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { verifyToken } from "../utils/verifyToken";

type TProtectedRouteProps = {
	children: ReactNode;
	role: { admin: "admin"; user: "user" | null };
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/sign-in" replace={true} />;
	}

	const user = verifyToken(token);

	if (role.admin === user?.role || role.user === user?.role) {
		return children;
	}

	if (role.user === null && role.admin === user?.role) {
		return children;
	}

	return <Navigate to="/sign-in" replace={true} />;
};

export default ProtectedRoute;
