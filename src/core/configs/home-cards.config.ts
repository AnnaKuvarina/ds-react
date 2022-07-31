import binaryTree from '../../assets/images/binary-tree.png';
import linkedList from '../../assets/images/linked-list.png';
import { HomeCard } from '../models/types';
import Paths from '../enums/paths.enum';

export const homeCards: HomeCard[] = [
  {
    title: 'Binary Tree',
    img: binaryTree,
    description:
      'Trees are hierarchical data structures. The topmost node is called root of the tree. The elements that are directly under an element are called its children. The element directly above something is called its parent.',
    path: Paths.BinaryTree,
  },
  {
    title: 'Linked List',
    img: linkedList,
    description:
      'Linked List is a linear data structure. Unlike arrays, linked list elements are not stored at a contiguous location; the elements are linked using pointers.',
    path: Paths.LinkedList,
  },
  {
    title: 'Hash Map',
    img: '',
    description: 'Hash Map is...',
    path: Paths.HashMap,
  },
];
