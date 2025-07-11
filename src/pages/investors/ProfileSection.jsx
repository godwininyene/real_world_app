import { Link } from 'react-router-dom';
import { BiWallet, BiCopy } from 'react-icons/bi';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import defaulAvatar from '../../assets/images/default.jpg';
import { FaChartLine } from 'react-icons/fa';
import moment from 'moment/moment';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const ProfileSection = ({ user }) => {
    const reffid = useRef(null);

    const copyReffLink = () => {
        reffid.current.select();
        navigator.clipboard.writeText(reffid.current.value);
        toast.success('Referral link copied to clipboard!');
    };

    return (
        <div className="bg-card rounded-xl shadow-xl p-6 mb-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                    <img
                        src={user.photo && user.photo !== 'default.png' ? user.photo : defaulAvatar}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                        <div className="bg-green-500 rounded-full p-2">
                            <BiWallet className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-blue-100">{user.email}</p>
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                            Investor
                        </span>
                    </div>
                    
                    <div className="mt-4 bg-bg-dark backdrop-blur-sm rounded-xl p-4">
                        <label className="block text-sm text-blue-100 mb-2">Referral Link</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                ref={reffid}
                                readOnly
                                value={`${import.meta.env.VITE_APP_URL}/register?refid=${user.accountId}`}
                                className="flex-1 min-w-0 p-2 rounded-l-lg bg-white/5 border border-white/20 text-white truncate font-mono text-sm"
                            />
                            <button
                                onClick={copyReffLink}
                                className="p-2 cursor-pointer bg-white/20 hover:bg-white/30 transition-colors rounded-r-lg"
                            >
                                <BiCopy className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-sm text-blue-100">Member Since</span>
                            <span>{moment(user.createdAt).format('MMM YYYY')}</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                        <Link
                            to="/investor/investments"
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                        >
                            <FaChartLine /> Investments
                        </Link>
                        <Link
                            to="/investor/transactions"
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 border border-white/20 rounded-lg hover:bg-primary transition-colors font-medium"
                        >
                            <FaMoneyBillTransfer /> Transactions
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;