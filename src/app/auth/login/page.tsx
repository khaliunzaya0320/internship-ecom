'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Имэйл эсвэл нууц үг буруу байна');
            } else {
                // Амжилттай нэвтэрсэн
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            setError('Нэвтрэхэд алдаа гарлаа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-sm">
            <h2 className="primary-header text-center mb-6">Нэвтрэх</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                    <Mail className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-4 h-4" />
                    <input
                        type="email"
                        placeholder="Имэйл"
                        className="form-input pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-4 h-4" />
                    <input
                        type="password"
                        placeholder="Нууц үг"
                        className="form-input pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="form-button mt-2"
                    disabled={loading}
                >
                    {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
                </button>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                        {error}
                    </div>
                )}
            </form>{' '}
            <div className="flex justify-center mt-6 gap-2 text-sm">
                <p className="text-gray-600">Шинэ хэрэглэгч үү?</p>
                <a
                    href="/auth/register"
                    className="underlined-button text-blue-600"
                >
                    Бүртгүүлэх
                </a>
            </div>
            {/* Google болон Facebook нэвтрэх товчуудыг түр хаасан */}
            {/* 
      <p className="text-center text-sm text-gray-400 mt-6">эсвэл</p>

      <div className="flex flex-col gap-2 mt-4">
        <button
          type="button"
          className="next-auth-button flex items-center justify-center gap-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
            alt="G"
            className="w-5 h-5"
          />
          <span>Google-ээр нэвтрэх</span>
        </button>
        <button
          type="button"
          className="next-auth-button flex items-center justify-center gap-2"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s"
            alt="G"
            className="w-5 h-5"
          />
          <span>Facebook-ээр нэвтрэх</span>
        </button>
      </div>
      */}
        </div>
    );
};

export default LoginPage;
