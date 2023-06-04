import React from "react";
import { Flex, MenuItem, Image, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import useDirectory from "@/hooks/useDirectory";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "grey.100" }}
      onClick={() => {
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL });
      }}
    >
      <Flex align="center">
        {imageURL ? (
          <Image
            src={imageURL}
            alt=""
            borderRadius="full"
            boxSize="10px"
            mr={2}
          />
        ) : (
          <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
