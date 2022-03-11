import { Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { auth } from '../../../firebase';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signUp] = useCreateUserWithEmailAndPassword(auth);

  const [error] = useState<string | null>(null);

  return (
    <form onSubmit={handleSubmit((data) => signUp(data.email, data.password))}>
      {error && <Text color="red.200">{error}</Text>}
      <VStack spacing={2} justify="space-evenly" align="stretch" h="300px">
        <Flex align="center" justify="space-between">
          <Text fontSize="sm" textColor="white">
            login
          </Text>
          <Text fontSize="sm" textColor="white">
            forgot password?
          </Text>
        </Flex>
        <Input
          {...register('email', { required: 'required' })}
          textColor="white"
          type="email"
          placeholder="email"
        />
        {errors.email && <Text fontSize="xs">{errors.email.message}</Text>}
        <Input
          {...register('password', { required: 'required' })}
          textColor="white"
          type="password"
          placeholder="password"
        />
        <Button type="submit">register</Button>
      </VStack>
    </form>
  );
}

export default Register;
