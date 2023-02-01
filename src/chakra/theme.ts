// 1. Import `extendTheme`
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'
import { extendTheme } from "@chakra-ui/react"
import {Button} from "./button"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
  fonts: {
    body: "Open-Sans, sans-serif",
  },
  styles: {
    global: () => ({
        body: {
            bg: 'gray.700'
        }
    })
  },
  components: {
        Button, 
  }
});



// 4. Now you can use these colors in your components
//function Usage() {
//  return <Box bg="brand.100">Welcome</Box>
//}