import React from 'react';
import {Box, Pressable, Text, theme} from 'native-base';

import Icon from '../../assets/icons/Icon';
import {fp, wp} from '../../helpers/respDimension';

const CategoryCard = ({item}) => {
  return (
    <>
      <Pressable
        mt={wp(2)}
        mb={wp(2)}
        mr={wp(2)}
        ml={wp(2)}
        key={item.id}
        rounded="lg"
        overflow="hidden"
        width={wp(20)}
        height={wp(20)}
        shadow={1}
        justifyContent="center"
        alignItems="center"
        _pressed={{backgroundColor: 'secondary.200'}}
        _light={{backgroundColor: 'gray.50'}}
        _dark={{backgroundColor: 'gray.700'}}>
        <Box
          width={wp(10)}
          height={wp(10)}
          bg="secondary.100"
          alignItems="center"
          borderRadius="full"
          justifyContent="center">
          <Icon
            type="MaterialCommunityIcons"
            name={item.iconName}
            size={wp(6)}
            color={theme.colors.secondary[500]}
          />
        </Box>
        <Text fontSize={fp(1.4)} mt={wp(1)}>
          {item.fullName}
        </Text>
      </Pressable>
    </>
  );
};

export default CategoryCard;