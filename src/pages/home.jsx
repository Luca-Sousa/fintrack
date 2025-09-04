import { Navigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth';

const HomePage = () => {
  const { user, isInitializing, signOut } = useAuthContext();
  if (isInitializing) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <h1>Olá, {user.name}!</h1>
      <Button onClick={signOut}>Sair</Button>
    </div>
  );
};

export default HomePage;
