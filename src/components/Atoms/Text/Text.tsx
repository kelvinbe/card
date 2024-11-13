import React from 'react'
import { ResponsiveValue, Text } from '@chakra-ui/react'


interface IText{
    words: string
    size?: ResponsiveValue<number | "blink" | (string & {}) | "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset" | "aliceblue" | "antiquewhite" | "aqua" | "aquamarine" | "azure" |"wavy">,
    color?: string
    weight?: string;
    mt?: string;
    mr?: string;
}


const TextComponent = (props: IText) => {
    
    const {words, size, color, weight,mt,mr} = props


  return (
    <Text color={color} fontWeight={weight} mt={mt} mr={mr}  fontSize={size} fontStyle={'karla'} >
        {words}
    </Text>
  )
}

export default TextComponent