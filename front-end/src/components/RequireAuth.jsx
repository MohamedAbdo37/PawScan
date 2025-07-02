import { Navigate, useParams } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const RequireAuth = ({ children }) => {
  const { uid } = useParams();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  if (!authUser || authUser.uid !== uid) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default RequireAuth;
