import axios from 'axios';
import { useSelector } from 'react-redux';
import { apiRootLive } from 'services';
import images from 'theme/images';

const useUser = () => {
  const user = useSelector(state => state.auth.user);

  const getUserImage = () => {
    if (user?.UserProfile?.avatarUrl) {
      console.log("user profile",user?.UserProfile)
      let image = { uri: `${apiRootLive}${user?.UserProfile.avatarUrl}` };
      return image;
    } else return images.profileIcon;
  };

  const getUserFullName = () => user?.fullName ?? '';
  const getUserPhone=()=>user?.phone??'';
  const getUserEmail = () => user?.email ?? '';
  const getUserID = () => user?.id ?? '';

  // const userId=getUserID();

  // const getEmployeeId=async()=>{
  //   let empId=await axios.get(`https://securitylinksapi.herokuapp.com/api/v1/employee/${userId}`)
  //   console.log("***********",empId)
  //   if(empId.data.employee) {
  //     let employee = empId.data.employee
  //     return employee.id;
  //   }
  //   else
  //   {
  //     return null;
  //   }
  // }

  return { getUserImage, getUserFullName,getUserPhone, getUserEmail,getUserID, user };
};

export default useUser;
