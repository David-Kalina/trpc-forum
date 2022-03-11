import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn().then(() => router.push('/home'))}>
        Sign in
      </button>
    </>
  );
}

export default Login;
