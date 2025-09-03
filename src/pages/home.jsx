import { Navigate } from 'react-router';

import { useAuthContext } from '@/contexts/auth';

const HomePage = () => {
  const { user, isInitializing } = useAuthContext();
  if (isInitializing) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <h1>HomePage </h1>
    </div>
  );
};

export default HomePage;
