import Paths from '../enums/paths.enum';
import Home from '../../views/home/home';
import BinaryTree from '../../views/binary-tree/binary-tree';
import LinkedList from '../../views/linked-list/linked-list';
import HashMap from '../../views/hash-map/hash-map';

export const routes = [
  {
    path: Paths.Home,
    component: Home,
  },
  {
    path: Paths.BinaryTree,
    component: BinaryTree,
  },
  {
    path: Paths.LinkedList,
    component: LinkedList,
  },
  {
    path: Paths.HashMap,
    component: HashMap,
  },
];
