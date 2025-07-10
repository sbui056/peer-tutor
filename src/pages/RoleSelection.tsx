import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { createUser } from '../graphql/mutations';
import { CreateUserInput } from '../API';
import { useState } from 'react';
import { getUser } from '../graphql/queries';

const client = generateClient();

export default function RoleSelection() {
  const [displayName, setDisplayName] = useState<string | null>(null);

  const handleRoleSelect = async (role: 'student' | 'tutor') => {
    try {
      const { userId, signInDetails } = await getCurrentUser();
      const email = signInDetails?.loginId;

      // Check if user already exists
      const { data } = await client.graphql({
        query: getUser,
        variables: { id: userId },
      });

      if (data.getUser) {
        console.log('User already exists');
        return;
      }

      const input: CreateUserInput = {
        id: userId,
        email: email || '',
        displayName: displayName || '',
        role,
        createdAt: new Date().toISOString(),
      };

      await client.graphql({
        query: createUser,
        variables: { input },
      });

      window.location.reload();
    } catch (error) {
      console.error("Error saving user role:", JSON.stringify(error, null, 2));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Choose your role</h2>
      <input
        type="text"
        placeholder="Display Name"
        value={displayName || ''}
        onChange={e => setDisplayName(e.target.value)}
      />
      <button onClick={() => handleRoleSelect('student')}>I'm a Student</button>
      <button onClick={() => handleRoleSelect('tutor')}>I'm a Tutor</button>
    </div>
  );
}
