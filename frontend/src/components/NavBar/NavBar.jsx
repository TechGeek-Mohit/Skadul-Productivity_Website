import React from "react";
import {
  Text,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Avatar,
  Icon,
  IconButton,
  useBreakpointValue,
  Spacer,
  Select,
} from "@chakra-ui/react";

import { CalendarIcon } from "@chakra-ui/icons";

import { MdArrowDropDown } from "react-icons/md";
import styles from "./NavBar.module.css";

const NavBar = ({ signout }) => {
  return (
    <nav className={styles.nav}>
      <div>
        <a href="/" className={styles.butt}>
          <CalendarIcon boxSize={12} />
          <Text as="b" fontSize="5xl">
            Skadual
          </Text>
        </a>
      </div>

      <ul>
        <li>
          <a href="/home" className={styles.butt}>
            Home
          </a>
        </li>
        <li>
          <a href="/focusmode" className={styles.butt}>
            Focus Mode
          </a>
        </li>
        
        <li>
        <a
          href="/analytics"
          className={styles.butt}
        >
          Analytics
        </a>
      </li>
      

        <li>
          <a href="/signin" className={styles.butt}>
            <Button variant="ghost" colorScheme="teal">
              Sign In
            </Button>
          </a>
        </li>

        <li className={styles.butt}>
          <Button variant="solid" colorScheme="teal" onClick={signout}>
            Log Out
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
