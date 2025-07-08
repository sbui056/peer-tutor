import { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import RoleSelection from './pages/RoleSelection';
import { getUser } from './graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient();

function App() {
  const [hasRole, setHasRole] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { userId } = await getCurrentUser();
        const result = await client.graphql({
          query: getUser,
          variables: { id: userId },
        });
        setHasRole(!!result.data.getUser);
      } catch (err) {
        console.error('Error checking user role:', err);
        setHasRole(false);
      }
    };

    checkUser();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={{ padding: '2rem' }}>
          {hasRole === null ? (
            <p>Loading...</p>
          ) : hasRole ? (
            <>
              <h1>Welcome back, {user?.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </>
          ) : (
            <RoleSelection />
          )}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
