import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

function CreateThreadForm({
  thread,
  setThread,
}: {
  thread: { title: string; text: string };
  setThread: (thread: any) => void;
}) {
  return (
    <VStack>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          onChange={(e) => setThread({ ...thread, title: e.target.value })}
          placeholder="Title"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Body</FormLabel>
        <Textarea
          onChange={(e) => setThread({ ...thread, text: e.target.value })}
          placeholder="body"
        />
      </FormControl>
    </VStack>
  );
}

export default CreateThreadForm;
