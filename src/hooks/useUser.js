import {useSelector} from 'react-redux';
import {apiRootLive} from 'services';
import images from 'theme/images';

const useUser = () => {
  const user = useSelector(state => state.auth.user);

  const getUserImage = () => {
    if (user?.UserProfile?.avatarUrl) {
      let image = {uri: `${apiRootLive}${user?.UserProfile.avatarUrl}`};
      return image;
    } else return images.profileIcon;
  };

  const getUserFullName = () => user?.fullName ?? '';
  const getUserEmail = () => user?.email ?? '';

  return {getUserImage, getUserFullName, getUserEmail, user};
};

export default useUser;
