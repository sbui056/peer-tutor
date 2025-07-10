import { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import RoleSelection from './pages/RoleSelection';
import { getUser } from './graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import BookingForm from './components/BookingForm';

function App() {
  const [hasRole, setHasRole] = useState<boolean | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log('Checking user authentication...');
        const { userId } = await getCurrentUser();
        console.log('User authenticated:', userId);
        
        const client = generateClient();
        console.log('GraphQL client created');
        
        const result = await client.graphql({
          query: getUser,
          variables: { id: userId },
        });
        console.log('GraphQL result:', result);
        console.log('getUser data:', result.data.getUser);
        setHasRole(!!result.data.getUser);
        setDisplayName(result.data.getUser?.displayName ?? null);
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
              <h1>Welcome back, {displayName || "User"}</h1>
              <button onClick={signOut}>Sign out</button>
              <BookingForm />
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
