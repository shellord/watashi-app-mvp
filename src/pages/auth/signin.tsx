import { getProviders, signIn, getSession } from 'next-auth/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { HStack, VStack, Button, Box } from '@chakra-ui/react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const SignIn = ({ providers }: ServerSideProps) => {
  if (!providers) {
    return <div>No Providers</div>
  }
  return (
    <VStack flex={1} justifyContent={'center'} height={'100vh'}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {provider.id === 'google' && (
            <Box
              as='button'
              transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
              px='30px'
              py='10px'
              minW={'240px'}
              borderRadius='2px'
              fontSize='14px'
              fontWeight='semibold'
              bg='red.500'
              color='white'
              _hover={{ bg: 'red.400' }}
              _focus={{
                boxShadow:
                  '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
              }}
              onClick={() => signIn(provider.id)}
            >
              <HStack spacing={'20px'}>
                <FaGoogle size={18} />
                <p>Sign in with Google</p>
              </HStack>
            </Box>
          )}
          {provider.id === 'facebook' && (
            <Box
              as='button'
              transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
              px='30px'
              py='10px'
              borderRadius='2px'
              fontSize='14px'
              fontWeight='semibold'
              bg='blue.500'
              color='white'
              _hover={{ bg: 'blue.400' }}
              _focus={{
                boxShadow:
                  '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
              }}
              onClick={() => signIn(provider.id)}
            >
              <HStack spacing={'20px'}>
                <FaFacebook size={18} />
                <p>Sign in with Facebook</p>
              </HStack>
            </Box>
          )}
        </div>
      ))}
    </VStack>
  )
}

export default SignIn

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: { destination: '/' },
      props: {},
    }
  }
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
