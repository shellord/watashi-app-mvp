import { Input, VStack, Button, Heading, useToast } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const ProfileTab = () => {
  const { data: session } = useSession()
  const [username, setUsername] = useState<any>(null)
  const [value, setValue] = useState('')
  const toast = useToast()

  useEffect(() => {
    if (session?.user) {
      setUsername(session.user.username)
    }
  }, [session])

  const changeUsername = async () => {
    const url = `/api/username/?username=${value}`
    const res = await fetch(url)
    if (res.status === 200) {
      toast({
        title: 'username changed',
        description: 'your username has been changed successfully',
        status: 'success',
        duration: 2000,
        position: 'top-right',
      })
    }
  }
  return (
    <VStack alignItems={'flex-start'} pt='10'>
      <Heading size={'sm'}>Change Username</Heading>
      <Input
        placeholder={username}
        variant={'filled'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => changeUsername()}>Save</Button>
    </VStack>
  )
}

export default ProfileTab
