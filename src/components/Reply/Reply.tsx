import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import CreateThreadForm from 'components/CreateThreadForm';
import React, { useState } from 'react';
import { trpc } from 'utils/trpc';

function Reply({ postId }: { postId: string }) {
  const utils = trpc.useContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const reply = trpc.useMutation('post.reply', {
    async onSuccess() {
      await utils.invalidateQueries(['post.byId']);
      setIsOpen(false);
    },
  });

  const [text, setText] = useState('');

  const onClose = () => setIsOpen(false);

  const open = () => setIsOpen(true);
  return (
    <>
      <Button onClick={open}>Reply</Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Create a new thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={(e) => setText(e.target.value)}
                  placeholder="text"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                reply.mutateAsync({
                  id: postId,
                  data: {
                    text,
                  },
                });
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Reply;
