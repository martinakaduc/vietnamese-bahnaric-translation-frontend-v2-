import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import BKLogo from '../../assets/images/BKLogoLarge.png';
import DesktopBanner from '../../assets/images/desktopBanner.png';
import AuthService from '../../service/auth.service';
import useBoundStore from '../../store';

const DesktopLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const setToken = useBoundStore.use.setToken();
  const login = () => {
    setLoading(true);
    AuthService.login(username, password)
      .then((res) => {
        const { payload } = res.data;
        const { token } = payload;
        setToken(token);
        toast.success('Đăng nhập thành công');
        navigate('/');
      })
      .catch(() => {
        // console.log(err);
        toast.error('Sai tên tài khoản hoặc mật khẩu');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='hidden md:flex'>
      <ToastContainer position='top-right' />
      <div className='h-[100vh] w-[50vw] lg:w-[55vw]'>
        <img alt='Banner' className='h-full object-cover object-right' src={DesktopBanner} />
      </div>
      <div className='flex w-[50vw] flex-col items-center self-center px-10 lg:w-[40vw] lg:px-[60px] xl:px-[80px] 2xl:px-[120px]'>
        <div className='flex w-fit flex-col items-center'>
          <img
            alt='BKLogo'
            className='h-[100px] w-[100px] xl:h-[120px] xl:w-[120px] 2xl:h-[140px] 2xl:w-[140px]'
            src={BKLogo}
          />
          <h1 className='text-[20px] font-semibold xl:text-[24px] 2xl:text-[28px] 3xl:text-[32px]'>
            Dịch thuật Bahnar
          </h1>
        </div>
        <div className='mt-5 w-full rounded-[20px] border-[1px] border-[#262664]/[.1] px-5 py-5 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] 3xl:mt-6'>
          <h2 className='text-[16px] font-bold text-[#1D46F8] xl:text-[18px] 2xl:text-[20px] 3xl:text-[24px]'>
            Đăng nhập
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className='mt-3 flex w-full flex-col 3xl:mt-6'
          >
            <h3 className='text-[12px] font-bold xl:text-base 2xl:text-[18px] 3xl:text-[20px]'>
              Tên tài khoản
            </h3>
            <input
              type='text'
              placeholder='Tên tài khoản'
              onChange={(e) => setUsername(e.target.value)}
              required
              value={username}
              className='mt-2 w-full rounded-[8px] border-[1px] border-[#BDBCCC] p-2 text-[12px] xl:mt-3 xl:text-base 3xl:text-[20px]'
            />
            <h3 className='mt-3 text-[12px] font-bold xl:mt-4 xl:text-base 2xl:text-[18px] 3xl:text-[20px]'>
              Mật khẩu
            </h3>
            <input
              type='password'
              placeholder='Mật khẩu'
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='mt-2 w-full rounded-[8px] border-[1px] border-[#BDBCCC] p-2 text-[12px] xl:mt-3 xl:text-base 2xl:text-[18px] 3xl:text-[20px]'
            />
            <div className='mt-2 flex space-x-2 xl:mt-3'>
              <Link
                to='/sign-up'
                className='text-[12px] text-[#1D46F8] xl:text-base 2xl:text-[18px] 3xl:text-[20px]'
              >
                <u>Đăng ký</u>
              </Link>
            </div>
            <div className='flex space-x-2'>
              <button
                type='submit'
                className='mt-6 flex items-center justify-center self-center rounded-[8px] bg-[#1D46F8] px-7 py-2 text-[12px] text-white xl:text-base 2xl:text-[18px] 3xl:py-3 3xl:text-[20px]'
              >
                {loading ? (
                  <div className='flex h-[18px] w-[55.5px] items-center justify-center xl:h-[24px] xl:w-[74px] 2xl:w-[83.2px] 3xl:w-[92.5px]'>
                    <div className='h-6 w-6 animate-spin rounded-full border-l-2 border-solid border-white' />
                  </div>
                ) : (
                  <p className='text-white'>Đăng nhập</p>
                )}
              </button>
              <Link
                to='/'
                className='mt-6 flex items-center justify-center self-center rounded-[8px] bg-[#0F9D58] px-3 py-2 text-[12px] text-white xl:text-base 2xl:text-[18px] 3xl:py-3 3xl:text-[20px]'
              >
                Bỏ qua
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesktopLogin;
