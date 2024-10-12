import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Portal</span></h1>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center justify-between flex-1 ml-8">
                        <div className="flex space-x-4">
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <Link to="/admin/companies" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Companies</Link>
                                    <Link to="/admin/jobs" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                    <Link to="/jobs" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Jobs</Link>
                                    <Link to="/browse" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Browse</Link>
                                </>
                            )}
                        </div>
                        <div className="flex items-center">
                            {!user ? (
                                <div className="flex items-center space-x-2">
                                    <Link to="/login"><Button variant="outline">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64">
                                        <div className="p-2">
                                            <div className="flex items-center space-x-2 mb-3">
                                                <Avatar>
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-medium">{user?.fullname}</h4>
                                                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            {user && user.role === 'student' && (
                                                <Button variant="ghost" className="w-full justify-start mb-2" asChild>
                                                    <Link to="/profile">
                                                        <User2 className="mr-2 h-4 w-4" />
                                                        View Profile
                                                    </Link>
                                                </Button>
                                            )}
                                            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logoutHandler}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Logout
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to="/admin/companies" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Companies</Link>
                                <Link to="/admin/jobs" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                                <Link to="/jobs" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Jobs</Link>
                                <Link to="/browse" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Browse</Link>
                            </>
                        )}
                        {!user ? (
                            <div className="mt-3 space-y-2">
                                <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                                <Link to="/signup"><Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <div className="mt-3 space-y-2">
                                {user.role === 'student' && (
                                    <Link to="/profile">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <User2 className="mr-2 h-4 w-4" />
                                            View Profile
                                        </Button>
                                    </Link>
                                )}
                                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logoutHandler}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;