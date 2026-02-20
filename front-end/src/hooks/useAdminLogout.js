import { toast } from 'sonner';

export const useAdminLogout = () => {
    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_refresh");
        localStorage.removeItem("admin_role");
        localStorage.removeItem("admin_user");

        toast.success("Logged out successfully!");

        setTimeout(() => {
            window.location.href = "/admin/login";
        }, 2000);
    };

    return { handleLogout };
};