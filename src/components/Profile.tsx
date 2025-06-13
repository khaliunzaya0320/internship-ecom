'use client';
import { useState, useEffect } from 'react';
import {
    User,
    Lock,
    MapPin,
    Plus,
    Edit,
    Trash2,
    Phone,
    Mail,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { User as UserType, Address } from '@/types';

const Profile = () => {
    const { data: session, update } = useSession();
    const [profileData, setProfileData] = useState<UserType | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Address form states
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [addressTitle, setAddressTitle] = useState('');
    const [addressFullName, setAddressFullName] = useState('');
    const [addressPhone, setAddressPhone] = useState('');
    const [addressAddress, setAddressAddress] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressDistrict, setAddressDistrict] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    const tabs = [
        { label: 'Мэдээлэл засах', icon: <User className="w-5 h-5 mr-2" /> },
        { label: 'Нууц үг солих', icon: <Lock className="w-5 h-5 mr-2" /> },
        { label: 'Хүргэлтийн хаяг', icon: <MapPin className="w-5 h-5 mr-2" /> },
    ];
    const [activeTab, setActiveTab] = useState(0);

    // Fetch profile data
    useEffect(() => {
        fetchProfile();
        fetchAddresses();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/profile');
            if (res.ok) {
                const data = await res.json();
                setProfileData(data);
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone || '');
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    const fetchAddresses = async () => {
        try {
            const res = await fetch('/api/address');
            if (res.ok) {
                const data = await res.json();
                setAddresses(data);
            }
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('Мэдээлэл амжилттай шинэчлэгдлээ');
                setProfileData(data);
                // Update session if email changed
                if (session?.user?.email !== email) {
                    await update({ email });
                }
            } else {
                setError(data.error || 'Алдаа гарлаа');
            }
        } catch (error) {
            setError('Серверийн алдаа');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Шинэ нууц үг таарахгүй байна');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/profile/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('Нууц үг амжилттай солигдлоо');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(data.error || 'Алдаа гарлаа');
            }
        } catch (error) {
            setError('Серверийн алдаа');
        } finally {
            setLoading(false);
        }
    };

    const openAddressModal = (address?: Address) => {
        setEditingAddress(address || null);
        setAddressTitle(address?.title || '');
        setAddressFullName(address?.fullName || '');
        setAddressPhone(address?.phone || '');
        setAddressAddress(address?.address || '');
        setAddressCity(address?.city || '');
        setAddressDistrict(address?.district || '');
        setIsDefault(address?.isDefault || false);
        setShowAddressModal(true);
    };

    const closeAddressModal = () => {
        setShowAddressModal(false);
        setEditingAddress(null);
        setAddressTitle('');
        setAddressFullName('');
        setAddressPhone('');
        setAddressAddress('');
        setAddressCity('');
        setAddressDistrict('');
        setIsDefault(false);
    };

    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = editingAddress
                ? `/api/address/${editingAddress.id}`
                : '/api/address';
            const method = editingAddress ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: addressTitle,
                    fullName: addressFullName,
                    phone: addressPhone,
                    address: addressAddress,
                    city: addressCity,
                    district: addressDistrict,
                    isDefault,
                }),
            });

            if (res.ok) {
                setSuccess(
                    editingAddress
                        ? 'Хаяг амжилттай шинэчлэгдлээ'
                        : 'Хаяг амжилттай нэмэгдлээ',
                );
                closeAddressModal();
                fetchAddresses();
            } else {
                const data = await res.json();
                setError(data.error || 'Алдаа гарлаа');
            }
        } catch (error) {
            setError('Серверийн алдаа');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAddress = async (addressId: number) => {
        if (!confirm('Энэ хаягийг устгах уу?')) return;

        try {
            const res = await fetch(`/api/address/${addressId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setSuccess('Хаяг амжилттай устгагдлаа');
                fetchAddresses();
            } else {
                setError('Хаяг устгахад алдаа гарлаа');
            }
        } catch (error) {
            setError('Серверийн алдаа');
        }
    };

    return (
        <div>
            {/* Tab selection */}
            <div className="flex">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`h-20 w-44 mr-6 p-4 flex items-center bg-white rounded shadow-sm border ${
                            activeTab === index
                                ? 'border-rose-500 text-rose-500'
                                : 'border-transparent text-gray-500 hover:text-rose-400'
                        }`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {success}
                </div>
            )}
            {error && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Content */}
            <div className="min-w-screen mt-4 p-6 bg-white rounded shadow-sm">
                {activeTab === 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Хувийн мэдээлэл
                        </h3>
                        <form
                            onSubmit={handleProfileUpdate}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <User className="inline w-4 h-4 mr-1" />
                                    Нэр
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Нэр"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Mail className="inline w-4 h-4 mr-1" />
                                    Имэйл
                                </label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="Имэйл"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Phone className="inline w-4 h-4 mr-1" />
                                    Утасны дугаар
                                </label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    placeholder="Утасны дугаар"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="form-button"
                                    disabled={loading}
                                >
                                    {loading ? 'Хадгалж байна...' : 'Хадгалах'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 1 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Нууц үг солих
                        </h3>
                        <form
                            onSubmit={handlePasswordChange}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Хуучин нууц үг
                                </label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Хуучин нууц үг"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Шинэ нууц үг
                                </label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Шинэ нууц үг"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Шинэ нууц үг баталгаажуулах
                                </label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Нууц үг давтах"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="form-button"
                                    disabled={loading}
                                >
                                    {loading ? 'Солиж байна...' : 'Хадгалах'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 2 && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                Хүргэлтийн хаягууд
                            </h3>
                            <button
                                onClick={() => openAddressModal()}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                Хаяг нэмэх
                            </button>
                        </div>

                        <div className="space-y-4">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="border rounded-lg p-4 bg-gray-50"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="font-semibold">
                                                    {address.title}
                                                </h4>
                                                {address.isDefault && (
                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                        Үндсэн
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-700 mb-1">
                                                <strong>
                                                    {address.fullName}
                                                </strong>{' '}
                                                - {address.phone}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {address.address},{' '}
                                                {address.district &&
                                                    `${address.district}, `}
                                                {address.city}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    openAddressModal(address)
                                                }
                                                className="text-blue-600 hover:text-blue-800 p-1"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteAddress(
                                                        address.id,
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-800 p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {addresses.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                    <p>Хүргэлтийн хаяг байхгүй байна</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingAddress ? 'Хаяг засах' : 'Шинэ хаяг нэмэх'}
                        </h3>

                        <form
                            onSubmit={handleAddressSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Хаягийн нэр
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Гэр, Ажлын газар г.м"
                                    value={addressTitle}
                                    onChange={(e) =>
                                        setAddressTitle(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Бүтэн нэр
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Хүлээн авагчийн бүтэн нэр"
                                    value={addressFullName}
                                    onChange={(e) =>
                                        setAddressFullName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Утасны дугаар
                                </label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    placeholder="Утасны дугаар"
                                    value={addressPhone}
                                    onChange={(e) =>
                                        setAddressPhone(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Хаяг
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Дэлгэрэнгүй хаяг"
                                    value={addressAddress}
                                    onChange={(e) =>
                                        setAddressAddress(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Хот/Аймаг
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Хот/Аймаг"
                                    value={addressCity}
                                    onChange={(e) =>
                                        setAddressCity(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Дүүрэг/Сум
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Дүүрэг/Сум (заавал биш)"
                                    value={addressDistrict}
                                    onChange={(e) =>
                                        setAddressDistrict(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={isDefault}
                                    onChange={(e) =>
                                        setIsDefault(e.target.checked)
                                    }
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="isDefault"
                                    className="text-sm text-gray-700"
                                >
                                    Үндсэн хаяг болгох
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeAddressModal}
                                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Болих
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    disabled={loading}
                                >
                                    {loading ? 'Хадгалж байна...' : 'Хадгалах'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
