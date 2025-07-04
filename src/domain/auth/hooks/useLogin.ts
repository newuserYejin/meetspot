import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '../../user/store/userStore';
import type { LoginRequest } from '../models/model';
import { loginWithEmail } from '../apis/api';
import { getCurrentUserInfo } from '../../user/apis/api';
import { useNavigate } from 'react-router';

const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (params: LoginRequest) => {
      console.log('params info : ', params);

      return loginWithEmail(params);
    },
    onSuccess: async () => {
      try {
        const userInfo = await getCurrentUserInfo();
        if (userInfo?.user?.email && userInfo.user.id) {
          setUser({
            email: userInfo.user.email,
            id: userInfo.user.id,
          });
        }
        navigate('/');
      } catch (error) {
        console.error('Failed to get user info after login:', error);
      }
    },
  });
};

export default useLogin;
