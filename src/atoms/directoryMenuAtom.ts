import {atom} from "recoil";
import {IconType} from "react-icons"
import { TiHome } from "react-icons/ti";

export type directoryMenuItem = {
    displayText: string,
    link: string,
    icon: IconType,
    iconColor: string,
    imageURL?: string,

}

interface directoryMenuState {
    isOpen: boolean;
    selectedMenuItem: directoryMenuItem;

}

export const defaultMenuItem: directoryMenuItem = {
    displayText: "Home",
    link: "/",
    icon: TiHome,
    iconColor: "black"
}

export const defaultMenuState: directoryMenuState = {
    isOpen: false,
    selectedMenuItem: defaultMenuItem
}

export const directoryMenuState = atom<directoryMenuState>({
    key: 'directoryMenuState',
    default: defaultMenuState
})