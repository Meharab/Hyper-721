
import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { usePfp } from '@decentology/hyperverse-ethereum-pfp';
import { Box, Item, TriggerContainer, Trigger, Parameters, Input, Content, Button} from '../ComponentStyles'

const CreateInstance = () => {
  const { address } = useEthereum();
  const { NewInstance } = usePfp();
  const { mutate } = NewInstance();

  const createNewInstance = async () => {
    try {
      const instanceData = {
      }

      mutate(instanceData);
    } catch (error) {
      throw error;
    }
  }

  return (
    <Box>
      <h4>New Instance</h4>
      <p>Create your own instance of a token </p>
      <Accordion.Root type="single" collapsible>
      <Item value='item-1'>
        <TriggerContainer>
        <Trigger disabled={!address}>
            {!address ? 'Connect Wallet' : 'Create Instance'}
          </Trigger>
        </TriggerContainer>
        <Parameters>
        <Content>
        
          <Button onClick={createNewInstance}>{!address ? 'Connet Wallet' : 'Create Instance'}</Button>
        </Content>
        </Parameters>
      </Item>
    </Accordion.Root>
    </Box>
  )
}

export default CreateInstance;
