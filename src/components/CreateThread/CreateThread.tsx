import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import CreateThreadForm from 'components/CreateThreadForm';
import React, { useState } from 'react';
import { trpc } from 'utils/trpc';

function CreateThread() {
  const utils = trpc.useContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const addPost = trpc.useMutation('post.add', {
    async onSuccess() {
      await utils.invalidateQueries(['post.infinite']);
      setIsOpen(false);
    },
  });

  const [thread, setThread] = useState({
    title: '',
    text: '',
  });

  const onClose = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  return (
    <>
      <Button ml="3rem" flex={1} onClick={open}>
        Create a new thread
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Create a new thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateThreadForm thread={thread} setThread={setThread} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                addPost.mutateAsync({
                  title: thread.title,
                  text: thread.text,
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

export default CreateThread;
