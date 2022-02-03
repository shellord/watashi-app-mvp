import { InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import { HiOutlineSearch } from 'react-icons/hi'

type SearchBarProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchBar = ({ handleChange }: SearchBarProps) => {
  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        placeholder='Search Movie'
        variant={'filled'}
        onChange={handleChange}
      />
      <InputRightElement width='4.5rem'>
        <HiOutlineSearch size={'20px'} />
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchBar
