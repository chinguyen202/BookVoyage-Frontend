import { decodeJwtToken, Roles } from '../utility';

// Higher order component
const withAdmin = (WrappedComponent: any) => {
  return (props: any) => {
    // Get the token from local storage
    const accessToken = localStorage.getItem('token') ?? '';
    // If the toke is present
    if (accessToken) {
      const currentUser = decodeJwtToken(accessToken);
      if (currentUser.role !== Roles.ADMIN) {
        window.location.replace('/accessDenied');
        return null;
      }
    } else {
      window.location.replace('/login');
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdmin;
