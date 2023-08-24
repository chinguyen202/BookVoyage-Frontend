// Higher order component
const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    // Get the token from local storage
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      window.location.replace('/login');
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
