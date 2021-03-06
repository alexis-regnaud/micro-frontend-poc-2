import React from 'react';
import { ShoppingCart as ShoppingCartIcon, Person as UserIcon } from '@material-ui/icons';
import ListItemLink from 'shell/ListItemLink';

function Navigation() {
  return (
    <>
      <ListItemLink to="/app2/ajax" icon={<ShoppingCartIcon />} text="App2 - Ajax" />
      <ListItemLink to="/app2/iframe" icon={<UserIcon />} text="App2 - Iframe" />
      <ListItemLink
        to={`${process.env.APP2_URL}/api/ssr`}
        icon={<ShoppingCartIcon />}
        text="App2 - SSR without Proxy"
        legacy={true}
      />
      <ListItemLink
        to={`${process.env.SHELL_URL}/api/ssr/proxy`}
        icon={<ShoppingCartIcon />}
        text="App2 - SSR with Proxy"
        legacy={true}
      />
    </>
  );
}

export default Navigation;
