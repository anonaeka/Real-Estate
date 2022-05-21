import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignitem="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner"/>
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3x1" fontWeight="bold">{title1}<br />{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1}<br/>{desc2}</Text>
      <Button fontSize="x1">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }) {
  
  return (
    <Box>
      <Banner 
      purpose="RENT A HOME"
      title="Rental Homes for"
      title2="Everyone"
      desc1="Explore Apartments, Villas, Homes"
      desc2="and more"
      buttonText="Explore Renting"
      linkName="/search?purpose=for-rent"
      imageUrl="https://images.unsplash.com/photo-1560185009-5bf9f2849488?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000"
      
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>

      <Banner 
      purpose="BUY A HOME"
      title="Find, Buy & Own Your"
      title2="Dream Home"
      desc1="Explore Apartments, Villas, Homes"
      desc2="and more"
      buttonText="Explore Selling"
      linkName="/search?purpose=for-sale"
      imageUrl="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
      
      />
      <Flex flexWrap="wrap">
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}