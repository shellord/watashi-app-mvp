import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ListTab from '@/components/ListTab'
import ProfileTab from '@/components/ProfileTab'

const TabStack = () => {
  const router = useRouter()
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (router.asPath.split('#')[1] == 'list') {
      setTab(1)
    }
  }, [router.asPath])

  const handleTabsChange = (index: number) => {
    setTab(index)
  }
  return (
    <Tabs isFitted w='full' onChange={handleTabsChange} index={tab}>
      <TabList>
        <Tab
          _focus={{
            outline: 'none',
          }}
        >
          Profile
        </Tab>
        <Tab
          _focus={{
            outline: 'none',
          }}
        >
          List
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProfileTab />
        </TabPanel>
        <TabPanel>
          <ListTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default TabStack
